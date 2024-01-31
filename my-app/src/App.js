import {Route, Routes } from 'react-router-dom';
import Show from './components/Shows/Show';
import Navbar from './components/Navbar/Navbar';
import ShowSummary from './components/ShowSummary/ShowSummary';
import BookingForm from './components/BookingForm/BookingForm';

function App() {
  return (
    <div>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Show/>} />
          <Route path='/show/:id' element={<ShowSummary/>} />
          <Route path='/booking/:id' element={<BookingForm/>} />
        </Routes>
    </div>
  );
}

export default App;
