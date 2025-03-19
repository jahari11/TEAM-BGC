"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Label } from "components/ui/label";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function VendorForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        business_name: '',
        email: '',
        phone: '',
        description: ''
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const { error: insertError } = await supabase.from("form_submissions").insert([
                {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    business_name: formData.business_name,
                    email: formData.email,
                    phone: formData.phone,
                    description: formData.description,
                    form_type: "Vendor Form"
                },
            ]);

            if (insertError) throw insertError;

            setMessage("Submission successful");
            setFormData({
                first_name: '',
                last_name: '',
                business_name: '',
                email: '',
                phone: '',
                description: ''
            });
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-center">Vendor Registration Form</h2>
            <p className="text-lg text-center mb-2">Sign up as a vendor for the event.</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <Label className="font-bold " htmlFor="first_name">First Name</Label>
                    <input
                        id="first_name"
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        placeholder="First Name"
                    />
                </div>

                <div className="mb-2">
                    <Label className="font-bold " htmlFor="last_name">Last Name</Label>
                    <input
                        id="last_name"
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        placeholder="Last Name"
                    />
                </div>

                <div className="mb-2">
                    <Label className="font-bold " htmlFor="business_name">Business Name</Label>
                    <input
                        id="business_name"
                        type="text"
                        name="business_name"
                        value={formData.business_name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        placeholder="Business Name"
                    />
                </div>

                <div className="mb-2">
                    <Label className="font-bold " htmlFor="email">Email</Label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        placeholder="Email"
                    />
                </div>

                <div className="mb-2">
                    <Label className="font-bold " htmlFor="phone">Phone Number</Label>
                    <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        placeholder="Phone Number"
                    />
                </div>

                <div className="mb-2">
                    <Label className="font-bold " htmlFor="description">Business Description</Label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        placeholder="Business Description..."
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded"
                >
                    Submit
                </button>
            </form>
            {message && <p className="mt-3 text-center text-sm">{message}</p>}
        </div>
    );
}
