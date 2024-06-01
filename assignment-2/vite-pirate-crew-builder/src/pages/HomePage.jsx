import React, { useState } from 'react';
import InputForm from "../components/InputForm.jsx";
import CrewContainer from "../components/CrewContainer.jsx";

const initialCrew = [
    {
        name: "Luffy",
        description: "Captain of the Straw Hat Pirates",
        age: 19,
        image: "https://optc-db.github.io/api/images/full/transparent/1/400/1404.png"
    },
    {
        name: "Zoro",
        description: "Esteemed swordsman and pirate bounty hunter",
        age: 21,
        image: "https://optc-db.github.io/api/images/full/transparent/1/300/1362.png"
    },
    {
        name: "Nami",
        description: "Elusive thief and self-proclaimed world-class navigator",
        age: 20,
        image: "https://optc-db.github.io/api/images/full/transparent/1/300/1366.png"
    },
    {
        name: "Usopp",
        description: "Supreme sniper the bravest warrior of the sea",
        age: 19,
        image: "https://optc-db.github.io/api/images/full/transparent/1/400/1406.png"
    }
];

function HomePage() {
    const [crew, setCrew] = useState(initialCrew);

    const addMember = (member) => {
        setCrew([...crew, member]);
    };

    return (
        <>
            <InputForm addMember={addMember} />
            <CrewContainer crew={crew} />
        </>
    );
}

export default HomePage;
