import NavLink from "./NavLink"


const NavBar = () => {

    return (
        <nav className=" flex h-10 items-center bg-slate-800 text-white px-5  gap-4">
            <div className=" border-r-2 px-9 border-slate-400">
                <NavLink href={"/"} name="Home" />
            </div>
            <div className="flex w-full justify-center  divide-x-2">
                <NavLink href={"/blockEditor"} name="blockEditor" />
                <NavLink href={"/wysiwyg"} name="WYSIWYG" />
            </div>
        </nav>
    )
}


export default NavBar