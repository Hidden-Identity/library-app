import { FC } from 'react';
import './App.css';
import { HomePage } from './layouts/HomePage/';
import { Navbar, Footer } from "./layouts/NavbarAndFooter";
import SearchBooksPage from './layouts/SearchBooksPage/SearchBooksPage';

const App: FC = () => (
  <>
    <Navbar />
    {/* <HomePage /> */}
    <SearchBooksPage />
    <Footer />
  </>
);

export default App;