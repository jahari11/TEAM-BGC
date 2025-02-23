import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import submissions from './schemaTypes/submissions';

export default defineConfig({
  name: 'default',
  title: 'BIGG',

  projectId: 'vpi58v3v', // Replace with your Sanity project ID
  dataset: 'production', // Use 'production' or another dataset name if needed

  apiVersion: '2023-01-01', // Keep this updated to the latest API version

  plugins: [deskTool(), visionTool()], // Enables the Sanity Studio UI and Vision for queries

  schema: {
    types: [submissions] // Import all schemas, including your `submission.js`
  },

  // (Optional) Enable CORS for local development
  cors: {
    origins: ['http://localhost:3000', 'https://yourwebsite.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

