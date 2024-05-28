const MAX_TEAM_SIZE = 6
const AUDIO_FILES = {
    luffy: new Audio("jc_luf_053.wav"),
    zoro: new Audio("j_zor_167.wav"),
    nami: new Audio("j_nam_030.wav"),
    usopp: new Audio("j_uso_031.wav"),
    sanji: new Audio("j_snj_185.wav"),
    chopper: new Audio("j_cho_037_b.wav"),
    robin: new Audio("j_nic_044.wav"),
    franky: new Audio("j_fra_068.wav")
};

let jsonArray = []

document.addEventListener("DOMContentLoaded", () => {
    loadTeamFromFile('team.json')
})

/*
    Handle buttons
 */
const submitButton = document.getElementById("submit-button")
const clearFormButton = document.getElementById("clear-fields-button")
const clearCardsButton = document.getElementById("clear-team-button")

if (submitButton) {
    submitButton.addEventListener("click", (e) => {
        e.preventDefault()
        if (jsonArray.length === MAX_TEAM_SIZE) {
            alert("Your team is full!")
        } else {
            submitMember()
            deleteAll()
            loadAll()
            clearFormFields()
        }
    })
}

if (clearFormButton) {
    clearFormButton.addEventListener("click", (e) => {
        e.preventDefault()
        clearFormFields()
    })
}

if (clearCardsButton) {
    clearCardsButton.addEventListener("click", (e) => {
        e.preventDefault()
        deleteAll()
        clearJson()
    })
}

/*
    Helper functions
 */
function submitMember() {
    const name = document.getElementById("name").value
    const description = document.getElementById("description").value
    const age = document.getElementById("age").value
    const imageURL = document.getElementById("imageURL").value

    let image;
    if (imageURL.trim() !== "") {
        image = imageURL
    } else {
        image = createImage(name)
    }

    const memberObject = {
        name: name,
        description: description,
        age: age,
        image: image
    }

    jsonArray.push(memberObject)
    playCharacterAudio(name)
}

function loadTeamFromFile(teamJsonPath) {
    fetch(teamJsonPath)
        .then(resp => resp.json())
        .then(data => {
            jsonArray = data.members
            loadAll()
        })
        .catch(err => console.log("Error fetching data: ", err));
}

function clearJson() {
    jsonArray = []
}

function deleteAll() {
    const teamList = document.getElementById("team-list")
    teamList.innerHTML = ''
}

function loadAll() {
    jsonArray.forEach(member => loadMember(member))
}

function loadMember(member) {
    const teamList = document.getElementById("team-list")
    const list = document.createElement("li")
    const div = document.createElement("div")

    const name = createMemberFields(member.name, "name")
    const description = createMemberFields(member.description, "description")
    const age = createMemberFields(`${member.age} y/o`, "age")
    const img = document.createElement("img")

    list.className = "each-card"
    div.className = "member-container"

    img.src = member.image
    img.alt = member.name
    img.width = 300

    div.append(name, age, description, img)
    list.appendChild(div)
    teamList.appendChild(list)
}

function createMemberFields(fieldText, type) {
    const field = document.createElement("span");
    field.textContent = `${fieldText}`;
    field.style.display = "block";
    field.className = `member-${type}`

    return field
}

function createImage(name) {
    switch (name.toLowerCase()) {
        case "luffy":
            return "https://optc-db.github.io/api/images/full/transparent/1/400/1404.png"
        case "zoro":
            return "https://optc-db.github.io/api/images/full/transparent/1/300/1362.png"
        case "nami":
            return "https://optc-db.github.io/api/images/full/transparent/1/300/1366.png"
        case "usopp":
            return "https://optc-db.github.io/api/images/full/transparent/1/400/1406.png"
        case "sanji":
            return "https://optc-db.github.io/api/images/full/transparent/1/300/1368.png"
        case "chopper":
            return "https://optc-db.github.io/api/images/full/transparent/1/300/1370.png"
        case "robin":
            return "https://optc-db.github.io/api/images/full/transparent/1/400/1408.png"
        case "franky":
            return "https://optc-db.github.io/api/images/full/transparent/1/300/1364.png"
        default:
            return "https://optc-db.github.io/api/images/full/transparent/3/500/3515.png"
    }
}

function clearFormFields() {
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("age").value = "";
    document.getElementById("imageURL").value = "";
}

function playCharacterAudio(name) {
    if (AUDIO_FILES[name]) {
        AUDIO_FILES[name].play();
    }
}
