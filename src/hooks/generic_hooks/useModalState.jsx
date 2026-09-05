import { useState, useCallback } from "react";

export function useModalState() {
    const [clickedItem, setClickedItem] = useState(null);

    const openModal = useCallback((item) => {
        setClickedItem(item);
    }, []);

    const closeModal = useCallback(() => {
        setClickedItem(null);
    }, []);

    return {clickedItem, openModal, closeModal}
}