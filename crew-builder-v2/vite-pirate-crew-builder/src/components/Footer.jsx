import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content mulish-p">
                <p>&copy; {new Date().getFullYear()} Pirate Rumble. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
