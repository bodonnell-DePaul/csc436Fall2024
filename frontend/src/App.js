import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavHeader from './NavHeader';
import TopicList from './TopicList';
import Login from './Login';

function App() {
  return (
    <Router>
      <NavHeader />
      <Routes>
        <Route exact path="/" element={ <TopicList /> }></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
