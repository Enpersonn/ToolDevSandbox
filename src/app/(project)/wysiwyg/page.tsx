'use client'
import TextEditorField from "@/components/textEditor_WYSIWYG/TextEditorField";
import TextEditorHud from "@/components/textEditor_WYSIWYG/TextEditorHud";
import { useRef, useEffect, Children } from "react";


export default function wysiwyg() {
    const fileButton = " font-bold text-xl bg-slate-900 text-white  rounded-t-xl v w-fit px-5 border-b-2 border-slate-800 select-none hover:bg-slate-500 hover:text-white transition-all duration-200"

    const TranslateFrame = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const keyDownHandler = (e: any) => console.log(`You pressed ${e.code}.`);
        document.addEventListener("keydown", keyDownHandler);

        // clean up
        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, []);

    const addFontStyle = (style: string) => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) return;

        for (let i = 0; i < selection.rangeCount; i++) {
            const range = selection.getRangeAt(i);
            const parent = getParent(range)
            if (!parent) return

            //if element naboers a span with same style fuse them
            const nSpan = document.createElement("span")

            //mby try to find a better way to diferantiate between style changes
            if (style == "bold") nSpan.style.fontWeight = "bold"
            if (style == "italic") nSpan.style.fontStyle = "italic"

            //fix so if span is partialy inside another element split that element so the span can go over the text
            //fix so text is not scrwed up by inserting new element into it
            range.surroundContents(nSpan)
            if (nSpan.hasChildNodes()) {
                const nSpanChildren = nSpan.children
                for (let j = 0; j < nSpanChildren.length; j++) {
                    const childElement = nSpanChildren[j]
                    console.log(window.getComputedStyle(childElement).fontWeight)
                    if (style == "bold" && window.getComputedStyle(childElement).fontWeight == "700") {
                        console.log("godt this far")
                        //fix so innerHtml of child is not deleted but taken out then remove the element
                        nSpan.removeChild(childElement)

                    }
                }
            }

            console.log('Range:', range);
            console.log('parent:', parent);
        }

    }

    const getParent = (range: Range) => {


        const commonAncestor = range.commonAncestorContainer
        if (commonAncestor == TranslateFrame.current) {
            return (commonAncestor)
        }
        if (commonAncestor.parentElement == TranslateFrame.current) {
            return (commonAncestor.parentElement)
        }

        return

    };



    return (
        <>
            <div className="w-full flex px-3 justify-between">
                <div className=" flex gap-5">
                    <button className={fileButton}>Load Demo</button>
                    <button className={fileButton}>New</button>
                </div>
                <button className={fileButton}>TextEditor</button>

            </div>
            <div className=" bg-slate-900 text-white w-full text-left shadow-xl rounded-xl p-1">
                <div className=" w-full h-full">
                    {/* <TextEditorHud />
                    <TextEditorField /> */}
                    <div className=" flex gap-3">
                        <button onClick={() => addFontStyle("bold")} className="flex w-6 h-6 bg-slate-500 rounded-md items-center justify-center font-bold">B</button>
                        <button onClick={() => addFontStyle("italic")} className="flex w-6 h-6 bg-slate-500 rounded-md items-center justify-center italic">i</button>
                    </div>
                    <div className=" px-10 py-3">
                        <div contentEditable={true} suppressContentEditableWarning={true} ref={TranslateFrame} className="flex min-h-7 whitespace-pre-wrap break-words">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore sunt omnis odio laudantium, praesentium quos reiciendis accusantium aliquid. Deleniti porro doloremque voluptatum dicta aliquid molestiae atque beatae aspernatur harum illo.
                        </div>


                    </div>
                </div>

            </div>
        </>
    )
}