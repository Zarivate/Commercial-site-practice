import "../styles/globals.css";
import { Layout } from "../components";
import { StateContext } from "../context/StateContext";
// Helps with notification popups
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    // By wrapping everything around the stateContext, it allows access for it's states and values anywhere within the project
    // as all the data from the state context is passed to every single component
    <StateContext>
      <Layout>
        {/* Because Layout is wrapped around the component here, it's passed to the Layout 
      component as children and can be accesed as such */}
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
