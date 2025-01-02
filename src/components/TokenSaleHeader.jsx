import logo from "src/assets/logo.svg";
import logomobile from "src/assets/logo-mobile.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { connectWallet } from "src/features/wallet/walletSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const TokenSaleHeader = ({ heroref, teamref, roadmapref, tokenomicsref }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPhantomInstalled, setIsPhantomInstalled] = useState(true);
  const wallet = useSelector((state) => state.wallet);

  // Check for Phantom Wallet installation
  useEffect(() => {
    if (!window.solana || !window.solana.isPhantom) {
      setIsPhantomInstalled(false);
    } else {
      // Check if wallet is already connected (stored in localStorage)
      const walletAddress = wallet?.address;
      if (walletAddress) {
        dispatch(connectWallet(walletAddress)); // Connect the wallet from localStorage
      }
    }
  }, [dispatch]);

  const handleWalletConnect = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const resp = await window.solana.connect();
        const walletAddress = resp.publicKey.toString();

        // Dispatch the wallet connection to redux store
        dispatch(connectWallet(walletAddress));

        // Show success toast
        toast.success("Wallet connected successfully!");
      } catch (err) {
        toast.error("Failed to connect wallet. Please try again.");
      }
    } else {
      // Open Phantom wallet installation link and show toast
      window.open("https://phantom.app/download", "_blank");
      toast.error("Phantom Wallet is not installed. Please install it.");
    }
  };

  // Handle smooth scrolling to sections using refs
  const handleSmoothScroll = (ref) => {
    if (location.pathname !== "/index") {
      navigate("/index");
      // Add a small delay to allow navigation to complete
      setTimeout(() => {
        if (ref?.current) {
          ref.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    } else {
      if (ref?.current) {
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <header className="flex justify-between items-center w-full max-w-7xl py-2  md:py-6 px-6 ">
      <a href="/">
        <img src={logo} alt="arrow" className="lg:block hidden lg:w-44" />{" "}
        <img src={logomobile} alt="arrow" className="lg:hidden block" />
      </a>
      <nav className="hidden md:flex items-center space-x-6 text-gray-400">
        <button
          onClick={() => handleSmoothScroll(heroref)}
          className="hover:text-white active:text-primary"
        >
          Benefits
        </button>
        <a href="/index" className="hover:text-white">
          Team
        </a>
        <a href="/index" className="hover:text-white">
          Roadmap
        </a>
        <a href="/index" className="hover:text-white">
          Tokenomics
        </a>
        {wallet?.address && (
          <Link to="/user/dashboard" className="hover:text-white">
            Dashboard
          </Link>
        )}
      </nav>
      {!wallet.address ? (
        <>
          {isPhantomInstalled ? (
            <button
              onClick={handleWalletConnect}
              className="bg-white cursor-pointer rounded-xl px-3 py-2 flex items-center space-x-1 hover:underline font-bold"
            >
              <span className="gradient-text">Connect Wallet</span>
            </button>
          ) : (
            <button
              onClick={() =>
                window.open("https://phantom.app/download", "_blank")
              }
              className="bg-white cursor-pointer gradient-text rounded-xl px-3 py-2 flex items-center space-x-1 hover:underline font-bold"
            >
              <span className="gradient-text">Install Phantom Wallet</span>
            </button>
          )}
        </>
      ) : (
        <div className="bg-white cursor-pointer rounded-xl px-3 py-2 flex items-center space-x-1 hover:underline font-bold">
          <span className="gradient-text">
            {wallet?.address.substring(0, 15)}.....
          </span>
        </div>
      )}
      {/* <a
        href="#token-page"
        className="bg-white rounded-xl px-3 py-2 flex items-center space-x-1 hover:underline font-bold"
      >
        <span className="gradient-text">Connect Wallet</span>
      </a> */}
    </header>
  );
};

export default TokenSaleHeader;
