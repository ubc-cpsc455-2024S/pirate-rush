import React from "react";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content mulish-p">
                <p>
                    &copy; {new Date().getFullYear()} Pirate Rush by Jackson Li.
                    Credits for all character art go to ©Bandai Namco
                    Entertainment Inc. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
