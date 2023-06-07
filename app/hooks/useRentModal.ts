import { create } from "zustand";

interface RentModalStore{
    IsOpen:boolean;
    onOpen:() => void;
    onClose: () => void;
}

const useRentModal = create <RentModalStore>((set) => ({
    IsOpen:false,
    onOpen:() => set({IsOpen: true}),
    onClose:() => set({IsOpen: false})
}));

export default useRentModal;