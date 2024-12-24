import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SalesPanel from './components/sales/SalesPanel';
import LeadPanel from './components/leads/LeadPanel';
import EmployeePanel from './components/employees/EmployeePanel';
import PurchasePanel from './components/purchases/PurchasePanel';
import TaskPanel from './components/tasks/TaskPanel';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 lg:ml-64">
          <Header />
          <main className="mt-16">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sales" element={<SalesPanel />} />
              <Route path="/leads" element={<LeadPanel />} />
              <Route path="/employees" element={<EmployeePanel />} />
              <Route path="/purchases" element={<PurchasePanel />} />
              <Route path="/tasks" element={<TaskPanel />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;