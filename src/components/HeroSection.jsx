// import { FaArrowRight } from "react-icons/fa";

import arrow from "src/assets/arrow.svg";

import pumpkin from "src/assets/pumpkin.svg";

// import { motion } from "framer-motion";

// const HeroSection = () => {
//   return (
//     <main className="flex flex-col  text-center mt-12 max-w-7xl">
//       <div className="md:grid md:grid-cols-4 flex flex-col-reverse  relative ">
//         {/* Start Content */}
//         <div className="col-span-2">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight space-y-4 md:text-left ">
//             <div>Pump Pumpkin</div>
//             <div>Better Pump</div>
//             <div>Platform</div>
//           </h1>
//           <p className="text-grey font-light mt-4 text-2xl text-start md:text-left">
//             Pump Pumpkin live streams are back in town—a community-owned
//             platform. Smarter, safer, and built for better memes.
//           </p>
//         </div>
//         {/* Arrow */}
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:block hidden">
//           <img src={arrow} alt="arrow" />
//         </div>
//         {/* Pumpkin Image */}
//         <div className="col-span-2  flex justify-center  ">
//           <div className="text-blue-500 w-32 h-32 sm:w-48 sm:h-48 lg:w-full lg:h-96">
//             <motion.img
//               src={pumpkin}
//               alt="pumpkin"
//               className="w-full h-full drop-shadow-sm cursor-pointer"
//               whileHover={{ y: [-5, 5, -5] }}
//               transition={{
//                 duration: 0.6,
//                 repeat: Infinity,
//                 repeatType: "reverse",
//               }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="flex md:flex-row md:justify-start flex-col gap-4 mt-2 text-base">
//         <a
//           href="#pitch-deck"
//           className="gradient-color font-bold py-3 px-4 rounded-[4px] text-light_grey hover:border-white hover:text-white flex gap-x-2 items-center"
//         >
//           <span>Community</span>
//           <FaArrowRight className="w-4 h-4" />
//         </a>
//         <a
//           href="#pitch-deck"
//           className="border border-grey text-grey py-3 px-4 rounded-[4px] hover:border-white hover:text-white"
//         >
//           Pitch Deck
//         </a>
//         <a
//           href="#whitepaper"
//           className="border border-grey text-grey py-3 px-4 rounded-[4px] hover:border-white hover:text-white"
//         >
//           Whitepaper
//         </a>
//         <a
//           href="#stay-updated"
//           className="border border-grey text-grey py-3 px-4 rounded-[4px] hover:border-white hover:text-white"
//         >
//           Stay updated
//         </a>
//       </div>
//     </main>
//   );
// };

// export default HeroSection;

import { FaArrowRight, FaTimes } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const playerRef = useRef(null);

  const handlePumpkinClick = () => {
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);
      setIsVideoVisible(true);
    }, 300);
  };

  const handleCloseVideo = () => {
    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }
    setIsVideoVisible(false);
  };

  useEffect(() => {
    if (isVideoVisible) {
      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }

      window.onYouTubeIframeAPIReady = () => {
        if (playerRef.current) {
          playerRef.current.destroy();
        }

        playerRef.current = new window.YT.Player("youtube-player", {
          videoId: "9iDXWx7GtZQ",
          playerVars: {
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                setIsVideoVisible(false);
              }
            },
          },
        });
      };

      if (window.YT && window.YT.Player) {
        if (playerRef.current) {
          playerRef.current.destroy();
        }
        playerRef.current = new window.YT.Player("youtube-player", {
          videoId: "9iDXWx7GtZQ",
          playerVars: {
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                setIsVideoVisible(false);
              }
            },
          },
        });
      }
    }
  }, [isVideoVisible]);

  return (
    <div className="relative">
      {isFlashing && (
        <div className="fixed inset-0 bg-white z-50 animate-flash" />
      )}

      <div
        className={`fixed inset-0 bg-black z-40 ${
          isVideoVisible ? "block" : "hidden"
        }`}
      >
        <button
          onClick={handleCloseVideo}
          className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-gray-800 transition-colors z-50"
        >
          <FaTimes className="w-6 h-6" />
        </button>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full max-w-6xl max-h-[80vh]">
            <div id="youtube-player" className="w-full h-full" />
          </div>
        </div>
      </div>

      <main
        className={`flex flex-col text-center mt-12 max-w-7xl ${
          isVideoVisible ? "invisible" : "visible"
        }`}
      >
        <div className="md:grid md:grid-cols-4 flex flex-col-reverse relative">
          <div className="col-span-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight space-y-4 md:text-left">
              <div>Pump Pumpkin</div>
              <div>Better Pump</div>
              <div>Platform</div>
            </h1>
            <p className="text-grey font-light mt-4 text-2xl text-start md:text-left">
              Pump Pumpkin live streams are back in town—a community-owned
              platform. Smarter, safer, and built for better memes.
            </p>
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:block hidden">
            <img src={arrow} alt="arrow" />
          </div>

          <div className="col-span-2 flex justify-center">
            <div className="text-blue-500 w-32 h-32 sm:w-48 sm:h-48 lg:w-full lg:h-96">
              <motion.img
                src={pumpkin}
                alt="pumpkin"
                className="w-full h-full drop-shadow-sm cursor-pointer"
                whileHover={{ y: [-5, 5, -5] }}
                onClick={handlePumpkinClick}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex md:flex-row md:justify-start flex-col gap-4 mt-2 text-base">
          <a
            href="https://t.me/PumpPumpkinio"
            className="gradient-color font-bold py-3 px-4 rounded-[4px] text-light_grey hover:border-white hover:text-white flex gap-x-2 items-center"
          >
            <span>Community</span>
            <FaArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://pitchdeck.pumppumpkin.io"
            target="_blank"
            className="border border-grey text-grey py-3 px-4 rounded-[4px] hover:border-white hover:text-white"
          >
            Pitch Deck
          </a>
          <a
            href="https://pumppumpkin.gitbook.io/pumppumpkin.io"
            className="border border-grey text-grey py-3 px-4 rounded-[4px] hover:border-white hover:text-white"
          >
            Whitepaper
          </a>
          <a
            href="https://x.com/pumppumpkinio"
            className="border border-grey text-grey py-3 px-4 rounded-[4px] hover:border-white hover:text-white"
          >
            Stay updated
          </a>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;
