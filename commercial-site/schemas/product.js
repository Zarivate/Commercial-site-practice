// A schema can be exported as a basic JS object
export default {
  name: "product",
  title: "Product",
  type: "document",
  // Fields are object based so objects can be created within the array
  fields: [
    {
      name: "image",
      title: "Image",
      // This is because it'll be an array of images
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      // Slug is similar to a url, which will be utilized as a unique string here
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        // This way a unique slug is generated from each name property
        source: "name",
        maxLength: 90,
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "details",
      title: "Details",
      type: "string",
    },
  ],
};
