import React from 'react';
import { Header } from '@/components/Header';
import Main from '@/sections/Main';
import Screen from '@/sections/Screen';
import Advantages from '@/sections/Advantages';
import Pricing from '@/sections/Pricing';
import Blocks from '@/sections/Blocks';
import FAQ from '@/sections/FAQ';
import Setup from '@/sections/Setup';
import Footer from '@/components/Footer';
import Glow from '@/components/Glow';
import { makeStaticProps, getStaticPaths } from '@/lib/getStatic';

const Index = () => {
  return (
    <>
      <Header />
      <main>
        <Main />
        <Screen />
        <Advantages />
        <Pricing />
        <Blocks />
        <FAQ />
        <Setup />
      </main>
      <Footer />
    </>
  );
};

export default Index;
const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps };
