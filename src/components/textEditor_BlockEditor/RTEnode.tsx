'use client'
import { useEffect, useRef } from "react"


const RTEnode = () => {
    const inputRefrance = useRef<HTMLInputElement>(null);

    useEffect(() => {
        console.log("node selected")
    }, [inputRefrance.current?.select()])

    return (
        <div className=" flex gap-3">
            <div className=" flex gap-2 items-center">
                <button className="flex items-center justify-center h-6 w-6 rounded-full border-2 border-slate-400 text-centerr">+</button>
                <button className="flex items-center justify-center h-6 w-6 rounded-full border-2 border-slate-400 ">x</button>
            </div>
            <div className=" w-full relative">
                <div onSelect={() => console.log("hello")} ref={inputRefrance} contentEditable="true" className="w-full bg-inherit" >Write shit...</div>
            </div>
        </div>
    )
}

export default RTEnode