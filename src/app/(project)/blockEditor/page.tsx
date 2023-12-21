import TextEditorField from "@/components/textEditor_BlockEditor/TextEditorField";
import TextEditorHud from "@/components/textEditor_BlockEditor/TextEditorHud";


export default function blockEditor() {
    const fileButton = " font-bold text-xl bg-slate-900 text-white  rounded-t-xl v w-fit px-5 border-b-2 border-slate-800 select-none hover:bg-slate-500 hover:text-white transition-all duration-200"
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
                    <TextEditorHud />
                    <TextEditorField />
                </div>

            </div>
        </>
    )
}