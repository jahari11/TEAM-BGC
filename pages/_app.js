import Banner from "components/Banner";
import Footer from "components/Footer";
import NavbarMenu from "components/NavbarMenu";
import "../styles/globals.css"
import { Poppins } from "next/font/google";

const poppins = Poppins({subsets: ["latin"], weight: ["400", "600", "700"]})

export default function App({ Component, pageProps }) {
  return( 
  <div className={poppins.className}>
    <Banner />
    <NavbarMenu />
  <Component {...pageProps} />
  <Footer />
  </div>
  )
}
