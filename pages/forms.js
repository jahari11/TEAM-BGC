import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { Card, CardHeader, CardTitle } from "components/ui/card";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { Textarea } from "components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select";

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const forms = [
  { id: "waiver", title: "Waiver Form", description: "Legal agreement for participation." },
  { id: "vendor", title: "Vendor Registration", description: "Sign up as a vendor for the event." },
  { id: "team", title: "Team Submission", description: "Register your team for the competition." },
  { id: "under-18-waiver", title: "Under 18 Waiver", description: "Parent/guardian consent form." },
];

export default function FormCards() {
  const [activeForm, setActiveForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = activeForm ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [activeForm]);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle file upload for Under-18 Waiver form
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Submitting form:", formData);

    let uploadedFileUrl = null;

    if (file && activeForm === "under-18-waiver") {
        console.log("Uploading file:", file.name);
        const { data, error } = await supabase.storage
            .from("documents")
            .upload(`private/${file.name}`, file);

        if (error) {
            console.error("File upload failed:", error);
            alert("File upload failed.");
            setLoading(false);
            return;
        }
        uploadedFileUrl = data.path;
        console.log("File uploaded successfully:", uploadedFileUrl);
    }

    const formSubmission = {
        ...formData,
        form_type: activeForm,
        file_url: uploadedFileUrl || null,
        created_at: new Date(),
    };

    console.log("Inserting into Supabase:", formSubmission);

    const { error } = await supabase.from('form_submissions').insert([formSubmission]);

    if (error) {
        console.error("Submission error:", error);
        alert("Submission failed. See console for details.");
    } else {
        console.log("Form submitted successfully!");
        alert("Form submitted successfully!");
        setActiveForm(null);
        setFormData({});
        setFile(null);
    }

    setLoading(false);
};

  const renderFormFields = () => {
    switch (activeForm) {
      case "under-18-waiver":
        return (
          <>
            <Label htmlFor="first_name">First Name</Label>
            <Input id="first_name" placeholder="First Name" onChange={handleChange} />

            <Label htmlFor="last_name">Last Name</Label>
            <Input id="last_name" placeholder="Last Name" onChange={handleChange} />

            <Label htmlFor="date_of_birth">Date of Birth</Label>
            <Input id="date_of_birth" type="date" onChange={handleChange} />

            <Label htmlFor="guardian_first_name">Guardian First Name</Label>
            <Input id="guardian_first_name" placeholder="Guardian First Name" onChange={handleChange} />

            <Label htmlFor="guardian_last_name">Guardian Last Name</Label>
            <Input id="guardian_last_name" placeholder="Guardian Last Name" onChange={handleChange} />

            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Email" onChange={handleChange} />

            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="Phone Number" onChange={handleChange} />

            <Label htmlFor="team_category">Team Category</Label>
            <Select id="team_category" onValueChange={(value) => setFormData({ ...formData, team_category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bgc-highschool">BGC - Highschool (Boys)</SelectItem>
                <SelectItem value="bgc-biddies">BGC - Biddies</SelectItem>
              </SelectContent>
            </Select>

            <Label htmlFor="file">Upload Birth Certificate (PDF/JPEG)</Label>
            <Input id="file" type="file" accept=".pdf,.jpg,.jpeg" onChange={handleFileChange} />
          </>
        );

      case "team":
        return (
          <>
            <Label htmlFor="first_name">First Name</Label>
            <Input id="first_name" placeholder="First Name" onChange={handleChange} />

            <Label htmlFor="last_name">Last Name</Label>
            <Input id="last_name" placeholder="Last Name" onChange={handleChange} />

            <Label htmlFor="team_name">Team Name</Label>
            <Input id="team_name" placeholder="Team Name" onChange={handleChange} />

            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Email" onChange={handleChange} />

            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="Phone Number" onChange={handleChange} />
          </>
        );

      case "vendor":
        return (
          <>
            <Label htmlFor="first_name">First Name</Label>
            <Input id="first_name" placeholder="First Name" onChange={handleChange} />

            <Label htmlFor="last_name">Last Name</Label>
            <Input id="last_name" placeholder="Last Name" onChange={handleChange} />

            <Label htmlFor="business_name">Business Name</Label>
            <Input id="business_name" placeholder="Business Name" onChange={handleChange} />

            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Email" onChange={handleChange} />

            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="Phone Number" onChange={handleChange} />

            <Label htmlFor="description">Business Description</Label>
            <Textarea id="description" placeholder="Describe your business..." onChange={handleChange} />
          </>
        );

      case "waiver":
        return (
          <>
            <Label htmlFor="first_name">First Name</Label>
            <Input id="first_name" placeholder="First Name" onChange={handleChange} />

            <Label htmlFor="last_name">Last Name</Label>
            <Input id="last_name" placeholder="Last Name" onChange={handleChange} />

            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Email" onChange={handleChange} />

            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="Phone Number" onChange={handleChange} />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      {forms.map((form) => (
        <Card key={form.id} onClick={() => setActiveForm(form.id)}>
          <CardHeader>
            <CardTitle>{form.title}</CardTitle>
          </CardHeader>
        </Card>
      ))}

      {activeForm && (
        <form onSubmit={handleSubmit}>
          {renderFormFields()}
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      )}
    </div>
  );
}
