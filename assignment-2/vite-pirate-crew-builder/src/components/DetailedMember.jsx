import React from 'react';

const DetailedMember = ({isOpen, onClose, member}) => {
    if (!isOpen) return null;

    const handleClickOffView = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <>
            <div className="detailed-container" onClick={handleClickOffView}>
                <div className="detailed-content">
                    <h2 className="mulish-heading">{member.name}</h2>
                    <p className="mulish-p">{`${member.age} y/o`}</p>
                    <p className="mulish-p">{member.description}</p>
                    <img className="detailed-image" src={member.image} alt={member.name}/>
                </div>
            </div>
        </>
    );
};

export default DetailedMember;
