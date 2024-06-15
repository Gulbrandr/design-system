import { ColumnDef } from '@tanstack/react-table';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode, useState } from 'react';
import Button from '@/components/Button';

type ManageColumnsProps<T> = {
  children?: ReactNode;
  ModalButton?: (props?: any) => JSX.Element;
  onOpen?: (props?: any) => void;
  onClose?: (props?: any) => void;
  title: string;
  subTitle?: string;
};

export default function Modal<T>({
  ModalButton,
  children,
  title,
  subTitle,
  onOpen,
  onClose,
}: ManageColumnsProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
    onClose && onClose();
  }

  function openModal() {
    setIsOpen(true);
    onOpen && onOpen();
  }

  return (
    <>
      <button type="button" onClick={openModal}>
        {ModalButton && <ModalButton />}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[60]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-x-0 overflow-y-auto top-10">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl py-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="flex flex-col gap-1 pb-4 text-lg font-medium leading-6 text-gray-900 border-b border-dark-100"
                  >
                    <p className="w-full px-6 text-header-4 text-secondary-500">
                      {title}
                    </p>
                    <p className="w-full px-6 text-body-2">{subTitle}</p>
                  </Dialog.Title>
                  <div className="w-full h-full px-6 pt-4 ">{children}</div>
                  <div className="flex justify-end w-full px-6 pt-4">
                    <Button variant="tertiary-primary" onClick={closeModal}>
                      Close
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
