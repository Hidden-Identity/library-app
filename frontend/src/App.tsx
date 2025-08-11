import { FC } from 'react';
import './App.css';
import { HomePage } from './layouts/HomePage/';
import { Navbar, Footer } from "./layouts/NavbarAndFooter";
import { SearchBooksPage } from './layouts/SearchBooksPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import { BookCheckoutPage } from './layouts/BookCheckoutPage';

const App: FC = () => (
   <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='flex-grow-1'>
         <Switch>
            <Route path='/' exact>
               <Redirect to='/home' />
            </Route>
            <Route path='/home'>
               <HomePage />
            </Route>
            <Route path='/search'>
               <SearchBooksPage />
            </Route>
            <Route path='/checkout/:bookId'>
               <BookCheckoutPage />
            </Route>
         </Switch>
      </div>
      <Footer />
   </div>
);

export default App;