import React, { useState, useRef } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onClose();
    };

    return (
        <div
            ref={modalRef}
            className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center ${
                isOpen ? 'block' : 'hidden'
            }`}
        >
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold">{title}</h2>
                    <button
                        className="p-2 hover:bg-red-500 focus:outline-none"
                        onClick={handleClose}
                    >
                        X
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
