import Banner from "components/Banner";
import Footer from "components/Footer";
import NavbarMenu from "components/NavbarMenu";
import "../styles/globals.css"
import Preloader from "components/Preloader";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";

const poppins = Poppins({subsets: ["latin"], weight: ["400", "600", "700"]})

export default function App({ Component, pageProps }) {


  const [loading, setLoading] = useState(true)

  useEffect(()=> {
    const timer = setTimeout(()=> {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return( 
  <div className={poppins.className}>
    {loading && <Preloader />}
    <Banner />
    <NavbarMenu />
  <Component {...pageProps} />
  <Footer />
  </div>
  )
}
