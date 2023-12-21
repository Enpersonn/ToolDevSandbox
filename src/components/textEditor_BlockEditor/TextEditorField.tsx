'use client'
import { useEffect } from "react";
import RTEnode from "./RTEnode"


const TextEditorField = () => {
    useEffect(() => {
        const keyDownHandler = (e: any) => console.log(`You pressed ${e.code}.`);
        document.addEventListener("keydown", keyDownHandler);

        // clean up
        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, []);
    return (
        <div className=" px-10 py-3">
            <RTEnode />
        </div>
    )
}

export default TextEditorField