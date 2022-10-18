import type { NextPage } from "next";
import Head from "next/head";

import CheckoutForm from "../components/CheckoutForm";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Boosting</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-normal text-gray-400 md:text-[5rem]">
          Valorant <span className="text-yellow-500">Boosting</span>
        </h1>
        <br/>
        <CheckoutForm/>
      </main>
    </>
  );
};

export default Home;