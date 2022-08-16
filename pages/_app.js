import "../styles/globals.css";
import { Layout } from "../components";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      {/* Because Layout is wrapped around the component here, it's passed to the Layout 
      component as children and can be accesed as such */}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
