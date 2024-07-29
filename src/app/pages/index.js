// pages/index.js
import Head from 'next/head';
import AddPantryItem from '../components/AddPantryItem';
import PantryList from '../components/PantryList';
import Auth from '../components/Auth';
import Dashboard from '../components/Dashboard';  

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pantry Management</title>
        <meta name="description" content="Pantry Management App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Pantry Management</h1>
        <Auth />
        <AddPantryItem />
        <PantryList />
      </main>
    </div>
  );
}
