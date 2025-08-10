import { FC } from 'react';
import './App.css';
import { HomePage } from './layouts/HomePage/';
import { Navbar, Footer } from "./layouts/NavbarAndFooter";
import SearchBooksPage from './layouts/SearchBooksPage/SearchBooksPage';
import { Redirect, Route, Switch } from 'react-router-dom';

const App: FC = () => (
   <>
      <Navbar />
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
      </Switch>
      <Footer />
   </>
);

export default App;