"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Label } from "components/ui/label";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Under18Waiver() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        guardian_first_name: '',
        guardian_last_name: '',
        email: '',
        phone: '',
        team_category: '',
        file: null
    });

    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setFormData({ ...formData, file: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleRemoveFile = () => {
        setFormData({ ...formData, file: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        setMessage("");

        try {
            if (!formData.file) throw new Error("Please upload a birth certificate");

            const fileExt = formData.file.name.split(".").pop();
            const fileName = `file_${Date.now()}.${fileExt}`;

            const { data, error } = await supabase.storage
                .from("documents")
                .upload(fileName, formData.file);

            if (error) throw error;

            const { data: publicUrlData } = supabase.storage.from("documents").getPublicUrl(fileName);
            const fileUrl = publicUrlData.publicUrl;

            const { error: insertError } = await supabase.from("form_submissions").insert([
                {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    date_of_birth: formData.date_of_birth,
                    guardian_first_name: formData.guardian_first_name,
                    guardian_lname: formData.guardian_last_name,
                    email: formData.email,
                    phone: formData.phone,
                    team_category: formData.team_category,
                    documents: fileUrl,
                    form_type: "Under 18 Form"
                },
            ]);

            if (insertError) throw insertError;

            setMessage("Waiver submitted successfully");
            setFormData({
                first_name: '',
                last_name: '',
                date_of_birth: '',
                guardian_first_name: '',
                guardian_last_name: '',
                email: '',
                phone: '',
                team_category: '',
                file: null,
            });
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="text-center">
            <h2 className="text-xl font-bold text-center">Under 18 Waiver Form</h2>
            <span className="text-lg font-bold mb-2">Parent/guardian consent form.</span>
            </div>
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
                    <Label className="font-bold " htmlFor="date_of_birth">Date of Birth</Label>
                    <input
                        id="date_of_birth"
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"

                    />
                </div>

                <div className="mb-2">
                    <Label className="font-bold " htmlFor="guardian_first_name">Guardian First Name</Label>
                    <input
                        id="guardian_first_name"
                        type="text"
                        name="guardian_first_name"
                        value={formData.guardian_first_name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        placeholder="Guardian First Name"
                    />
                </div>

                <div className="mb-2">
                    <Label className="font-bold " htmlFor="guardian_last_name">Guardian Last Name</Label>
                    <input
                        id="guardian_last_name"
                        type="text"
                        name="guardian_last_name"
                        value={formData.guardian_last_name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        placeholder="Guardian Last Name"
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
                    <Label className="font-bold " htmlFor="team_category">Team Category</Label>
                    <select
                        id="team_category"
                        name="team_category"
                        value={formData.team_category}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    >
                        <option value="" disabled>Select Team Category</option>
                        <option value="BGC - Biddies">BGC - Biddies</option>
                        <option value="BGC - Highschool">BGC - Highschool (Boys)</option>
                    </select>
                </div>

                <div className="relative w-full p-2 border rounded mb-2 flex items-center">
                    <Label htmlFor="file">Upload Birth Certificate</Label>
                    <input
                        id="file"
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={handleChange}
                        required
                        className="w-full"
                    />
                    {formData.file && (
                        <div className="flex items-center ml-2">
                            <span className="text-sm text-gray-700">{formData.file.name}</span>
                            <button
                                type="button"
                                onClick={handleRemoveFile}
                                className="ml-2 text-red-500 hover:text-red-700"
                            >
                                ✖
                            </button>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-blue-500 text-white py-2 rounded"
                >
                    {uploading ? "Uploading..." : "Submit"}
                </button>
            </form>
            {message && <p className="mt-3 text-center text-sm">{message}</p>}
        </div>
    );
}
