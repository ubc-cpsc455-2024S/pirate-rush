import {useState} from "react";
import {v4 as uuidv4} from "uuid";

const initialCrew = [
    {
        "name": "Luffy",
        "description": "Captain of the Straw Hat Pirates",
        "age": 19,
        "image": "https://optc-db.github.io/api/images/full/transparent/1/400/1404.png"
    },
    {
        "name": "Zoro",
        "description": "Esteemed swordsman and pirate bounty hunter",
        "age": 21,
        "image": "https://optc-db.github.io/api/images/full/transparent/1/300/1362.png"
    },
    {
        "name": "Nami",
        "description": "Elusive thief and self-proclaimed world-class navigator",
        "age": 20,
        "image": "https://optc-db.github.io/api/images/full/transparent/1/300/1366.png"
    },
    {
        "name": "Usopp",
        "description": "Supreme sniper the bravest warrior of the sea",
        "age": 19,
        "image": "https://optc-db.github.io/api/images/full/transparent/1/400/1406.png"
    }
]

function CrewContainer() {
    const [crew, setCrew] = useState(initialCrew);

    return (
        <>
            <div className="center">
                <button id="clear-team-button">Clear Pirates</button>
            </div>
            <div id="team-display">
                <div>
                    <h2 className="mulish-heading">Your Crew</h2>
                    <ul id="team-list">
                        {crew.map(crewMember => (
                            <li key={uuidv4()} className="each-card">
                                <div className="member-container">
                                    <span className="member-name">{crewMember.name}</span>
                                    <span className="member-age">{`${crewMember.age} y/o`}</span>
                                    <span className="member-description">{crewMember.description}</span>
                                    <img className="member-image" src={crewMember.image} alt={crewMember.name}
                                         width={300}/>
                                    <div>
                                        <button className="view-member-button">View</button>
                                        <button className="delete-member-button">Delete</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default CrewContainer;