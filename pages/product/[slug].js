// The brackets in the file name implies that this is a dynamic file, as in can go to
// /product/someSortOfTypeOfProductHere

import React from "react";
import { client, urlFor } from "../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

const ProductDetails = ({ product, products }) => {
  // Destructure values within product so as to not have to do "product.image", etc
  console.log(product);
  const { image, name, details, price } = product;
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[0])} />
          </div>
          {/* <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                src={urlFor(item)}
                className=""
                // Used for when a user hovers over a smaller image to display it as the main/larger image
                onMouseEnter=""
              />
            ))}
          </div> */}
        </div>
        <div className="product-details-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick="">
                <AiOutlineMinus />
              </span>
              <span className="num" onClick="">
                0
              </span>
              <span className="plus" onClick="">
                <AiOutlinePlus />
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Function that works in tandem with getStaticProps to define a list of paths too be statically generated. As
// a user will be able to not only click on an image on the main page, but also following images on detail
// pages of each product.
export const getStaticPaths = async () => {
  // Gets the current property of a slug of each product
  const query = `*[_type == "product"] {
        slug {
            current
        }
    }
    `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    // Because an object will be returned, both curly braces and parentheses are needed
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

// So the site knows which product to display correctly when clicked, API calls need to be made
// to render the correct page address. Next JS has getStaticProps for this.
export const getStaticProps = async ({ params: { slug } }) => {
  // Don't forget the single quote strings around the ${slug}, this is just for getting the first item in the slug
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  // This is for getting the rest of the products
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
