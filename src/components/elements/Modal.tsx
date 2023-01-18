import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import cn from "classnames";

const SIZES: any = {
  sm: "w-1/4",
  md: "w-1/2",
  lg: "w-3/4",
};

const Modal: React.FC<{
  header: React.ReactNode | string;
  show: boolean;
  size?: keyof typeof SIZES;
  onCancel?: () => void;
}> = ({ header, show, size = "md", children, onCancel = () => {} }) => {
  return (
    <Transition appear show={show} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onCancel}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={cn(
                "inline-block p-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md",
                SIZES[size]
              )}
            >
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {header}
              </Dialog.Title>
              <div className="mt-4">{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
