import WaiverForm from "components/WaiverForm";

export default function Plus18WaiverPage() {
    return (
        <div 
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/waiver.jpg')" }} // Corrected path
        >
            
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            
            <div className="relative z-10">
                <WaiverForm />
            </div>
        </div>
    );
}