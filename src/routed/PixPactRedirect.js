import { useEffect } from "react";

const PixPactRedirect = () => {
    useEffect(() => {
        window.location.href = "https://pixpact.js.org"; // Redirects to external site
    }, []);

    return null; // No UI needed
};

export default PixPactRedirect;
