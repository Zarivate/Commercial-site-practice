import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

// Since the entire product was passed in, it's destructured in the product component
const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          {/* If an image property does exist, then the first value in the image array within the product object is returned */}
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
