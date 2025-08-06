import { FC } from 'react';
import './App.css';
import { HomePage } from './layouts/HomePage/';
import { Navbar, Footer } from "./layouts/NavbarAndFooter";

const App: FC = () => (
  <>
    <Navbar />
    <HomePage />
    <Footer />
  </>
);

export default App;