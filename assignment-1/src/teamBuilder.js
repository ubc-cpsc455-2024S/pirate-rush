
const submitButton = document.getElementById("submit-button")
const clearFormButton = document.getElementById("clear-fields-button")
const clearCardsButton = document.getElementById("clear-team-button")

let jsonArray = []

document.addEventListener("DOMContentLoaded", () => {
    loadTeamFromFile('team.json')
})

if (submitButton) {
    submitButton.addEventListener("click", (e) => {
        e.preventDefault()
        submitMember()
        clearFormFields()
    })
}

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
    loadMember(memberObject)
}

function loadTeamFromFile(teamJsonPath) {
    fetch(teamJsonPath)
        .then(resp => resp.json())
        .then(data => {
            jsonArray = data.members
            jsonArray.forEach(member => loadMember(member))
        })
        .catch(err => console.log("Error fetching data: ", err));
}

function loadMember(member) {
    const teamList = document.getElementById("team-list")
    const list = document.createElement("li")
    const div = document.createElement("div")
    div.className = "member-container"

    const name = createMemberFields(member.name)
    const description = createMemberFields(member.description)
    const age = createMemberFields(`${member.age} y/o`)
    const img = document.createElement("img")

    img.src = member.image
    img.alt = member.name
    img.width = 300

    div.append(name, age, description, img)
    list.appendChild(div)
    teamList.appendChild(list)
}

function createMemberFields(fieldText) {
    const field = document.createElement("span");
    field.textContent = `${fieldText}`;
    field.style.display = "block";
    field.className = "mulish-p"

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
        case "brook":
            return "https://optc-db.github.io/api/images/full/transparent/1/400/1410.png"
        case "franky":
            return "https://optc-db.github.io/api/images/full/transparent/1/300/1364.png"
        default:
            return "https://optc-db.github.io/api/images/full/transparent/3/500/3515.png"
    }
}

/*
    Functions related to form-handling
 */

function clearFormFields() {
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("age").value = "";
    document.getElementById("imageURL").value = "";
}
