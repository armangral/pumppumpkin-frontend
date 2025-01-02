import yonatan from "src/assets/yonatan.svg";
import tom from "src/assets/tom.svg";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const TeamSection = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:mt-20 mt-10 lg:mb-20 mb-10">
      <h2 className="text-3xl lg:text-5xl font-bold mb-4">Meet The Team</h2>
      <p className="mb-12 text-lg">
        Our team blends creativity and tech to shape the future of our unique
        bonding curve experience - meet the innovators behind our unique trading
        experiences.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <motion.div
          className="bg-gray-800 rounded-lg shadow-lg overflow-hidden p-4 lg:h-[460px] lg:w-[393px]"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="bg-primary flex justify-center items-end rounded-md lg:h-80 h-[301px]">
            <img
              className="h-full lg:w-auto w-full object-cover"
              src={yonatan}
              alt="Yonatan Badash"
            />
          </div>
          <div className="p-6">
            <div>
              <h3 className="text-[22px] font-semibold">Yonatan Badash</h3>
              <p className="text-gray-400 text-sm">CEO & Founder</p>
            </div>

            <div className="flex gap-x-4 justify-center  py-3 mb-4">
              <a
                href="https://www.linkedin.com/in/yonatan-badash-a19aa1279/"
                className="text-light_grey hover:text-primary"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a
                href="https://x.com/YonatanBadash1"
                className="text-light_grey hover:text-black"
              >
                <FaSquareXTwitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="bg-gray-800 rounded-lg shadow-lg overflow-hidden p-4 lg:h-[460px] lg:w-[393px]"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {" "}
          <div className="bg-primary flex justify-center items-end rounded-md lg:h-80 h-[301px]">
            <img
              className="h-full lg:w-auto w-full object-cover"
              src={tom}
              alt="Tom Grinberg"
            />
          </div>
          <div className="p-6">
            <div>
              <h3 className="text-[22px] font-semibold">Tom Grinberg</h3>
              <p className="text-gray-400 text-sm">Head of Marketing</p>
            </div>
            <div className="flex gap-x-4 justify-center  py-3 mb-4">
              <a
                href="https://www.linkedin.com/in/tom-grinberg/"
                className="text-light_grey hover:text-primary"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeamSection;
