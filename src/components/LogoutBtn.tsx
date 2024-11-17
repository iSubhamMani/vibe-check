"use client";

import { signOut } from "next-auth/react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./ui/animated-modal";

const LogoutBtn = () => {
  return (
    <div>
      <Modal>
        <ModalTrigger className="group/modal-btn">
          <div className="flex gap-2 items-center rounded-md shadow-md px-3 py-2 xl:px-4 xl:py-2 border border-purple-200 hover:bg-indigo-100 hover:scale-95 transition-all duration-200 ease-in-out">
            <span className="font-medium text-xs xl:text-sm">Logout</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 lg:size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <p>Are you sure you want to logout?</p>
          </ModalContent>
          <ModalFooter className="flex gap-4">
            <div className="flex gap-2 items-center rounded-md shadow-md px-3 py-2 xl:px-4 xl:py-2 border border-purple-200 hover:bg-indigo-100 transition-all duration-200 ease-in-out">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
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

export default LogoutBtn;
