import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Card, CardHeader, CardTitle } from "components/ui/card";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { Textarea } from "components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select";

const forms = [
  { id: "waiver", title: "Waiver Form", description: "Legal agreement for participation." },
  { id: "vendor", title: "Vendor Registration", description: "Sign up as a vendor for the event." },
  { id: "team", title: "Team Submission", description: "Register your team for the competition." },
  { id: "under-18-waiver", title: "Under 18 Waiver", description: "Parent/guardian consent form." },
];

export default function FormCards() {
  const [activeForm, setActiveForm] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isUnder18, setIsUnder18] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeForm ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [activeForm]);

  const handleFileChange = (e) => {
    setFileName(e.target.files.length > 0 ? e.target.files[0].name : "");
  };

  const [teamCategory, setTeamCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const fileInput = document.getElementById("waiver-file-upload");
    const file = fileInput?.files[0];
  
    const formData = new FormData();
    formData.append("formType", activeForm);
    formData.append("firstName", document.getElementById(`${activeForm}-first-name`)?.value || "");
    formData.append("lastName", document.getElementById(`${activeForm}-last-name`)?.value || "");
    formData.append("email", document.getElementById(`${activeForm}-email`)?.value || "");
    formData.append("phone", document.getElementById(`${activeForm}-phone`)?.value || "");
    formData.append("businessName", document.getElementById(`${activeForm}-business-name`)?.value || "");
    formData.append("teamName", document.getElementById(`${activeForm}-team-name`)?.value || "");
    formData.append("teamCategory", teamCategory || "");
    formData.append("businessDescription", document.getElementById(`${activeForm}-desc`)?.value || "");
    formData.append("additionalInfo", document.getElementById("waiver-additional-info")?.value || "");
    formData.append("dob", document.getElementById(`${activeForm}-dob`)?.value || "");
    formData.append("guardianFirstName", document.getElementById("guardian-first-name")?.value || "");
    formData.append("guardianLastName", document.getElementById("guardian-last-name")?.value || "");

  
  
    if (file) {
      formData.append("waiverFile", file);
    }
  
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData, // Send FormData instead of JSON
      });
  
      if (response.ok) {
        alert("Form submitted successfully!");
        setActiveForm(null);
        setFileName("");
      } else {
        alert("Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Error submitting form.");
    }
  };

  const renderFormFields = () => {
    switch (activeForm) {
      case "under-18-waiver":
  return (
    <>
      <div className="space-y-0">
        <Label htmlFor="under18-first-name" className="mb-2">First Name</Label>
        <Input id="under18-first-name" placeholder="First Name" />
      </div>

      <div className="space-y-0">
        <Label htmlFor="under18-last-name" className="mb-2">Last Name</Label>
        <Input id="under18-last-name" placeholder="Last Name" />
      </div>

      <div className="space-y-0">
        <Label htmlFor="under18-dob" className="mb-2">Date of Birth</Label>
        <Input id="under18-dob" type="date" />
      </div>

      <div className="mt-4 p-3 border rounded-lg">
        <p className="text-sm font-semibold">Parent / Guardian Information</p>

        <div className="space-y-0">
          <Label htmlFor="guardian-first-name" className="mb-2">Parent/Guardian First Name</Label>
          <Input id="guardian-first-name" placeholder="First Name" />
        </div>

        <div className="space-y-0">
          <Label htmlFor="guardian-last-name" className="mb-2">Parent/Guardian Last Name</Label>
          <Input id="guardian-last-name" placeholder="Last Name" />
        </div>
      </div>

      <div className="space-y-0">
              <Label htmlFor="team-email" className="mb-2">Email</Label>
              <Input id="under18-email" type="email" placeholder="Email" />
      </div>

      <div className="space-y-0">
        <Label htmlFor="under18-phone" className="mb-2">Phone Number</Label>
        <Input id="under18-phone" type="tel" placeholder="Phone Number" />
      </div>

      <div className="space-y-0">
  <Label htmlFor="under18-team-category" className="mb-2">Team Category</Label>
  <Select onValueChange={(value) => setTeamCategory(value)}>
    <SelectTrigger>
      <SelectValue placeholder="Select a category" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="bgc-highschool">BGC - Highschool (Boys)</SelectItem>
      <SelectItem value="bgc-biddies">BGC - Biddies</SelectItem>
    </SelectContent>
  </Select>
</div>


      <div className="space-y-0">
        <Label htmlFor="under18-file-upload" className="mb-2">Upload Document (PDF or JPEG)</Label>
        <div className="flex items-center space-x-2">
          <Input id="under18-file-upload" type="file" accept=".pdf,.jpeg,.jpg" onChange={handleFileChange} />
          <Button type="button" variant="outline" onClick={() => document.getElementById("under18-file-upload").click()}>
            Choose File
          </Button>
          <span className="text-sm text-gray-500">{fileName || "No file chosen"}</span>
        </div>
      </div>
    </>
  );
  
      case "team":
        return (
          <>
            <div className="space-y-0">
              <Label htmlFor="team-first-name" className="mb-2">First Name</Label>
              <Input id="team-first-name" placeholder="First Name" />
            </div>
  
            <div className="space-y-0">
              <Label htmlFor="team-last-name" className="mb-2">Last Name</Label>
              <Input id="team-last-name" placeholder="Last Name" />
            </div>
  
            <div className="space-y-0">
              <Label htmlFor="team-name" className="mb-2">Team Name</Label>
              <Input id="team-name" placeholder="Team Name" />
            </div>
  
            <div className="space-y-0">
              <Label htmlFor="team-email" className="mb-2">Email</Label>
              <Input id="team-email" type="email" placeholder="Email" />
            </div>
  
            <div className="space-y-0">
              <Label htmlFor="team-phone" className="mb-2">Phone Number</Label>
              <Input id="team-phone" type="tel" placeholder="Phone Number" />
            </div>
  
            <div className="space-y-0">
              <Label htmlFor="team-category" className="mb-2">Team Category</Label>
              <Select onValueChange={(value) => setTeamCategory(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bgc-men">BGC's - Men</SelectItem>
                  <SelectItem value="big-g-upstate">BIG G's Upstate Pro Am</SelectItem>
                  <SelectItem value="bgc-highschool">BGC - Highschool (Boys)</SelectItem>
                  <SelectItem value="bgc-biddies">BGC - Biddies</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
  
      case "vendor":
        return (
          <>
          <div className="space-y-0">
            <Label htmlFor="vendor-first-name" className="mb-2">First Name</Label>
            <Input id="vendor-first-name" placeholder="First Name" />
          </div>

          <div className="space-y-0">
            <Label htmlFor="vendor-last-name" className="mb-2">Last Name</Label>
            <Input id="vendor-last-name" placeholder="Last Name" />
          </div>

          <div className="space-y-0">
            <Label htmlFor="vendor-business-name" className="mb-2">Business Name</Label>
            <Input id="vendor-business-name" placeholder="Business Name" />
          </div>

          <div className="space-y-0">
            <Label htmlFor="vendor-email" className="mb-2">Email</Label>
            <Input id="vendor-email" type="email" placeholder="Email" />
          </div>

          <div className="space-y-0">
            <Label htmlFor="vendor-phone" className="mb-2">Phone Number</Label>
            <Input id="vendor-phone" type="tel" placeholder="Phone Number" />
          </div>

          <div className="space-y-0">
            <Label htmlFor="vendor-desc" className="mb-2">Business Description</Label>
            <Textarea id="vendor-desc" placeholder="Describe your business..." />
          </div>
        </>
        );
  


        case "waiver":
  return (
    <>
      <div className="space-y-0">
        <Label htmlFor="waiver-first-name" className="mb-2">First Name</Label>
        <Input id="waiver-first-name" placeholder="First Name" />
      </div>

      <div className="space-y-0">
        <Label htmlFor="waiver-last-name" className="mb-2">Last Name</Label>
        <Input id="waiver-last-name" placeholder="Last Name" />
      </div>

      <div className="space-y-0">
        <Label htmlFor="waiver-email" className="mb-2">Email</Label>
        <Input id="waiver-email" type="email" placeholder="Email" />
      </div>

      <div className="space-y-0">
        <Label htmlFor="waiver-phone" className="mb-2">Phone Number</Label>
        <Input id="waiver-phone" type="tel" placeholder="Phone Number" />
      </div>

      <div className="space-y-0">
        <Label htmlFor="waiver-team-category" className="mb-2">Team Category</Label>
        <Select onValueChange={(value) => setTeamCategory(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bgc-men">BGC's - Men</SelectItem>
            <SelectItem value="big-g-upstate">BIG G's Upstate Pro Am</SelectItem>
            <SelectItem value="bgc-highschool">BGC - Highschool (Boys)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );

        
        
  
      default:
        return null;
    }
  };
  
  

  return (
    <div className="container mx-auto p-4 h-screen">
      <div className="flex flex-col items-center">
      <h1 className="font-bold text-4xl uppercase">Team BGC Forms</h1>
      <p className="text-lg text-center">Fill out the form below to submit your information. Please ensure all details are accurate before submitting.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[90%]">
  {forms.map((form) => (
    <Card
      key={form.id}
      className={`cursor-pointer hover:shadow-lg transition-shadow p-6 flex flex-col justify-center items-center text-center relative h-40 md:h-full ${
        activeForm ? "opacity-50 pointer-events-none" : "opacity-100"
      }`}
      onClick={() => setActiveForm(form.id)}
      style={{
        backgroundImage: `url('/images/${form.id}.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
      <CardHeader className="relative z-10 text-white">
        <CardTitle className="text-lg md:text-xl lg:text-2xl">{form.title}</CardTitle>
        {!activeForm && ( // Hide the description when a form is open
          <p className="text-white text-sm md:text-base mt-2">{form.description}</p>
        )}
      </CardHeader>
    </Card>
  ))}
</div>


      {activeForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{forms.find((f) => f.id === activeForm)?.title}</h2>
              <Button variant="ghost" size="icon" onClick={() => setActiveForm(null)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {renderFormFields()}
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
