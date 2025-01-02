import {
  Box,
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
import { FaEquals } from "react-icons/fa";
import { RiEqualLine } from "react-icons/ri";
import { TbDownload } from "react-icons/tb";
import { useSelector } from "react-redux";
import pumpkin from "src/assets/img/admin/pumpkin.svg";
import UserDashboardChart from "src/components/user/dashboard/UserDashboardChart";
import UserValueCircle from "src/components/user/dashboard/UserValueCircle";
import { useInvestorInvestmentSummary } from "src/features/investor/useInvestorInvestmentSummary";
import { useTokenSaleSummary } from "src/features/investor/useTokenSaleSummary";
import { useSolPrice } from "src/features/sol/useSolPrice";

const ADMIN_ADDRESS = import.meta.env.VITE_ADMIN_ADDRESS;
const USDC_MINT_ADDRESS = import.meta.env.VITE_USDC_MINT_ADDRESS;
const MAINNET_RPC_URL = import.meta.env.VITE_MAINNET_RPC_URL;

// Import buffer for browser environment
import { Buffer } from "buffer";
import { useBuyTokens } from "src/features/investor/useBuyTokens";
import { useState } from "react";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import toast from "react-hot-toast";
import { SiSolana } from "react-icons/si";
import { HiEye } from "react-icons/hi";
import { usePpHoldingValue } from "src/features/investor/usePpHoldingValue";

// Make buffer globally available
window.Buffer = Buffer;

const REFERRAL_CODE_KEY = "referral_code";

const UserDashboardPage = () => {
  const wallet = useSelector((state) => state.wallet);

  const {
    isLoading: isLoadingInvestmentSummary,
    data: investorinvestmentsummary,
  } = useInvestorInvestmentSummary(wallet?.address);

  const { isLoading: isLoadingSol, solprice } = useSolPrice();
  const { isLoading: isLoadingSaleSummary, tokensalesummary } =
    useTokenSaleSummary();

  // const [referralCode, setReferralCode] = useState("");
  const [referralCode, setReferralCode] = useState(() => {
    return localStorage.getItem(REFERRAL_CODE_KEY) || "";
  });

  const { isLoading: isLoadingPPHoldingValue, data: ppholdingvalue } =
    usePpHoldingValue(referralCode);

  const [solInput, setSolInput] = useState(""); // State for SOL input
  const [ppOutput, setPpOutput] = useState(""); // State for PP token output

  const [isConnecting, setIsConnecting] = useState(false);

  const [error, setError] = useState("");

  const connection = new Connection(MAINNET_RPC_URL, "confirmed");

  const { isPending, buytokens } = useBuyTokens();

  const {
    isOpen: isOpenWithdrawModal,
    onOpen: onOpenWithdrawOpen,
    onClose: onCloseWithdrawModal,
  } = useDisclosure();

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

  const handleBuyNow = () => {
    if (solInput > 0) {
      onOpenWithdrawOpen();
    } else {
      toast.error("Please enter a positive SOL amount to proceed!");
    }
  };

  return (
    <div>
      <div className="grid lg:grid-cols-5  lg:space-x-6 space-y-8 lg:space-y-0 py-2">
        {/*left box */}
        <div className="col-span-2 bg-primary rounded-2xl md:h-auto  p-6 flex flex-col justify-between gap-y-6">
          <div className="flex items-center gap-x-4 ">
            <div className="bg-light_grey rounded-full w-16 md:w-24 h-16 md:h-24 p-2 md:p-4 flex gap-x-1 items-center justify-center">
              <img src={pumpkin} alt="pumpkin" className="w-full h-full" />
            </div>

            <div className="space-y-1 text-light_grey">
              <p className="text-sm md:text-lg">Total Token Sale</p>
              <div className="flex gap-x-2 items-center">
                <p className="text-light_grey font-extrabold text-xl md:text-2xl">
                  {investorinvestmentsummary?.total_tokens_invested} PP{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="flex md:flex-row flex-col justify-between md:gap-y-0 gap-y-4 md:gap-x-8">
            <div className="space-y-1 text-light_grey md:w-1/2 ">
              <p className="text-sm md:text-lg whitespace-nowrap">
                Total Sale Value In SOL
              </p>

              <div className="relative flex items-center gap-x-2 group">
                <p className="text-light_grey font-extrabold text-xl md:text-2xl whitespace-nowrap">
                  {investorinvestmentsummary?.total_sol_invested?.toFixed(3)}{" "}
                  SOL
                </p>

                <HiEye className="w-3 h-3 text-green-400 cursor-help group-hover:text-gray-700 transition-colors" />

                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center">
                  <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap z-10 animate-fade-in">
                    {investorinvestmentsummary?.total_sol_invested} SOL
                  </span>
                  <div className="w-2 h-2 bg-gray-800 rotate-45 mt-1"></div>
                </div>
              </div>
            </div>
            <div className="space-y-1 text-light_grey md:w-1/2 ">
              <p className="text-sm md:text-lg whitespace-nowrap">
                Your Profit
              </p>

              <div className="relative flex items-center gap-x-2 group">
                <p className="text-light_grey font-extrabold text-xl md:text-2xl whitespace-nowrap">
                  {investorinvestmentsummary?.total_profit?.toFixed(3)} SOL
                </p>

                <HiEye className="w-3 h-3 text-green-400 cursor-help group-hover:text-gray-700 transition-colors" />

                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center">
                  <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap z-10 animate-fade-in">
                    {investorinvestmentsummary?.total_profit} SOL
                  </span>
                  <div className="w-2 h-2 bg-gray-800 rotate-45 mt-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*right box */}
        <div className="col-span-2  lg:col-span-3 bg-light_grey  text-blackish rounded-2xl  p-4 lg:p-6 space-y-4 md:space-y-0 grid lg:grid-cols-7">
          <div className="flex col-span-3  gap-y-4 md:gap-y-0 flex-col justify-between">
            <div className="space-y-1 ">
              <p className="text-lg ">Tokens Prices :</p>
              <p className=" font-extrabold text-xl md:text-2xl">
                1 SOL = {tokensalesummary?.pp_token_amount} PP{" "}
              </p>
            </div>
            <div className="space-y-1 ">
              <p className="text-lg">SOl Market Value:</p>
              <div className="flex gap-x-2 items-center">
                <p className=" font-extrabold text-xl md:text-2xl">
                  1 SOL = {solprice && solprice} USD{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center ">
            <div className="w-1 bg-grey rounded-md h-full"></div>
          </div>

          <hr className="bg-grey rounded-md md:hidden  h-[2px] col-span-3" />
          <div className="flex col-span-3 flex-col justify-between gap-y-4 md:gap-y-0">
            <div className="space-y-1">
              <p className="text-lg">Token Name :</p>
              <div className="flex gap-x-2 items-center">
                <p className=" font-extrabold text-xl md:text-2xl">
                  Pump Pumpkin (PP){" "}
                </p>
              </div>
            </div>
            <a
              className="flex items-center justify-center gap-x-2 md:py-3 py-2  bg-primary rounded-md font-semibold text-base text-white px-2"
              href="https://pitchdeck.pumppumpkin.io/"
              target="_blank"
            >
              <TbDownload className="md:w-5 md:h-5 h-4 w-4" />
              <p>Download Whitepaper</p>
            </a>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-2 py-6 h-[500px] lg:space-x-4 space-y-4 lg:space-y-0 mt-6 lg:mt-12 ">
        <UserDashboardChart
          value={ppholdingvalue?.total_holding_value_usd || 0}
        />
        <div className="lg:col-span-1 col-span-3 h-80 lg:h-auto  text-grey rounded-lg lg:rounded-xl bg-[#171717] p-2 lg:p-4">
          <UserValueCircle
            value={ppholdingvalue?.total_holding_value_usd || 0}
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-4 lg:space-x-4 mt-4 ">
        <div className="lg:col-span-3"></div>
        <div className="lg:col-span-1 col-span-2 bg-white  rounded-lg p-3 space-y-2">
          <p className="text-black text-xl font-bold">Token Calculation</p>
          <p>Enter amount to calculate token.</p>
          <div className="bg-[#F0F0F0] border border-[#C6C6C6] rounded-md grid grid-cols-7 space-x-2 items-center">
            <div className=" w-full  grid grid-cols-3 col-span-3 font-bold">
              <Input
                type="text"
                rounded="xl"
                h={"56px"}
                value={solInput}
                onChange={handleSolInputChange}
                border="none"
                focusBorderColor="transparent"
                outline="none"
                fontSize={18}
                className="col-span-2"
              />
              <p className="flex items-center text-lg">SOL</p>
            </div>

            <RiEqualLine className="col-span-1 text-dark_grey" />
            <div className="col-span-3 grid grid-cols-3 font-bold text-lg">
              <p className="col-span-2">{ppOutput && ppOutput}</p>
              <p className="col-span-1">PP</p>
            </div>
          </div>
          <p># Amount calculated based current tokens price</p>
          <button
            className="w-full my-2 flex items-center justify-center gap-x-2 md:py-3 py-2  bg-primary rounded-md font-semibold text-base text-white px-2"
            onClick={handleBuyNow}
          >
            <p>Buy Now</p>
          </button>
        </div>
      </div>

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
                {ppOutput
                  ? ppOutput * tokensalesummary?.usd_per_token.toFixed(6)
                  : "-"}
              </p>
            </div>
            <div className="flex font-semibold justify-between items-center border-b p-2 border-white border-dotted">
              <p>Total Amount</p>
              <p>
                {" "}
                {ppOutput
                  ? ppOutput * tokensalesummary?.usd_per_token.toFixed(6)
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
};

export default UserDashboardPage;
