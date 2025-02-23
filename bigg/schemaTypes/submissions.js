export default {
  name: "submission",
  title: "Form Submissions",
  type: "document",
  fields: [
    {
      name: "formType",
      title: "Form Type",
      type: "string",
      options: {
        list: [
          { title: "Waiver Form", value: "waiver" },
          { title: "Under 18 Waiver", value: "under-18-waiver" },
          { title: "Vendor Registration", value: "vendor" },
          { title: "Team Submission", value: "team" },
          { title: "Volunteer Form", value: "volunteer" },
        ],
      },
    },
    {
      name: "firstName",
      title: "First Name",
      type: "string",
    },
    {
      name: "lastName",
      title: "Last Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "string",
    },
    {
      name: "businessName",
      title: "Business Name",
      type: "string",
      hidden: ({ document }) => document?.formType !== "vendor",
    },
    {
      name: "teamName",
      title: "Team Name",
      type: "string",
      hidden: ({ document }) => document?.formType !== "team",
    },
    {
      name: "teamCategory",
      title: "Team Category",
      type: "string",
      hidden: ({ document }) =>
        document?.formType !== "team" && document?.formType !== "waiver",
    },
    {
      name: "businessDescription",
      title: "Business Description",
      type: "text",
      hidden: ({ document }) => document?.formType !== "vendor",
    },
    {
      name: "waiverFile",
      title: "Waiver File",
      type: "file",
      hidden: ({ document }) => document?.formType !== "under-18-waiver",
    },
    {
      name: "dateOfBirth",
      title: "Date of Birth",
      type: "date",
      hidden: ({ document }) => document?.formType !== "under-18-waiver",
    },
    {
      name: "guardianFirstName",
      title: "Guardian First Name",
      type: "string",
      hidden: ({ document }) => document?.formType !== "under-18-waiver",
    },
    {
      name: "guardianLastName",
      title: "Guardian Last Name",
      type: "string",
      hidden: ({ document }) => document?.formType !== "under-18-waiver",
    },
    {
      name: "guardianEmail",
      title: "Guardian Email",
      type: "string",
      hidden: ({ document }) => document?.formType !== "under-18-waiver",
    },
    {
      name: "guardianPhone",
      title: "Guardian Phone",
      type: "string",
      hidden: ({ document }) => document?.formType !== "under-18-waiver",
    },
    {
      name: "additionalInfo",
      title: "Additional Information",
      type: "text",
    },
    {
      name: "createdAt",
      title: "Submitted At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
  ],
};
