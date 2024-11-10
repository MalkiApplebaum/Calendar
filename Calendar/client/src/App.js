import logo from './logo.svg';
import './App.css';
import Calendar from './Calendar';
import LoginPage from './login';
// import Event from './Event';
import RegistrationPage from './register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateEventPage } from './Event';



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/event" element={<CreateEventPage />} />
          
          <Route path="/register" element={<RegistrationPage />} />
        </ Routes>
      </BrowserRouter>
    </>

  );
}
export default App;



