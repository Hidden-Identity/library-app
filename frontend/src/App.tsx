import { FC } from 'react';
import './App.css';
import { HomePage } from './layouts/HomePage/';
import { Navbar, Footer } from "./layouts/NavbarAndFooter";
import { SearchBooksPage } from './layouts/SearchBooksPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import { BookCheckoutPage } from './layouts/BookCheckoutPage';
import { Auth0ProviderWithHistory } from './layouts/Utils/authHelpers';
import { LoginRedirect } from './layouts/Utils/LoginRedirect';

const App: FC = () => (
   <div className='d-flex flex-column min-vh-100'>
      <Auth0ProviderWithHistory>
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
            <Route path='/login' component={LoginRedirect} />
         </Switch>
      </div>
      <Footer />
      </Auth0ProviderWithHistory>
   </div>
);

export default App;