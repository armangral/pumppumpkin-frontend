import { FaArrowRight } from "react-icons/fa";

import Footer from "src/components/Footer";
import { SiSolana } from "react-icons/si";
import pumpkin from "src/assets/img/token/whitepumpkin.svg";
import tagbar from "src/assets/img/token/tagbar.svg";
import lockanimation from "src/assets/img/token/lock.gif";

import {
  Box,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { VerifyUserReferralCode } from "src/services/apiUser";
import { useSelector } from "react-redux";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";

import TokenSaleHeader from "src/components/TokenSaleHeader";
import { useTokenSaleSummary } from "src/features/investor/useTokenSaleSummary";
import TokenSaleMain from "src/components/tokensale/TokenSaleMain";

const ADMIN_ADDRESS = import.meta.env.VITE_ADMIN_ADDRESS;
const MAINNET_RPC_URL = import.meta.env.VITE_MAINNET_RPC_URL;

// Import buffer for browser environment
import { Buffer } from "buffer";
import { useBuyTokens } from "src/features/investor/useBuyTokens";
import { Link } from "react-router-dom";

// Make buffer globally available
window.Buffer = Buffer;

// Constants for localStorage
const STORAGE_KEY = "token_sale_auth";
const REFERRAL_CODE_KEY = "referral_code";

function TokenSalePage() {
  // Define refs for each section
  const heroref = useRef(null);
  const teamref = useRef(null);
  const roadmapref = useRef(null);
  const tokenomicsRef = useRef(null);

  const handleNavigate = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0); // Ensures it happens after navigation
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenWithdrawModal,
    onOpen: onOpenWithdrawOpen,
    onClose: onCloseWithdrawModal,
  } = useDisclosure();

  const { isLoading: isLoadingSaleSummary, tokensalesummary } =
    useTokenSaleSummary();

  // const [referralCode, setReferralCode] = useState("");
  const [referralCode, setReferralCode] = useState(() => {
    return localStorage.getItem(REFERRAL_CODE_KEY) || "";
  });
  const [isLoading, setIsLoading] = useState(false);

  const [solInput, setSolInput] = useState(""); // State for SOL input
  const [ppOutput, setPpOutput] = useState(""); // State for PP token output

  const [isConnecting, setIsConnecting] = useState(false);

  const [isAuthorized, setIsAuthorized] = useState(() => {
    // Check localStorage for existing authorization
    return localStorage.getItem(STORAGE_KEY) === "true";
  });
  const [error, setError] = useState("");
  const wallet = useSelector((state) => state.wallet);

  const { isPending, buytokens } = useBuyTokens();

  const connection = new Connection(MAINNET_RPC_URL, "confirmed");

  // Show modal on component mount if not authorized
  useEffect(() => {
    if (!isAuthorized) {
      onOpen();
    }
  }, [isAuthorized]);

  // Handle authorization state changes
  useEffect(() => {
    if (isAuthorized) {
      localStorage.setItem(STORAGE_KEY, "true");
      localStorage.setItem(REFERRAL_CODE_KEY, referralCode);
    }
  }, [isAuthorized]);

  const handleSubmit = async () => {
    if (!referralCode.trim()) {
      setError("Please enter a referral code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await VerifyUserReferralCode(referralCode);

      if (response) {
        setIsAuthorized(true);
        onClose();
        toast.success("Referral code verified successfully!");
      }
    } catch (error) {
      setError(error.message || "Invalid referral code");
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(REFERRAL_CODE_KEY);

      toast.error(error.message || "Failed to verify referral code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSolInputChange = (e) => {
    const solValue = e.target.value;
    setSolInput(solValue);

    // Convert SOL to PP Tokens
    const ppValue = parseFloat(solValue) * tokensalesummary?.pp_token_amount;

    if (isNaN(ppValue)) {
      setPpOutput("");
      return;
    }

    // Convert to string and remove trailing zeros after decimal
    const formattedValue = ppValue.toString();

    // If it's a whole number, show without decimal
    if (Number.isInteger(ppValue)) {
      setPpOutput(formattedValue);
    } else {
      // For decimals, show all significant digits without trailing zeros
      setPpOutput(parseFloat(formattedValue).toString());
    }
  };

  async function sendTransactionToSolana(amount) {
    const provider = window.solana; // Get Phantom wallet instance

    if (provider && provider.isPhantom) {
      try {
        setIsConnecting(true);

        // Connect to Phantom wallet
        await provider.connect();

        // Get the user's public key
        const fromWallet = provider.publicKey;

        // Get the user's wallet balance
        const balance = await connection.getBalance(fromWallet);
        const lamportsRequired = amount * 1e9; // Convert SOL to lamports

        // Check if the user has enough balance
        if (balance < lamportsRequired) {
          toast.error("Insufficient balance to complete the transaction.");
          return;
        }

        // Define the admin's public key
        const toPublicKey = new PublicKey(ADMIN_ADDRESS);

        // Ensure the amount is valid
        if (isNaN(amount) || amount <= 0) {
          toast.error("Invalid amount entered");
          return;
        }

        // Create a transaction for transferring SOL
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: fromWallet, // Sender's wallet
            toPubkey: toPublicKey, // Admin's wallet
            lamports: lamportsRequired, // Amount in lamports (1 SOL = 1e9 lamports)
          })
        );

        // Get the latest blockhash
        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = fromWallet;

        // Sign the transaction with Phantom
        const signedTransaction = await provider.signTransaction(transaction);

        // Send the signed transaction to Solana
        const rawTransaction = signedTransaction.serialize();
        const signature = await connection.sendRawTransaction(rawTransaction, {
          skipPreflight: false,
        });

        // Confirm the transaction
        await connection.confirmTransaction(signature, "confirmed");

        toast.success("SOL transaction successful!");

        const formdata = {
          wallet_address: wallet?.address,
          token_amount: ppOutput,
          sol_amount: solInput,
          referral_code: referralCode,
          transaction_hash: signature,
        };

        buytokens(formdata, {
          onSuccess: () => {
            setPpOutput("");
            setSolInput("");
            onCloseWithdrawModal();
          },
        });
      } catch (error) {
        toast.error("Transaction failed: " + error.message);
      } finally {
        setIsConnecting(false);
      }
    } else {
      toast.error("Phantom wallet not found");
    }
  }

  return (
    <div className="text-white min-h-screen flex flex-col items-center ">
      {/* Header */}
      <TokenSaleHeader
        heroref={heroref}
        teamref={teamref}
        roadmapref={roadmapref}
        tokenomicsref={tokenomicsRef}
      />

      {/* Main Content */}
      <TokenSaleMain
        isLoadingSaleSummary={isLoadingSaleSummary}
        onOpenWithdrawOpen={onOpenWithdrawOpen}
        tokensalesummary={tokensalesummary}
        solInput={solInput}
        ppOutput={ppOutput}
        handleSolInputChange={handleSolInputChange}
      />

      <div className="w-full my-10 lg:my-28">
        <img src={tagbar} alt="tagbar" className="w-full" />
      </div>

      <div className="max-w-7xl gradient-color lg:mx-auto mx-6 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center lg:mt-20 mt-10 lg:mb-20 mb-10 rounded-2xl py-10 space-y-6">
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
      <Footer />

      {/* Modal */}
      <Modal
        isOpen={!isAuthorized || isOpen}
        onClose={isAuthorized ? onClose : undefined}
        isCentered
        closeOnOverlayClick={isAuthorized}
        closeOnEsc={isAuthorized}
      >
        <ModalOverlay
          bg="rgba(0, 0, 0, 0.6)" // Semi-transparent black for the overlay.
          backdropFilter="blur(10px)" // Applies a 10px blur to the background.
        />{" "}
        <ModalContent
          bg="#121212"
          color="white"
          border="2px solid"
          borderRadius="3xl"
          borderColor="white"
          p={4}
          width={{ base: "90%", sm: "80%", md: "60%", lg: "50%" }} // Responsive width
          maxW="800px" // Optional max width
        >
          <ModalHeader
            fontSize="3xl"
            fontWeight="extrabold"
            className="flex justify-center"
          >
            <Img src={lockanimation} alt="animation" />{" "}
          </ModalHeader>
          <ModalCloseButton color="gray.400" />

          <ModalBody>
            {/* Balance Display */}
            <Text
              className="text-sm lg:text-2xl text-center"
              fontWeight="extrabold"
              mb={2}
            >
              Enter your Ref Code to Unlcok This Page{" "}
            </Text>
            <p className="text-sm mb-4 text-center">
              For this page you need a VIP invitation code .
            </p>

            {/* Amount Input */}
            <Text mb={2} className="text-base text-center font-semibold ">
              Write Your Code{" "}
            </Text>

            <Input
              placeholder="Enter Code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              bg="#212629"
              h={"56px"}
              color="white"
              mb={2}
              borderColor="#3C3C3C"
            />
          </ModalBody>

          <ModalFooter>
            <button
              className="gradient-color w-full h-14 rounded-md font-extrabold text-base hover:bg-primary hover:text-black"
              onClick={handleSubmit}
              disabled={!referralCode.trim()}
            >
              {isLoading ? "Verifying..." : "Submit"}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal Withdraw balance*/}
      <Modal
        isOpen={isOpenWithdrawModal}
        onClose={onCloseWithdrawModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent bg="#121212" color="white" borderRadius="3xl" p={4}>
          <ModalHeader fontSize="2xl" fontWeight="extrabold">
            Be An Early Investor{" "}
          </ModalHeader>
          <ModalCloseButton color="gray.400" />

          <ModalBody>
            {/* Balance Display */}
            <Text fontSize="lg" fontWeight="extrabold" mb={4}>
              BALANCE:0{" "}
            </Text>

            {/* Amount Input */}
            <Text mb={2} className="text-base font-semibold uppercase">
              Amount
            </Text>
            <Box
              display="flex"
              alignItems="center"
              bg="#212629"
              borderRadius="md"
              mb={4}
            >
              <Input
                type="number"
                value={solInput}
                placeholder="SOL Amount"
                borderColor="#3C3C3C"
                color="white"
                h={"56px"}
                readOnly
                // _focus={{ boxShadow: "none" }}
              />
              <div className="bg-[#212629] border rounded-md flex justify-center gap-x-2 items-center border-[#3C3C3C] px-4 h-14">
                <div className="rounded-full gradient-color p-2 ">
                  <SiSolana size={20} className="text-white" />
                </div>
                <p className="font-extrabold text-lg">SOL</p>
              </div>
            </Box>

            {/* Wallet Address Input */}
            <Text mb={2} className="text-base font-semibold uppercase">
              Set GET AMOUNT (PP TOKENS){" "}
            </Text>
            <Box
              display="flex"
              alignItems="center"
              bg="#212629"
              borderRadius="md"
              mb={4}
            >
              <Input
                type="number"
                value={ppOutput}
                placeholder="PP Amount"
                borderColor="#3C3C3C"
                color="white"
                h={"56px"}
                readOnly

                // _focus={{ boxShadow: "none" }}
              />
              <div className="bg-[#212629] border rounded-md flex justify-center gap-x-2 items-center border-[#3C3C3C] px-4 h-14">
                <div className="rounded-full gradient-color p-2 w-10 h-10">
                  <img src={pumpkin} alt="pumpkin-white" className="w-7 h-7" />
                  {/* <SiSolana size={20} className="text-white" /> */}
                </div>
                <p className="font-extrabold text-lg">PP</p>
              </div>
            </Box>

            <div className="flex font-semibold mb-2 justify-between items-center border-b p-2 border-white border-dotted">
              <p>$ Prices</p>
              <p>
                {ppOutput && tokensalesummary?.usd_per_token
                  ? ppOutput * tokensalesummary?.usd_per_token?.toFixed(6)
                  : "-"}
              </p>
            </div>
            <div className="flex font-semibold justify-between items-center border-b p-2 border-white border-dotted">
              <p>Total Amount</p>
              <p>
                {" "}
                {ppOutput && tokensalesummary?.usd_per_token
                  ? ppOutput * tokensalesummary?.usd_per_token?.toFixed(6)
                  : "-"}
              </p>
            </div>
          </ModalBody>

          <ModalFooter>
            <button
              className="gradient-color w-full h-14 rounded-md font-extrabold text-base hover:bg-primary hover:text-black"
              onClick={() => {
                if (!wallet.address) {
                  toast.error("Connect Wallet First!");
                  return;
                }

                if (!referralCode) {
                  toast.error("Referral Code not Found!");
                  return;
                }
                sendTransactionToSolana(solInput);
              }}
            >
              {isConnecting ? <Spinner /> : "BUY NOW"}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default TokenSalePage;
