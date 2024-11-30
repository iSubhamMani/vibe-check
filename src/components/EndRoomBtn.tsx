"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { endRoom } from "@/lib/actions/endRoom";
import { toast } from "react-toastify";

const EndRoomBtn = ({ roomCode }: { roomCode: string }) => {
  const handleEndRoom = async () => {
    try {
      await endRoom(roomCode);
    } catch {
      toast.error("Error deleting room. Please try again");
    }
  };

  return (
    <div>
      <Modal>
        <ModalTrigger className="group/modal-btn">
          <div className="flex gap-2 items-center rounded-md shadow-md px-3 py-2 xl:px-4 xl:py-2 border border-purple-200 hover:bg-indigo-100 hover:scale-95 transition-all duration-200 ease-in-out">
            <span className="font-medium text-xs xl:text-sm">End room</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <p>Are you sure you want to end the current room?</p>
          </ModalContent>
          <ModalFooter className="flex gap-4">
            <div className="flex gap-2 items-center rounded-md shadow-md px-3 py-2 xl:px-4 xl:py-2 border border-purple-200 hover:bg-indigo-100 transition-all duration-200 ease-in-out">
              <button
                onClick={handleEndRoom}
                className="font-medium text-xs xl:text-sm"
              >
                Yes
              </button>
            </div>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EndRoomBtn;
