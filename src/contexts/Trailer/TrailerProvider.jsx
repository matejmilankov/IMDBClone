import { useMemo } from "react";
import { TrailerContext } from "./TrailerContext";
import { useModalState } from "../../hooks/generic_hooks/useModalState";

export function TrailerProvider({ children }) {
    const {clickedItem: clickedTrailerId, openModal: openTrailerModal, closeModal: closeTrailerModal} = useModalState();

    const value = useMemo(() => ({
        clickedTrailerId,
        openTrailerModal,
        closeTrailerModal
    }
    ), [clickedTrailerId, openTrailerModal, closeTrailerModal]);

    return (
        <TrailerContext.Provider value={value}>
            {children}
        </TrailerContext.Provider>
    )
}   