import {createContext, useContext, useState, type ReactNode} from "react";
import {Modal} from "../Modal";

type ModalContextType = {
    openModal: (msg: string) => void;
    closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({children}: {children: ReactNode}) {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");

    const openModal = (msg: string) => {
        setMessage(msg);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setMessage("");
    };

    return (
        <ModalContext.Provider value={{openModal, closeModal}}>
            {children}
            <Modal isOpen={isOpen} message={message} onClose={closeModal}/>
        </ModalContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useModal() {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useModal must be used inside ModalProvider");
    return context;
}
