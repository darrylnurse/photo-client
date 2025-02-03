import {useEffect, useState} from "react";
import {TDimensions} from "../types/Window.ts";

function getWindowDimensions() : TDimensions {
    const {
        innerWidth: width,
        innerHeight: height
    } = window;
    return {width, height};
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState<TDimensions>(getWindowDimensions());

    useEffect(() => {
        const handleResize = () => setWindowDimensions(getWindowDimensions());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}