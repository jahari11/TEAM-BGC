import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-6 flex flex-col items-center text-center space-y-4">
        {/* Copyright & Tagline */}
        <span className="text-xl font-semibold uppercase">TEAM BGC</span>
        <span className="text-lg font-semibold uppercase">Building a community through basketball.</span>
        <span className="text-md text-white">© 2025 Team BGC. All Rights Reserved.</span>

        {/* Contact Link */}
        <a href="/contact" className="text-blue-400 hover:underline">Contact us</a>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook size={24} className="hover:text-gray-400 transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram size={24} className="hover:text-gray-400 transition" />
          </a>
        </div>
      </div>
    </footer>
  );
}
