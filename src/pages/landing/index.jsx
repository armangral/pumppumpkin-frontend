import TokenomicsChart from "src/components/TokenomicsChart";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import HeroSection from "src/components/HeroSection";
import TeamSection from "src/components/TeamSection";
import { useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function LandingPage() {
  // Define refs for each section
  const heroref = useRef(null);
  const teamref = useRef(null);
  const roadmapref = useRef(null);
  const tokenomicsRef = useRef(null);

  // Function to scroll to a specific section
  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavigate = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0); // Ensures it happens after navigation
  };

  return (
    <div className="text-white min-h-screen flex flex-col items-center px-6 ">
      {/* Header */}
      <Header
        onNavigate={(section) => {
          switch (section) {
            case "hero":
              scrollToSection(heroref);
              break;
            case "team":
              scrollToSection(teamref);
              break;
            case "roadmap":
              scrollToSection(roadmapref);
              break;
            case "tokenomics":
              scrollToSection(tokenomicsRef);
              break;
            default:
              break;
          }
        }}
      />

      {/* Main Content */}
      <div ref={heroref}>
        <HeroSection />
      </div>

      {/*Meet the Team */}
      <div ref={teamref}>
        <TeamSection />
      </div>

      {/*Road Map */}

      <div
        ref={roadmapref}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center lg:mt-20 mt-10 lg:mb-20 mb-10"
      >
        <h2 className="text-3xl lg:text-5xl font-bold mb-4">The Road Map</h2>
        <p className="mb-12 text-lg max-w-3xl">
          Our roadmap outlines our vison and steps to revolutionize Our unique
          bonding curve trading experience, Explore our journey and upcoming
          milestones
        </p>
        <img src="/timeline.svg" alt="timeline" />
        <p className="text-sm mt-10 text-grey max-w-3xl">
          #All roadmap timelines and tokenomics allocations are subject to
          change to ensure optimal outcomes and maximum value for PP token
          holders.
        </p>
      </div>

      {/* Tokenomics */}
      <div ref={tokenomicsRef}>
        <TokenomicsChart />
      </div>

      {/*Token sale*/}
      <div className="max-w-7xl gradient-color mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center lg:mt-20 mt-10 lg:mb-20 mb-10 rounded-2xl py-10 space-y-6">
        <h2 className="text-3xl lg:text-5xl font-bold mb-4 capitalize">
          acquire pP tokens
        </h2>
        <p className="mb-12 text-lg md:text-xl">
          Join the token sale now. build Pump Pumpkin. You'll not only profit
          from the future of Pump Pumpkin but also get the power to vote on
          where we go next!
        </p>

        <Link
          to="/tokensale"
          onClick={handleNavigate}
          className="bg-light_grey hover:bg-black hover:text-white font-bold py-3 px-4 rounded-[4px]  text-black flex gap-x-2 items-center"
        >
          <span>join the tokensale</span>
          <FaArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/*Footer */}
      <Footer
        onNavigate={(section) => {
          switch (section) {
            case "hero":
              scrollToSection(heroref);
              break;
            case "team":
              scrollToSection(teamref);
              break;
            case "roadmap":
              scrollToSection(roadmapref);
              break;
            case "tokenomics":
              scrollToSection(tokenomicsRef);
              break;
            default:
              break;
          }
        }}
      />
    </div>
  );
}

export default LandingPage;
