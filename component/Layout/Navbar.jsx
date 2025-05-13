import Image from "next/image"

export default function Navbar() {
    return (
        <div className="flex justify-between">
            <div className="flex items-center">
                <Image src="/vercel.svg" alt="Vercel Logo" width={100} height={24} priority />
                <h1>Athela<span>09</span>.</h1>
            </div>
            <div>
                <ul className="flex items-center gap-4">
                    <li>Home</li>
                    <li>About</li>
                    <li>Skill</li>
                </ul>
            </div>
        </div>
    )
}