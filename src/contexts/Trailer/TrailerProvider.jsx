import { useMemo, useState, useCallback } from "react";
import { TrailerContext } from "./TrailerContext";

export function TrailerProvider({ children }) {
    const [clickedTrailerId, setClickedTrailerId] = useState(null);

    const openTrailerModal = useCallback((movieId) => {
        console.log("OVde")
        setClickedTrailerId(movieId);
    }, []);
    const closeTrailerModal = useCallback(() => {
        setClickedTrailerId(null);
    }, []);

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