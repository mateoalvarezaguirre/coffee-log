import { useState } from "react";
import { Dialog } from 'primereact/dialog';

interface ModalProps {
    children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div onClick={() => setIsOpen(true)}>
                {children}
            </div>
            <Dialog header="Header" visible={isOpen} style={{ width: '50vw' }} onHide={() => { if (!isOpen) return; setIsOpen(false); }}>
                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </Dialog>
        </div>
    );
};
export default Modal;