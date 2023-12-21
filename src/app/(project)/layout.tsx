

export default function project_layout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <main className=" flex min-h-[80vh] justify-center py-10 px-20">
            <div className=" flex flex-col w-full items-center  text-center">
                {children}


            </div>
        </main>
    )
}