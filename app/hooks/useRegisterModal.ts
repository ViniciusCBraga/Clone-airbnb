import { create } from "zustand";

interface RegisterModalStore{
    IsOpen:boolean;
    onOpen:() => void;
    onClose: () => void;
}

const useRegisterModal = create <RegisterModalStore>((set) => ({
    IsOpen:false,
    onOpen:() => set({IsOpen: true}),
    onClose:() => set({IsOpen: false})
}));

export default useRegisterModal;