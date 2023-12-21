'use client'
import { useEffect, useRef } from "react";
import RTEnode from "./RTEnode"


const TextEditorField = () => {
    const myRichTextEditor = useRef(null)

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
            <div contentEditable="true" suppressContentEditableWarning={true} ref={myRichTextEditor} className=" flex">
                <p><b>ferie</b></p>
                <p>hello</p>
                <b>World</b>
            </div>


        </div>
    )
}

export default TextEditorField