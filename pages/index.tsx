import Head from "next/head";

import Auth from "../src/features/auth/Auth";

export const Home = (): JSX.Element => {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Auth />
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
