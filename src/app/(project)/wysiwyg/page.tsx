'use client'
import TextEditorField from "@/components/textEditor_WYSIWYG/TextEditorField";
import TextEditorHud from "@/components/textEditor_WYSIWYG/TextEditorHud";
import { clsx } from "@/utils/classes";
import { useRef, useEffect } from "react";


export default function wysiwyg() {
    const fileButton = " font-bold text-xl bg-slate-900 text-white  rounded-t-xl v w-fit px-5 border-b-2 border-slate-800 select-none hover:bg-slate-500 hover:text-white transition-all duration-200"
    const styelButton = "flex w-6 h-6 bg-slate-500 rounded-md items-center justify-center"

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
            const parent1 = getParent(range)
            const parent2 = range.commonAncestorContainer.parentElement

            const parent = (parent1 != undefined ? parent1 as HTMLDivElement : parent2 as HTMLSpanElement)

            console.log('Range:', range);
            console.log('parent:', parent);
            if (!parent) return

            findPartiallySelectedElements(parent)

            if (!(style == "bold" || style == "italic")) return

            //if element naboers a span with same style fuse them
            const nSpan = document.createElement("span")

            //mby try to find a better way to diferantiate between style changes
            if (style == "bold") MakeBold(range, nSpan, parent)
            if (style == "italic") MakeItalic(range, nSpan, parent)


            //fix so if span is partialy inside another element split that element so the span can go over the text
            //fix so text is not scrwed up by inserting new element into it

        }

    }

    const MakeBold = (range: Range, elem: HTMLSpanElement, parent: Element) => {
        console.log(parent.getAttributeNames)
        elem.style.fontWeight = "bold"
        range.surroundContents(elem)

        const fragmentChildren = elem.children
        for (let j = 0; j < fragmentChildren.length; j++) {
            const child = fragmentChildren[j]
            console.log(window.getComputedStyle(child).fontWeight)

            if (window.getComputedStyle(child).fontWeight == "700" && child.firstChild) {
                console.log("it was him your honor",)
                elem.insertBefore(child.firstChild, child)
                elem.removeChild(child)
            }
            const stringTxt = elem.innerText.toString()
        }

        console.log('Range:', range);

    }

    const MakeItalic = (range: Range, elem: HTMLSpanElement, parent: Node) => {
        elem.style.fontStyle = "italic"
        range.surroundContents(elem)


    }

    const findPartiallySelectedElements = (parent: Element) => {

        const walker = document.createTreeWalker(parent, NodeFilter.SHOW_ELEMENT, null);

        while (walker.nextNode()) {
            const node = walker.currentNode;
            const nodeRange = document.createRange();
            nodeRange.selectNodeContents(node);
            console.log(node)
        }


        return;
    };


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
            <div className=" bg-slate-900 text-white w-full text-left shadow-xl rounded-xl ">
                <div className=" w-full h-full">
                    {/* <TextEditorHud />
                    <TextEditorField /> */}
                    <div className=" px-5 py-2 flex gap-3 border-b-2 border-slate-700">
                        <div className=" flex gap-3">
                            <button onClick={() => addFontStyle("bold")} className={clsx(styelButton, "font-bold")}>B</button>
                            <button onClick={() => addFontStyle("italic")} className={clsx(styelButton, "italic")} >i</button>
                            <button onClick={() => addFontStyle("underline")} className={clsx(styelButton, "underline")} >U</button>
                            <button className={clsx(styelButton, "line-through")} >S</button>
                        </div>
                    </div>
                    <div className=" px-10 py-3">
                        <div
                            contentEditable={true}
                            data-content-editable-node={true}
                            suppressContentEditableWarning={true}
                            ref={TranslateFrame}
                            className=" min-h-7 whitespace-pre-wrap break-words"

                        >
                            {"Lorem ipsum dolor sit "}<span data-token-index={1}>amet</span>{" consectetur adipisicing elit. Tempore sunt omnis odio laudantium, praesentium quos reiciendis accusantium aliquid. Deleniti porro doloremque voluptatum dicta aliquid molestiae atque beatae aspernatur harum illo."}
                        </div>


                    </div>
                </div>

            </div>
        </>
    )
}