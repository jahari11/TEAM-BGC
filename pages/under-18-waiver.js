import Under18Waiver from "components/Under18Waiver";

export default function Plus18WaiverPage() {
    return (
        <div 
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/under-18-waiver.jpg')" }} // FIXED: Proper string formatting
        >
            {/* Overlay for tint */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Content */}
            <div className="relative z-10">
                <Under18Waiver />
            </div>
        </div>
    );
}
