import React from 'react'
import './Footer.css'
import rsLogo from '../resources/logo.png'
import gitLogo from '../resources/github-logo.png'
import youTubeLogo from '../resources/youtube-logo.png'

const Footer = props => {

    return(
        <footer className="Footer">
            <div className="logodiv">
                <a href="https://github.com/ArtemDomochka/react-game" rel="noreferrer" target="_blank">
                    <img src={gitLogo} alt="RsSchool" className="logo"/>
                </a>
            </div>
            <div className="logodiv">
                <a href="https://www.youtube.com/" rel="noreferrer" target="_blank">
                    <img src={youTubeLogo} alt="RsSchool" className="logo"/>
                </a>
            </div>
            <div className="logodiv">
                <a href="https://rs.school/js/" rel="noreferrer" target="_blank">
                    <img src={rsLogo} alt="RsSchool" className="logo"/>
                </a>
            </div>
            <label className="label">
                2021
            </label>

            

        </footer>
    )
}

export default Footer