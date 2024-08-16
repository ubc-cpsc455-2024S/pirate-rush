import './AboutPage.css'
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function AboutPage() {
  return (
    <>
      <div className="about-container">
        <h1 className="mulish-heading">Pirate Rush</h1>
        <div className="about-content">
          <p className="mulish-p">
            Hi, my name is Jackson and this is my One Piece themed idle-clicker game. I am a 4th year Computer Science
            student with a passion for software engineering, gaming, and art!
          </p>
          <p className="mulish-p">
            You can find out more about me on my
            <span>{' '}</span>
            <a href="https://www.linkedin.com/in/jacksonliiii" target="_blank" className="about-link">
              LinkedIn <FaLinkedin className="link-icon" />
            </a>
            <span>{' '}</span>
            or my
            <span>{' '}</span>
            <a href="https://github.com/jacksonliiii" target="_blank" className="about-link">
              GitHub <FaGithub className="link-icon" />
            </a>
            <span>{' '}</span>
            account.
          </p>
          <p className="mulish-p">
            Enough about me. Do you want to become the Pirate King? Build your pirate crew and conquer the seas!
          </p>
        </div>

        <div className="how-to-play">
          <h2 className="mulish-heading">How to Play</h2>
          <ul className="mulish-p">
            <li>Click on the boss to deal damage and weaken them!</li>
            <li>Once defeated, use your berries to upgrade your crew to increase their stats!</li>
            <li>Level up your crew members to levels <strong>10</strong> and <strong>25</strong> for a surprise!</li>
            <li>Recruit new pirates to join your crew and strengthen your forces!</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default AboutPage
