import Image from "next/image";
import Header from "./_components/Header";
import HeroSection from "./_components/HeroSection";
// import FetchListingsComponent from "./components/FetchListingsComponent";
import FetchPackagesComponent from "./_components/FetchPackagesComponent";
import CitySelection from "./_components/CitySelection";
import AdvertiseWithUs from "./_components/AdvertiseWithUs";
// import ServerListings from "./components/serverListings";
import AdvertisePackages from "./_components/AdvertisePackages";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection citiesEndpoint="/api/cities" />
      <CitySelection />
      {/* <ServerListings /> */}
      {/* <FetchListingsComponent /> */}
      <FetchPackagesComponent />
      <AdvertiseWithUs />
      <AdvertisePackages />
      {/* <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1>world</h1>
      </div> */}
    </>
  );
}
