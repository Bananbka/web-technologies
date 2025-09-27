import {Button} from "./Button.tsx";

type ModalProps = {
    isOpen: boolean;
    message: string;
    onClose: () => void;
};

export function Modal({isOpen, message, onClose}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded-md shadow-lg w-80 text-center">
                <p className="text-gray-800 mb-4">{message}</p>
                <Button onClick={onClose}>
                    OK
                </Button>
            </div>
        </div>
    );
}
