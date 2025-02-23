import { useState } from "react"
import { Alert, AlertDescription } from "./ui/alert"
import { Button } from "./ui/button"
import { X } from "lucide-react"

export default function Banner() {
    const [showBanner, setShowBanner] = useState(true)

    return (
        <div>
            {showBanner && (
                <Alert className="bg-black border-none shadow-none rounded-none">
                    <AlertDescription className="flex justify-center items-center text-center w-full">
                        <span className="text-white font-bold uppercase text-md">Be sure to register for the upcoming BGC event</span>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setShowBanner(false)}
                            className="ml-2 h-6 w-6"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </AlertDescription>
                </Alert>
            )}
        </div>
    )
}
