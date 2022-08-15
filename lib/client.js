// File too help retrieve sanity database information
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Sanity client
export const client = sanityClient({
  // So Sanity knows which project to connect too
  projectId: "imjv1wf5",
  // Too know whether in production or development
  dataset: "production",
  apiVersion: "2022-03-10",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

// For the images held in the Sanity datasets
const builder = imageUrlBuilder(client);

// Gets the urls for the images held within Sanity
export const urlFor = (source) => builder.image(source);
