import { useState } from "react";
import { Input } from "postcss";
import { Textarea } from "components/ui/textarea";
import { Button } from "components/ui/button";
import { Label } from "components/ui/label";
import { InfiniteMovingCards } from "components/ui/infinite-moving-cards";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const sponsers = [
   {
    image:'https://www.logodesign.org/wp-content/uploads/2023/08/current-target-logo.png'
   },
   {
    image:'https://brandlogos.net/wp-content/uploads/2020/11/nike-swoosh-logo-512x512.png'
   },
   {
    image:'https://brandlogos.net/wp-content/uploads/2014/10/Adidas-logo-400x400.png'
   },

  ]

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Contact Header */}
      <div className="text-center mb-6">
        <h1 className="text-6xl uppercase font-bold mb-4">Contact Team BGC</h1>
        <p className="text-xl text-gray-700">
          We sincerely thank you for taking the time to learn about TEAM BGC, our mission, and our dedication to strengthening our vibrant community.
        </p>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-6 rounded-lg shadow-md">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full" required />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full" required />
        </div>

        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full" required />
        </div>

        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full" required />
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
          Send Message
        </Button>
      </form>

      <div className="h-[20rem]  flex flex-col antialiased dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <span className="text-4xl font-bold uppercase">Our sponsors</span>
      <InfiniteMovingCards
        items={sponsers}
        direction="right"
        speed="fast"
      />
    </div>

      {/* Support Section */}
      <div className="mt-10 p-6 bg-gray-50 rounded-lg shadow-md text-center">
        <h2 className="text-4xl font-bold mb-4">Support TEAM BGC</h2>
        <p className="text-lg text-gray-700 mb-4">
          TEAM BGC seeks to raise funds through sponsorships and donations to cover essential operational costs, including uniforms, venue fees, equipment, referees, and security.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          With your support, we can provide safe, fun, and memorable experiences that bring people together.
        </p>
        <p className="text-lg font-semibold">
          For sponsorship and donation opportunities, email{" "}
          <a href="mailto:biggclassic0731@gmail.com" className="text-blue-600 hover:underline">
            biggclassic0731@gmail.com
          </a>.
        </p>
      </div>
    </div>
  );
}
