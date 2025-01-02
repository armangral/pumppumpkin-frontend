import {
  Box,
  FormControl,
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
import { useState } from "react";
import { SiSolana } from "react-icons/si";
import pumpkin from "src/assets/img/admin/pumpkin.svg";
import AdminTokenSaleSettings from "src/components/admin/dashboard/AdminTokenSaleSettings";
import pumpkinwhitesvg from "src/assets/img/admin/pumpkin-white.svg";
import { useCreateStage } from "src/features/admin/stages/useCreateStage";
import { useStages } from "src/features/admin/stages/useStages";
import AdminAnalyticsComponent from "src/components/admin/dashboard/AdminAnalyticsComponent";

const AdminTokenSaleAccusePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [solamount, setSolAmount] = useState();
  const [ppamount, setPpAmount] = useState();
  const [limit, setLimit] = useState();
  const [errors, setErrors] = useState({});

  const [stageNumber, setStageNumber] = useState();

  const { isPending, createtokenstagae } = useCreateStage();

  const { isLoading, stages } = useStages();

  const handleOpen = (stageNumber) => {
    setStageNumber(stageNumber);
    onOpen();
  };

  const handleCreateStage = () => {
    const validationErrors = {};

    if (!solamount) {
      validationErrors.solamount = "Sol Amount is required";
    }

    if (!ppamount) {
      validationErrors.ppamount = "PP Amount is required";
    }

    if (!limit) {
      validationErrors.limit = "Limit is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const data = {
      stage_number: stageNumber,
      sol_amount: solamount,
      pp_token_amount: ppamount,
      total_limit: limit,
    };

    createtokenstagae(data, {
      onSuccess: () => {
        setSolAmount(0);
        setPpAmount(0);
        setLimit(0);
        setErrors({});
        onClose();
      },
    });
  };

  const handleClose = () => {
    setErrors({});
    setSolAmount(0);
    setPpAmount(0);
    setLimit(0);
    onClose();
  };

  return (
    <div>
      <AdminAnalyticsComponent />

      {isLoading ? (
        <Spinner className="text-white" />
      ) : (
        <AdminTokenSaleSettings onOpen={handleOpen} stages={stages} />
      )}

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#121212" color="white" borderRadius="3xl" p={4}>
          <ModalHeader fontSize="2xl" fontWeight="extrabold">
            Take Action{" "}
          </ModalHeader>
          <ModalCloseButton color="gray.400" />

          <ModalBody>
            {/* Balance Display */}
            <Text fontSize="lg" fontWeight="extrabold" mb={4}>
              Tack Action For 1st Stage{" "}
            </Text>

            {/* Amount Input */}
            <Text mb={2} className="text-base font-semibold">
              Set Sol Amount
            </Text>
            <Box
              display="flex"
              alignItems="center"
              bg="#212629"
              borderRadius="md"
              mb={2}
            >
              <FormControl id="solamount" isInvalid={errors.solamount}>
                <Input
                  type="number"
                  value={solamount}
                  onChange={(e) => setSolAmount(e.target.value)}
                  placeholder="Enter Amount"
                  borderColor="#3C3C3C"
                  color="white"
                  h={"56px"}
                  // _focus={{ boxShadow: "none" }}
                />
              </FormControl>
              <div className="bg-[#212629] border rounded-md flex justify-center gap-x-2 items-center border-[#3C3C3C] px-4 h-14">
                <div className="rounded-full gradient-color p-2 ">
                  <SiSolana size={20} className="text-white" />
                </div>
                <p className="font-extrabold text-lg">SOL</p>
              </div>
            </Box>

            {errors.solamount && (
              <Text color="red.500" fontSize="sm">
                {errors.solamount}
              </Text>
            )}

            {/* Wallet Address Input */}
            <Text mb={2} mt={4} className="text-base font-semibold uppercase">
              Set GET AMOUNT (PP TOKENS){" "}
            </Text>
            <Box
              display="flex"
              alignItems="center"
              bg="#212629"
              borderRadius="md"
              mb={2}
            >
              <FormControl id="ppamount" isInvalid={errors.ppamount}>
                <Input
                  type="number"
                  value={ppamount}
                  onChange={(e) => setPpAmount(e.target.value)}
                  placeholder="Enter Amount"
                  borderColor="#3C3C3C"
                  color="white"
                  h={"56px"}
                  // _focus={{ boxShadow: "none" }}
                />
              </FormControl>
              <div className="bg-[#212629] border rounded-md flex justify-center gap-x-2 items-center border-[#3C3C3C] px-4 h-14">
                <div className="rounded-full gradient-color p-2 w-10 h-10">
                  <img
                    src={pumpkinwhitesvg}
                    alt="pumpkin-white"
                    className="w-7 h-7"
                  />{" "}
                </div>
                <p className="font-extrabold text-lg">PP</p>
              </div>
            </Box>
            {errors.ppamount && (
              <Text color="red.500" fontSize="sm">
                {errors.ppamount}
              </Text>
            )}

            <Text mb={2} mt={4} className="text-base font-semibold uppercase">
              Total Set Limit To PP Token In This Stage
            </Text>
            <FormControl id="limit" isInvalid={errors.limit}>
              <Input
                placeholder="Enter Limit"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                bg="#212629"
                h={"56px"}
                color="white"
                mb={4}
                borderColor="#3C3C3C"
              />
            </FormControl>
            {errors.limit && (
              <Text color="red.500" fontSize="sm">
                {errors.limit}
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <button
              className="gradient-color w-full h-14 rounded-md font-extrabold text-base hover:bg-primary hover:text-black"
              onClick={handleCreateStage}
            >
              {isPending ? <Spinner /> : "Confirm"}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminTokenSaleAccusePage;
