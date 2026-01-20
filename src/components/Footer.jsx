import './Footer.css';
import heart from '../assets/decorations/heart.png';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>
          Made with <img src={heart} alt="heart" className="footer-heart-img" /> by Jemimah Ra
        </p>
        <p className="copyright">&copy; {currentYear} All rights reserved.</p>
        <p className="secret-hint" title="Try it with your keyboard...">
          ↑↑↓↓←→←→BA
        </p>
      </div>
    </footer>
  );
}

export default Footer;
