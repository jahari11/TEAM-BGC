"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Label } from "components/ui/label";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function WaiverForm() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        team_category: ''
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
                    email: formData.email,
                    phone: formData.phone,
                    team_category: formData.team_category,
                    form_type: "18+ Waiver"
                },
            ]);

            if (insertError) throw insertError;

            setMessage("Waiver submitted successfully");
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                team_category: ''
            });
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-center">Regular Waiver Form</h2>
            <p className="text-lg text-center mb-2">Participant form</p>
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
                    <Label className="font-bold " htmlFor="team_category">Event Category</Label>
                    <select
                        id="team_category"
                        name="team_category"
                        value={formData.team_category}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Event</option>
                        <option value="BGC High School">BGC High School</option>
                        <option value="BGC Mens">BGC Mens</option>
                        <option value="Big G's Upstate Pro-Am">Big G's Upstate Pro-Am</option>
                    </select>
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
