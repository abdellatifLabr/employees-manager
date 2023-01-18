import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

import Button from "./Button";

const IDialog: React.FC<{
  title: string;
  message: string;
  onAccept: () => void;
  onDecline: () => void;
}> = ({ title, message, onAccept, onDecline }) => {
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {}}
      >
        <div className="min-h-screen px-4 text-center bg-black bg-opacity-30">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-lg px-6 py-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded">
              <div className="flex flex-col items-center">
                <FaExclamationTriangle className="text-red-500 text-5xl mb-4" />
                <Dialog.Title className="text-center mb-3 text-2xl font-medium text-gray-600">
                  {title}
                </Dialog.Title>
                <div className="mb-8 text-sm">{message}</div>
              </div>
              <div className="flex space-x-2 justify-center">
                <Button variant="light" onClick={() => onDecline()}>
                  Decline
                </Button>
                <Button onClick={() => onAccept()}>Accept</Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default IDialog;
