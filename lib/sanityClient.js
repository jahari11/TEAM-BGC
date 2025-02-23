import { createClient } from '@sanity/client'

const client = createClient({
    projectId: 'vpi58v3v', // Your Sanity project ID
    dataset: 'production',  // Your Sanity dataset name
    apiVersion: '2023-10-01', // Use a current date for the API version
    token: process.env.SANITY_API_TOKEN,
    useCdn: false, // Set to true for cached data, false for fresh data
  });
  
  export default client;