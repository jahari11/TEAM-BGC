import Image from "next/image"

export default function Preloader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="animate-pulse">
            <Image src = "/images/Logo.png" width={100} height={100} className="w-full h-auto"  />
            </div>
        </div>
    )
}