import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VehicleForm from './components/VehicleForm';

function App() {
  return (
    <Router>
      <Routes>
        {/* Other routes */}
        <Route path="/add-vehicle" element={<VehicleForm />} />
        <Route path="/edit-vehicle/:id" element={<VehicleForm />} />
      </Routes>
    </Router>
  );
}

export default App;
