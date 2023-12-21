'use client'
import { useEffect, useRef, useState } from 'react';


const TextEditorHud = () => {
    const [content, setContent] = useState<string>('This is a sample paragraph.');
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const [selectedText, setSelectedText] = useState<string | undefined>()

    useEffect(() => {
        const selection = window.getSelection()?.toString();

        selection && setSelectedText(selection)
        console.log(selectedText)
    }, [window.getSelection()])
    const handleBoldClick = () => {
        const selection = window.getSelection();

        if (selectedText !== '') {
            const range = selection?.getRangeAt(0);
            const span = document.createElement('b');
            range?.surroundContents(span);

            // Update the content in state
            setContent(paragraphRef.current?.innerHTML || "");
        }
    };


    return (
        <div>
            <p ref={paragraphRef} contentEditable={true} dangerouslySetInnerHTML={{ __html: content }} />
            <button onClick={handleBoldClick}>Bold</button>
        </div>
    )
}


export default TextEditorHud