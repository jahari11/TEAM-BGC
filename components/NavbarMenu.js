import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function NavbarMenu() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"; // Disable scrolling when menu is open
        } else {
            document.body.style.overflow = "auto"; // Restore scrolling
        }
    }, [isOpen]);

    return (
        <nav className="top-0 left-0 w-full bg-black text-white px-6 py-4">
            <div className="mx-auto flex justify-between items-center">
                <a href="/">
                <Image src='/images/Logo.png' width={100} height={100} alt="Logo" />
                </a>

                {/* Hamburger Button - Always Visible */}
                <button 
                    className="text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Fullscreen Menu - Slides in from the Right */}
                <ul className={`fixed top-0 right-0 w-full h-screen bg-black transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"} z-50`}>
                    {/* Close Button (Visible on all screens) */}
                    <li className="flex justify-end p-6">
                        <button onClick={() => setIsOpen(false)}>
                            <X size={28} className="text-white" />
                        </button>
                    </li>
                    <li className="p-6">
                        <Link href="/" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Home</Link>
                    </li>
                    <li className="p-6">
                        <Link href="/about" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>About</Link>
                    </li>
                    <li className="p-6">
                        <Link href="/events" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Events</Link>
                    </li>
                    <li className="p-6">
                        <Link href="/" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Photos</Link>
                    </li>
                    <li className="p-6">
                        <Link href="/forms" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Forms</Link>
                    </li>
                    <li className="p-6">
                        <Link href="/contact" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Contact</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
