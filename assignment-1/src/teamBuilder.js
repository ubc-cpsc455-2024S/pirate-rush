
const submitButton = document.getElementById("submit-button")
const clearFormButton = document.getElementById("clear-fields-button")
const clearCardsButton = document.getElementById("clear-team-button")

// Ensure HTMLElement is not null before adding event listener
if (submitButton) {
    submitButton.addEventListener("click", createMember)
}

// if (clearFormButton) {
//     clearFormButton.addEventListener("click", () => {})
// }
//
// if (clearCardsButton) {
//     clearCardsButton.addEventListener("click", () => {})
// }

document.addEventListener("DOMContentLoaded", function () {
    fetch('team.json')
        .then(resp => resp.json())
        .then(data => {
            const teamList = document.getElementById("team-list")
            data.members.forEach(member => loadMember(member, teamList))
        })
        .catch(err => console.log("Error fetching data: ", err));
})


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

function createMember() { // TODO FINISH THIS
    const name = document.getElementById("name")
    const description = document.getElementById("description")
    const age = document.getElementById("age")

    const memberJson = {
        name: name,
        description: description,
        age: age,
        image: createImage(name)
    }
}

function createMemberFields(fieldText) {
    const field = document.createElement("span");
    field.textContent = `${fieldText}`;
    field.style.display = "block";
    field.className = "mulish-p"

    return field
}

function loadMember(member, teamList) {
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

