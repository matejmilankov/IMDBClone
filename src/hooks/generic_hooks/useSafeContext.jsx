import { useContext } from "react";

export function useSafeContext(Context, providerName) {
    const context = useContext(Context);
    if (!context) throw new Error(`${providerName} must be used within its Provider`);
    return context;
}