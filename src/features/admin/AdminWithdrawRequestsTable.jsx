import {
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Spinner,
} from "@chakra-ui/react";
import { HiOutlineSearch } from "react-icons/hi";
import { useProcessWithdrawalRequest } from "./useProcessWithdrawalRequest";
import { useState } from "react";

const AdminWithdrawRequestsTable = ({ withdrawalrequests }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const { isPending, processwithdrawalrequest } = useProcessWithdrawalRequest();

  // Filter requests based on search query
  const filteredRequests = withdrawalrequests?.filter((request) => {
    const searchTerm = searchQuery.toLowerCase();
    return request.Withdraw_To?.toLowerCase().includes(searchTerm);
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleActionClick = (action, request) => {
    setSelectedAction(action);
    setSelectedRequest(request);
    onOpen();
  };

  const handleApproveRequest = async (withdrawalId) => {
    const data = {
      withdrawalId,
      action: "approve",
    };
    processwithdrawalrequest(data, {
      onSuccess: () => {},
    });
  };

  const handleRejectRequest = async (withdrawalId) => {
    const data = {
      withdrawalId,
      action: "reject",
    };
    processwithdrawalrequest(data, {
      onSuccess: () => {},
    });
  };

  const handleConfirm = () => {
    if (selectedAction === "Accept") {
      handleApproveRequest(selectedRequest.id);
    } else if (selectedAction === "Reject") {
      handleRejectRequest(selectedRequest.id);
    }
    onClose();
  };

  return (
    <div className="text-white mt-10">
      <div className="p-3 flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-bold">Referral User Details</h1>
        <InputGroup w={60}>
          <InputLeftElement
            width="2rem"
            ml={2}
            className="flex md:items-center items-start mt-2"
          >
            <HiOutlineSearch className="text-grey w-5 h-5" />
          </InputLeftElement>
          <Input
            type="text"
            rounded="xl"
            h="56px"
            w={60}
            placeholder="Search Wallet Address"
            border="none"
            focusBorderColor="transparent"
            outline="none"
            bg="#171717"
            value={searchQuery}
            onChange={handleSearch}
          />
        </InputGroup>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Sl</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Code</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Withdraw To</th>
              <th className="px-4 py-2 text-left">Balance</th>
              <th className="px-4 py-2 text-left">Req TO Withdraw</th>
              <th className="px-4 py-2 text-left">My Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests?.length > 0 ? (
              filteredRequests.map((row, index) => (
                <tr key={index} className="border-b border-gray-800 text-grey">
                  <td className="px-4 py-2">{row.Sl}</td>
                  <td className="px-4 py-2">{row.email}</td>
                  <td className="px-4 py-2">{row.refCode}</td>
                  <td className="px-4 py-2">{row.Time}</td>
                  <td className="px-4 py-2">{row.Date}</td>
                  <td className="px-4 py-2">{row.Withdraw_To}</td>
                  <td className="px-4 py-2">{row.Balance}</td>
                  <td className="px-4 py-2">{row.Req_To_Withdraw}</td>
                  <td className="px-4 py-2">
                    {row.Status === "pending" ? (
                      <div className="flex gap-x-2">
                        <button
                          className="rounded-md px-3 py-1 bg-[#0FFF43] text-white"
                          onClick={() => handleActionClick("Accept", row)}
                        >
                          Accept
                        </button>
                        <button
                          className="rounded-md px-3 py-1 bg-red-600 text-white"
                          onClick={() => handleActionClick("Reject", row)}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      row.Status
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-red-700 my-6">
                  {withdrawalrequests?.length === 0
                    ? "No Requests..."
                    : "No matching requests found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#262626" color="white">
          <ModalHeader className="text-primary">{`${selectedAction} Request`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to {selectedAction?.toLowerCase()} the request
            with ID: {selectedRequest?.id}?
          </ModalBody>

          <ModalFooter className="space-x-3">
            <button
              className="rounded-md px-3 py-1 bg-red-600 hover:bg-red-700 text-white"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="rounded-md px-3 py-1 bg-[#0FFF43] hover:bg-green-600 text-white"
              onClick={handleConfirm}
            >
              {isPending ? <Spinner /> : "Confirm"}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminWithdrawRequestsTable;
