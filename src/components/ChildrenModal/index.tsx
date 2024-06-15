import React from 'react';

import { Dialog } from '@headlessui/react';

interface ChildrenModalProps {
  isOpen: boolean;
  height?: number | null;
  width?: number | null;
  children?: React.ReactElement;
  setIsOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const ChildrenModal: React.FC<ChildrenModalProps> = ({
  children,
  isOpen,
  setIsOpen,
  height,
  width,
}: ChildrenModalProps) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 transition-opacity"
      >
        <div className="flex items-center justify-center min-h-screen">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
            onClick={(e) => e.stopPropagation()}
            className={
              height && width
                ? 'card overflow-scroll'
                : 'flex card w-10/12 h-[800px]'
            }
            style={
              height && width
                ? { width: `${width}px`, height: `${height}px` }
                : {}
            }
          >
            {children}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ChildrenModal;
