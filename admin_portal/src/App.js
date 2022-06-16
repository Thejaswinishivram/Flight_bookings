
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import AddFlights from './Pages/Addflights/Addflights';
import HomePage from './Pages/Homepage/Homepage';
import ViewBookings from './Pages/Viewbookings/Viewbookings';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/"element={<HomePage/>}/>
      <Route path="/Add_Flight"element={<AddFlights/>}/>
      <Route path="/view_bookings/:id"element={<ViewBookings/>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
