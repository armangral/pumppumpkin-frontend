import logo from "src/assets/logo.svg";
import logomobile from "src/assets/logo-mobile.svg";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ onNavigate }) => {
  return (
    <header className="flex justify-between items-center w-full max-w-7xl py-2  md:py-6 ">
      <a href="/">
        <img src={logo} alt="arrow" className="lg:block hidden lg:w-44" />{" "}
        <img src={logomobile} alt="arrow" className="lg:hidden block" />
      </a>
      <nav className="hidden md:flex items-center space-x-6 text-gray-400">
        <Link
          href="#"
          className="hover:text-white active:text-primary"
          onClick={() => onNavigate("hero")}
        >
          Benefits
        </Link>

        <Link
          href="#team"
          className="hover:text-white"
          onClick={() => onNavigate("team")}
        >
          Team
        </Link>

        <Link
          href="#roadmap"
          className="hover:text-white"
          onClick={() => onNavigate("roadmap")}
        >
          Roadmap
        </Link>

        <Link
          href="#tokenomics"
          className="hover:text-white"
          onClick={() => onNavigate("tokenomics")}
        >
          Tokenomics
        </Link>
      </nav>
      <Link
        to="/tokensale"
        className="text-white flex items-center space-x-1 hover:underline font-bold"
      >
        <span className="lg:block hidden">Go To Token Page</span>
        <span className="lg:hidden block">Token Page</span>
        <FaArrowRight className="font-bold" />
      </Link>
    </header>
  );
};

export default Header;
