import { createClient } from "@sanity/client";
import formidable from "formidable";
import fs from "fs/promises";

// Initialize Sanity client
const client = createClient({
  projectId: "vpi58v3v",
  dataset: "production",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const form = formidable({ multiples: false });

  try {
    const [rawFields, files] = await form.parse(req);

    // Convert fields into a usable object
    const fields = Object.fromEntries(
      Object.entries(rawFields).map(([key, value]) => [key, value?.[0] || ""])
    );

    console.log("Processed fields:", fields);

    let waiverFile = null;

    // Upload file **ONLY** if formType is "under-18-waiver"
    if (fields.formType === "under-18-waiver" && files.waiverFile) {
      console.log("Uploading file:", files.waiverFile);
      const file = Array.isArray(files.waiverFile) ? files.waiverFile[0] : files.waiverFile;

      if (!file) {
        throw new Error("File is missing from request.");
      }

      const fileData = await fs.readFile(file.filepath);
      const uploadedFile = await client.assets.upload("file", fileData, {
        filename: file.originalFilename,
      });

      waiverFile = {
        _type: "file",
        asset: { _type: "reference", _ref: uploadedFile._id },
      };
    }

    // Build submission data
    const submissionData = {
      _type: "submission",
      formType: fields.formType,
      firstName: fields.firstName,
      lastName: fields.lastName,
      email: fields.email,
      phone: fields.phone,
      businessName: fields.businessName || "",
      teamName: fields.teamName || "",
      teamCategory: fields.teamCategory || "",
      businessDescription: fields.businessDescription || "",
      additionalInfo: fields.additionalInfo || "",
      waiverFile, // Will only be set if formType === "under-18-waiver"
      dateOfBirth: fields.dateOfBirth || null,
      guardianFirstName: fields.guardianFirstName || "",
      guardianLastName: fields.guardianLastName || "",
      guardianEmail: fields.guardianEmail || "",
      guardianPhone: fields.guardianPhone || "",
      createdAt: new Date().toISOString(),
    };

    console.log("Final Submission Data:", submissionData);

    // Save submission to Sanity
    const submission = await client.create(submissionData);

    res.status(200).json({ message: "Form submitted successfully!", submission });
  } catch (error) {
    console.error("Server processing error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
