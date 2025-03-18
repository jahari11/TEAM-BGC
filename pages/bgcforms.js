import Link from "next/link"

export default function BgcForms() {

    const forms = [
        {name:"Under 18 Waiver", href: "/under-18-waiver", imageSrc:"/images/under-18-waiver.jpg" },
        {name:"Regular Waiver", href: "/regular-waiver", imageSrc:"/images/waiver.jpg"},
        {name:"Vendor Form", href: "/vendor-form", imageSrc:"/images/vendor.jpg"},
        {name:"Team Form", href: "/team-form", imageSrc:"/images/team.jpg"},
    ];

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6 text-center uppercase">Team BGC Forms</h1>
            <p className="text-lg text-center">Fill out the form below to submit your information. Please ensure all details are accurate before submitting.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {forms.map((form, index)=> (
                    <div key={index}
                    className="bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all ">
                        <Link href={form.href}>
                        <div className="flex flex-col h-full">
                        <img src={form.imageSrc}
                        alt={form.name}
                        className="w-full h-full object-cover mb-4 rounded-lg" />
                        <h2 className="text-lg font-semibold text-center mb-4">{form.name}</h2>
                        <p className="text-center text-gray-600">Click to fill out the {form.name}</p>
                        </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}