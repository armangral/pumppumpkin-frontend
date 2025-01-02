import { FaPaperPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsPaperclip } from "react-icons/bs";
import logo from "src/assets/logo.svg";
import logomobile from "src/assets/logo-mobile.svg";
import { motion } from "framer-motion";

const Footer = ({ onNavigate }) => {
  return (
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 text-grey">
      <div className="flex items-center justify-between">
        <a href="/">
          <img src={logo} alt="arrow" className="lg:block hidden lg:w-44" />{" "}
          <img src={logomobile} alt="arrow" className="lg:hidden block" />
        </a>

        <div className="flex justify-center gap-x-2 md:gap-x-5 ">
          <motion.a
            href="https://t.me/PumpPumpkinio"
            className="text-black rounded-full bg-white p-3"
            target="_blank"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <FaPaperPlane className="md:w-6 md:h-6 w-4 h-4" />
            <span className="sr-only">Telegram community</span>
          </motion.a>
          <motion.a
            href="https://x.com/pumppumpkinio"
            className="text-white  rounded-full gradient-color p-3 "
            target="_blank"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <FaXTwitter className="md:w-6 md:h-6 w-4 h-4" />
            <span className="sr-only">Twitter page</span>
          </motion.a>
          <motion.a
            href="https://pumppumpkin.gitbook.io/pumppumpkin.io"
            className="text-black rounded-full bg-white p-3 "
            target="_blank"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <BsPaperclip className="md:w-6 md:h-6 w-4 h-4" />
            <span className="sr-only">White Paper</span>
          </motion.a>
        </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />

      <div className="md:flex md:justify-between">
        <div className="mb-6 md:mb-0">
          <div className="flex flex-col gap-y-2">
            <span className="text-2xl capitalize">Reach us at</span>
            <span className=" text-2xl font-semibold whitespace-nowrap text-white">
              cool@pumppumpkin.io{" "}
            </span>
            <span className="text-sm text-grey ">
              © Copyright 2024 by{" "}
              <a href="/" className="hover:underline">
                PumpPumpkin.io
              </a>
              {/* . All Rights Reserved. */}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4">
          <div>
            <h2 className="mb-6 text-sm font-bold text-white uppercase">
              Get Started{" "}
            </h2>
            <ul className="text-gray-500 font-normal">
              <li className="mb-4">
                <a href="/tokensale" className="hover:underline">
                  Buy PP Tokens{" "}
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://pumppumpkinio.medium.com/"
                  className="hover:underline"
                  target="_blank"
                >
                  Our Blog{" "}
                </a>
              </li>
              <li>
                <a
                  onClick={() => onNavigate("roadmap")}
                  className="hover:underline"
                >
                  Plans{" "}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-bold text-white uppercase">
              Discover{" "}
            </h2>
            <ul className="text-gray-500 font-normal">
              <li className="mb-4">
                <a
                  href="https://drive.google.com/file/d/1TLJYKYfOY918s2JGboar8vyDUNTz-Fvy/view?usp=drive_link"
                  className="hover:underline"
                  target="_blank"
                >
                  Our Vison{" "}
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="/tokensale"
                  target="_blank"
                  className="hover:underline"
                >
                  PP Token{" "}
                </a>
              </li>
              <li>
                <a
                  href="https://wellfound.com/company/pump-pumpkin/jobs"
                  className="hover:underline"
                  target="_blank"
                >
                  Technology
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-bold text-white uppercase">
              PP World{" "}
            </h2>
            <ul className="text-gray-500 font-normal">
              <li className="mb-4">
                <a
                  href="https://youtube.com/@pumppumpkinio?si=MNr92Z0-Oy_pMK-c"
                  className="hover:underline"
                  target="_blank"
                >
                  Videos{" "}
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://t.me/PumpPumpkinio"
                  className="hover:underline"
                  target="_blank"
                >
                  Community{" "}
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/pumppumpkinio"
                  className="hover:underline"
                  target="_blank"
                >
                  Announcements
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-bold text-white uppercase">
              Other{" "}
            </h2>
            <ul className="text-gray-500 font-normal">
              <li className="mb-4">
                <a
                  href="https://pitchdeck.pumppumpkin.io"
                  className="hover:underline"
                  target="_blank"
                >
                  pitch deck
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://pumppumpkin.gitbook.io/pumppumpkin.io"
                  className="hover:underline"
                  target="_blank"
                >
                  Whitepaper{" "}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Pump-Pumpkin"
                  className="hover:underline"
                  target="_blank"
                >
                  GitHub{" "}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
