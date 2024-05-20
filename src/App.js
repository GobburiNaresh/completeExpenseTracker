import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MainImage from './components/Header/MainImage';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Expense from './components/Expense/Expense';
import ContactProfile from './components/Expense/ContactProfile';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
// import {AuthContextProvider} from './components/store/auth-context';
import { Provider } from 'react-redux';
import store from './components/store/index';


function App() {
  return (
    // <AuthContextProvider>
    <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/">
          <Header/>
          <MainImage/>
        </Route>
        <Route exact path="/signup">
          <Header/>
          <Signup/>
        </Route>
        <Route exact path="/login">
          <Header/>
          <Login/>
        </Route>
        <Route exact path="/expense">
          <Expense/>
        </Route>
        <Route exact path="/contact">
          <ContactProfile/>
        </Route>
        <Route exact path="/password">
          <Header/>
          <ForgotPassword/>
        </Route>
      </Switch>
    </Router>
    </Provider>
  );
}

export default App;
