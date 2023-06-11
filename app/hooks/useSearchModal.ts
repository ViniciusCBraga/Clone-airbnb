import { create } from "zustand";

interface SearchModalStore{
    IsOpen:boolean;
    onOpen:() => void;
    onClose: () => void;
}

const useSearchModal = create <SearchModalStore>((set) => ({
    IsOpen:false,
    onOpen:() => set({IsOpen: true}),
    onClose:() => set({IsOpen: false})
}));

export default useSearchModal;