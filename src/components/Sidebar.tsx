import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  BarChart, 
  Settings,
  Home,
  Menu,
  X,
  UserPlus,
  ShoppingCart,
  CheckSquare
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: DollarSign, label: 'Sales', path: '/sales' },
  { icon: UserPlus, label: 'Leads', path: '/leads' },
  { icon: Users, label: 'Employees', path: '/employees' },
  { icon: ShoppingCart, label: 'Purchases', path: '/purchases' },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
  { icon: Calendar, label: 'Activities', path: '/activities' },
  { icon: BarChart, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center px-4 z-30">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-500 hover:text-gray-700"
        >
          <Menu size={24} />
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden ${
          isMobileMenuOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r transform transition-transform duration-200 ease-in-out z-50 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <h1 className="text-xl font-bold">CRM Platform</h1>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-500 hover:text-gray-700 lg:hidden"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 ${
                  isActive ? 'bg-blue-50 text-blue-600' : ''
                }`}
              >
                <Icon size={20} className={isActive ? 'text-blue-600' : ''} />
                <span className="ml-3">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}