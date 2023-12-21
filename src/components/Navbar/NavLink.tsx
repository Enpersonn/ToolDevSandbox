import Link from "next/link";


const NavLink = (
    {
        href,
        name
    }: {
        href: string;
        name: string;
    }
) => {

    return (
        <div className=" flex px-3 justify-center">
            <Link href={href}>{name}</Link>

        </div>
    )
}

export default NavLink