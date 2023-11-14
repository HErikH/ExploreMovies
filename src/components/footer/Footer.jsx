import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import "././style.scss";

function Footer() {
  return (
    <footer className="footer">
        <ContentWrapper>
            <ul className="footer-menuItems">
                <li className="footer-menuItems__menuItem">Terms Of Use</li>
                <li className="footer-menuItems__menuItem">Privacy-Policy</li>
                <li className="footer-menuItems__menuItem">About</li>
                <li className="footer-menuItems__menuItem">Blog</li>
                <li className="footer-menuItems__menuItem">FAQ</li>
            </ul>
            <div className="footer-infoText">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur.
            </div>
            <div className="footer-socialIcons">
                <span className="footer-socialIcons__icon">
                    <FaFacebookF />
                </span>
                <span className="footer-socialIcons__icon">
                    <FaInstagram />
                </span>
                <span className="footer-socialIcons__icon">
                    <FaTwitter />
                </span>
                <span className="footer-socialIcons__icon">
                    <FaLinkedin />
                </span>
            </div>
        </ContentWrapper>
    </footer>
  )
}
export default Footer;
