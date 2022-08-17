// The brackets in the file name implies that this is a dynamic file, as in can go to
// /product/someSortOfTypeOfProductHere
import React, { useState } from "react";
import { client, urlFor } from "../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ product, products }) => {
  // Destructure values within product so as to not have to do "product.image", etc
  const { image, name, details, price } = product;

  // State value to help with changing what gets displayed on the bigger square when a user hovers over a product
  const [index, setIndex] = useState(0);

  const { decQty, incQty, qty, onAdd } = useStateContext();

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                src={urlFor(item)}
                // If the index of the hovered image matches with the one currently set as index, then display
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                // Used for when a user hovers over a smaller image to display it as the main/larger image, a callback function
                // is made to change the index to the one the user hovered over it
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
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
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num" onClick="">
                {qty}
              </span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick="">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        {/* This is where the scrolling magic happens */}
        <div className="marquee">
          {/* The "track" keyword is where the auto scrolling feature comes in */}
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
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
