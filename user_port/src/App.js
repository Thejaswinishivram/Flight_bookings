import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SignUp from './Pages/Sign_up/Signup';
import LoginPage from './Pages/Loginpage/Loginpage';
import DashBoard from './Pages/Dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/" element={<DashBoard/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
