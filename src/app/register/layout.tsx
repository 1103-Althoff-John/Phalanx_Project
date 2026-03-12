import Link from "next/link"
export default function register_layout({children}){
    return(
        <div
            className="min-h-screen bg-gradient-to-br from-gray-900 to-black-500 flex flex-col items-center"
        >
            <main
            className="flex-grow"
            >
                {children}
            </main>
            <footer
                className="flex bg-gray-900 p-15 w-full justify-between"
            >
                <Link
                    className="text-white-200 text-sm font-bold underline"
                    href="/"
                >
                    Home
                </Link>
                <Link
                    className="text-white-200 text-sm font-bold underline"
                    href="/"
                >
                    About Us
                </Link>
                <Link
                    className="text-white-200 text-sm font-bold underline"
                    href="/"
                >
                    Terms & Conditions
                </Link>
                <Link
                    className="text-white-200 text-sm font-bold underline"
                    href="/"
                >
                    Register LLM
                </Link>
            </footer>
        </div>    
    );
}