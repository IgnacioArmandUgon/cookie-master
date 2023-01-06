import type { NextPage } from 'next';
import { useContext } from 'react';
import Layout from '../components/layouts/Layout';
import { LanguageContext } from '../context/LanguageContext';

const Home: NextPage = () => {
  const data = useContext(LanguageContext);

  return (
    <Layout>
      <div>
        <h1>Cookie Master</h1>
        <h2>{data?.dictionary.SORRY_RELOAD}</h2>
      </div>
    </Layout>
  );
};

export default Home;
