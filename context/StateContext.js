// File to handle all the context information for the project such as functionality and so forth
import React, { useState, useEffect, useContext, createContext } from "react";
// Used for any pop up notifications that may appear on the site for things such as order confirmation and the like
import { toast } from "react-hot-toast";

const Context = createContext();

// Children is passed in so anything passed in between <State> </State> gets passed as "children"
export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);

  // This state will also utilize local data so if a user exits and returns, their items are still in the cart
  const [cartItems, setCartItems] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const [totalQuantities, setTotalQuantities] = useState(0);

  const [qty, setQty] = useState(1);

  // Variables to be used to keep track of whatever product we want to add or remove from the cart
  let foundProduct;
  let index;

  // Function that handles the logic for when a user tries to add something to their cart, checks for any duplicates
  const onAdd = (product, quantity) => {
    // Checks to see if incremented item already exists in user's cart
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    // If so, then isntead of adding a duplicate of the same item, just increase the quantity of it while
    // increasing and adjusting the variables of the cart as well. Variables such as totalPrice and total number of products
    if (checkProductInCart) {
      // Create a new cart but now with the adjusted duplicate cart product
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to cart.`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);

    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );

    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);

    // Since the incremented product shouldn't be added to the cart list when displayed, this will filter out the foundProduct
    const newCartItems = cartItems.filter((item) => item._id !== id);

    // Now that variables have been found, need to figure out whether they will be incremented or decremented
    if (value === "inc") {
      // Since you never want to mutate the array, instead what's done is a newCartItems is created and used to update the state
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  // Function to increment the qty value instead of constantly passing it in to each component to possibily be incremented
  const incQty = () => {
    // As previous value is being updated, needs to be a callback function
    setQty((prevQty) => prevQty + 1);
  };

  // Same idea as above, just now for decrementing
  const decQty = () => {
    // Since decreasing now, have to check doesn't go below 0 before decrementing
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  // Create context provider
  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {/* Everything will be wrapped by the context provider, providing it all access to the context provider */}
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
