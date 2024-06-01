import React from 'react';
import {v4 as uuidv4} from 'uuid';

function CrewContainer({crew}) {
    return (
        <>
            <div className="center">
                <button id="clear-team-button">Clear Pirates</button>
            </div>
            <div id="team-display">
                <div>
                    <h2 className="mulish-heading">Your Crew</h2>
                    <ul id="team-list">
                        {crew.map((crewMember) => (
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
    );
}

export default CrewContainer;
