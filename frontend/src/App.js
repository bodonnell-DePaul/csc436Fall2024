import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavHeader from './NavHeader';
import TopicList from './TopicList';
import Login from './Login';
import { ProfileData } from './components/ProfileData';
import { SignOutButton } from './components/SignOutButton';
import { useIsAuthenticated } from '@azure/msal-react';

function App() {
  const isAuthenticated = useIsAuthenticated();
  return (
    
    <Router>
      <NavHeader />
      <Routes>
        <Route exact path="/" element={ <TopicList /> }></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/profile" element={isAuthenticated ? <SignOutButton /> : <ProfileData/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
