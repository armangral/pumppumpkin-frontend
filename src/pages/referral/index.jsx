import {
  Box,
  Button,
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
import { UserRound } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiEye } from "react-icons/hi";
import { RxCopy } from "react-icons/rx";
import { SiSolana } from "react-icons/si";
import UserReferralsTable from "src/features/referral/UserReferralsTable";
import { useVipBalance } from "src/features/referral/useVipBalance";
import { useVipsEarningsSummary } from "src/features/referral/useVipsEarningSummary";
import { useVipsReferralCode } from "src/features/referral/useVipsReferralCode";
import { useVipsReferralTransactions } from "src/features/referral/useVipsReferralTransactions";
import { useWithdrawVipBalance } from "src/features/referral/useWithdrawVipBalance";

const ReferralDashboardPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [walletAddress, setWalletAddress] = useState("");
  const [errors, setErrors] = useState({});

  const [copied, setCopied] = useState(false);
  const { isLoading: isLoadingReferralCode, referralcode } =
    useVipsReferralCode();

  const { isLoading: isLoadingEarningSummary, earningssummary } =
    useVipsEarningsSummary();

  const { isLoading: isLoadingVipBalance, vipbalance } = useVipBalance();

  const { isPending, withdrawvipbalance } = useWithdrawVipBalance();

  const handleCopy = async () => {
    if (!referralcode) return;

    try {
      await navigator.clipboard.writeText(referralcode);
      setCopied(true);

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      toast.error("Failed to copy text: ", err);
    }
  };

  const handleWithdrawBalance = () => {
    const validationErrors = {};

    if (!walletAddress)
      validationErrors.wallet_address = "Wallet Address is required";

    if (!vipbalance) {
      toast.error("Balance is not enough!");
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const data = {
      amount: vipbalance && vipbalance,
      wallet_address: walletAddress,
    };

    setErrors({});

    withdrawvipbalance(data, {
      onSuccess: () => {
        setWalletAddress("");
        setErrors({});
        onClose();
      },
    });
  };

  const { isLoading, transactions } = useVipsReferralTransactions();

  return (
    <div>
      <div className="grid lg:grid-cols-5 lg:space-x-6 space-y-8 lg:space-y-0 py-2">
        {/*left box */}
        <div className="col-span-2 bg-light_grey rounded-2xl h-60 md:h-auto  p-6 flex flex-col justify-between">
          <h1 className="text-primary font-bold text-2xl">
            Referral Link <br /> & Code
          </h1>
          <div className="space-y-3">
            <p className="text-black text-sm font-bold">Invitation Code</p>
            <div className="p-4 rounded-xl bg-primary text-sm font-bold flex justify-between items-center text-white">
              <p>{referralcode || "-"}</p>
              <div className="relative">
                <RxCopy
                  className={`w-5 h-5 rotate-90 hover:drop-shadow-md cursor-pointer hover:scale-110 transform transition duration-300 ease-in-out ${
                    copied ? "opacity-50" : ""
                  }`}
                  onClick={handleCopy}
                />
                {copied && (
                  <span className="absolute -top-8 -left-6 text-xs bg-white text-primary px-2 py-1 rounded">
                    Copied!
                  </span>
                )}
              </div>{" "}
            </div>
          </div>
        </div>

        {/*right box */}
        <div className="col-span-2 lg:col-span-3 bg-primary rounded-2xl  p-3 lg:p-6 flex flex-col gap-y-6 justify-between">
          <div className="flex justify-between items-center">
            {/* Balance Display */}
            <div className="flex items-center bg-white rounded-md p-2 w-72 whitespace-nowrap relative group">
              {/* Balance Label */}
              <div className="flex-shrink-0">
                <h1 className="text-black font-bold text-base md:text-2xl">
                  Balance :
                </h1>
              </div>

              {/* Balance Value */}
              <div className="flex items-center gap-x-1 flex-shrink-0 ml-6">
                <SiSolana
                  className="h-6 w-6"
                  style={{
                    fill: "url(#solanaGradient)",
                  }}
                />
                <svg width="0" height="0">
                  <defs>
                    <linearGradient
                      id="solanaGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#1a75ff" />
                      <stop offset="100%" stopColor="#104699" />
                    </linearGradient>
                  </defs>
                </svg>
                <p className="gradient-text font-bold text-sm md:text-2xl">
                  {vipbalance && vipbalance.toFixed(3)}
                </p>
              </div>

              {/* Info Indicator */}
              <HiEye className="w-3 h-3 text-green-400 cursor-help group-hover:text-gray-700 transition-colors ml-2" />

              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-10">
                <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap animate-fade-in">
                  {vipbalance && vipbalance} SOL
                </span>
                <div className="w-2 h-2 bg-gray-800 rotate-45 mt-1"></div>
              </div>
            </div>

            {/* Withdraw Button */}
            <button
              className="md:p-3 p-2 h-8 md:h-12 rounded-md bg-white text-primary text-[8px] md:text-sm font-bold hover:drop-shadow-md hover:bg-dark_blue hover:text-white"
              onClick={onOpen}
            >
              Withdraw Balance
            </button>
          </div>

          <div className="flex justify-between items-center">
            <div className="space-y-1 text-light_grey">
              <p className="text-sm md:text-lg ">Total Ref User By Invest</p>
              <div className="flex gap-x-2 items-center relative group">
                {/* Icon Container */}
                <div className="bg-white rounded-full w-7 h-7 p-2 flex items-center justify-center">
                  <SiSolana
                    className="h-6 w-6"
                    style={{
                      fill: "url(#solanaGradient)",
                    }}
                  />
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient
                        id="solanaGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#1a75ff" />
                        <stop offset="100%" stopColor="#104699" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Value Display */}
                <p className="text-light_grey font-extrabold text-xl md:text-2xl">
                  {earningssummary?.total_investment?.toFixed(3)} SOL
                </p>

                {/* Info Indicator */}
                <HiEye className="w-3 h-3 text-green-400 cursor-help group-hover:text-gray-700 transition-colors ml-2" />

                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-10">
                  <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap animate-fade-in">
                    {earningssummary?.total_investment} SOL
                  </span>
                  <div className="w-2 h-2 bg-gray-800 rotate-45 mt-1"></div>
                </div>
              </div>
            </div>

            <div className="space-y-1 text-light_grey">
              <p className="text-sm md:text-lg">Total code users</p>
              <div className="flex gap-x-2 items-center">
                <div className="bg-white rounded-full w-7 h-7 p-2 flex items-center justify-center">
                  <UserRound className="text-dark_grey w-6 h-6" />
                </div>
                <p className="text-light_grey font-extrabold text-xl md:text-2xl">
                  {earningssummary?.unique_investors} User
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-1 text-light_grey">
            <p className="text-sm md:text-lg">Total Earnings From Ref</p>
            <div className="flex gap-x-2 items-center">
              <p className="text-light_grey font-extrabold text-xl md:text-2xl">
                {earningssummary?.total_investment +
                  " - 20% = " +
                  earningssummary?.total_earnings +
                  " SOL"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Spinner className="text-white" />
      ) : (
        <UserReferralsTable transactions={transactions?.transactions} />
      )}

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#262626" color="white" borderRadius="3xl" p={4}>
          <ModalHeader fontSize="3xl" fontWeight="extrabold">
            Withdrawal
          </ModalHeader>
          <ModalCloseButton color="gray.400" />

          <ModalBody>
            {/* Balance Display */}
            <Text fontSize="lg" fontWeight="extrabold" mb={4}>
              BALANCE: {vipbalance && vipbalance} SOL
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
                value={vipbalance}
                placeholder="Enter Amount"
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
              Add Wallet Address
            </Text>
            <Input
              placeholder="Enter Wallet Address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              bg="#212629"
              h={"56px"}
              color="white"
              mb={4}
              borderColor="#3C3C3C"
            />
            {errors.wallet_address && (
              <Text color="red.500" fontSize="sm" className="mt-2">
                {errors.wallet_address}
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <button
              className="gradient-color w-full h-14 rounded-md font-extrabold text-base hover:bg-primary hover:text-black"
              onClick={handleWithdrawBalance}
            >
              {isPending ? <Spinner /> : "Withdraw"}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ReferralDashboardPage;
