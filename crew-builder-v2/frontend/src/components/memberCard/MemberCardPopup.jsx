import React from 'react'
import { FULL_UPGRADE_LEVEL } from '../../../consts.js'
import { getMemberImage } from './MemberCardUtils.js'

const MemberCardPopup = ({ isOpen, onClose, member }) => {
  if (!isOpen) return null

  const handleClickOffView = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const memberLevel = member.unitLevel
  const fullyUpgraded = memberLevel > FULL_UPGRADE_LEVEL ? "full-upgrade" : ""

  return (
    <>
      <div className="detailed-container" onClick={handleClickOffView}>
        <div className={`detailed-content ${fullyUpgraded} detailed-member-type-${member.stats.TYPE}`}>
          <div className="detailed-text-container">
            <span className="detailed-member-name">{member.name}</span>
            <span className="detailed-member-description">{member.description}</span>
          </div>
          <div className="detailed-image-container">
            <img className="detailed-image" src={getMemberImage(member)} alt={member.name} />
          </div>
          <table className="mulish-p">
            <tbody>
              <tr>
                <th>Level</th>
                <th>Type</th>
                <th>ATK</th>
                <th>HP</th>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>{memberLevel}</td>
                <td>{member.stats.TYPE}</td>
                <td>{member.stats.ATK}</td>
                <td>{member.stats.HP}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default MemberCardPopup
