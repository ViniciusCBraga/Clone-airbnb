import { create } from "zustand";

interface LoginModalStore{
    IsOpen:boolean;
    onOpen:() => void;
    onClose: () => void;
}

const useLoginModal = create <LoginModalStore>((set) => ({
    IsOpen:false,
    onOpen:() => set({IsOpen: true}),
    onClose:() => set({IsOpen: false})
}));

export default useLoginModal;