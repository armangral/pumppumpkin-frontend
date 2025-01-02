import { useState } from "react";
import {
  Button,
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
import { useApproveReferral } from "./useApproveReferral";
import { useRejectReferral } from "./useRejectReferral";

const AdminReferralsTable = ({ referrals }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedReferral, setSelectedReferral] = useState(null);

  const { isPending: isApproving, approvereferral } = useApproveReferral();
  const { isPending: isRejecting, rejectreferral } = useRejectReferral();

  const handleActionClick = (action, referral) => {
    setSelectedAction(action);
    setSelectedReferral(referral);
    onOpen();
  };

  // Handle accept action
  const handleApproveReferral = async (referralId) => {
    approvereferral(referralId, {
      onSuccess: () => {},
    });
  };

  // Handle reject action
  const handleRejectReferral = async (referralId) => {
    rejectreferral(referralId, {
      onSuccess: () => {},
    });
  };

  // Confirm modal action
  const handleConfirm = () => {
    if (selectedAction === "Accept") {
      handleApproveReferral(selectedReferral.id);
    } else if (selectedAction === "Reject") {
      handleRejectReferral(selectedReferral.id);
    }
    onClose(); // Close modal after action
  };

  return (
    <div className="text-white mt-10">
      <div className="p-3 flex justify-between">
        <h1 className="text-lg md:text-2xl font-bold mb-4">Vips Details</h1>
      </div>

      {/* Display the filtered data in a table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Balance</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {referrals?.map((row, index) => (
              <tr key={index} className="border-b border-gray-800 text-grey">
                <td className="px-4 py-2">{row.id}</td>
                <td className="px-4 py-2">{row.email}</td>
                <td className="px-4 py-2">{row.balance}</td>
                <td className="px-4 py-2">
                  {row.approved ? (
                    "Approved"
                  ) : row.approved === false ? (
                    "Rjected"
                  ) : (
                    <div className="flex gap-x-2 ">
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
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for action confirmation */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#262626" color="white">
          <ModalHeader className="text-primary">{`${selectedAction} Referral`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to {selectedAction?.toLowerCase()} the
            referral with ID: {selectedReferral?.id}?
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
              {isApproving || isRejecting ? <Spinner /> : "Confirm"}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminReferralsTable;
