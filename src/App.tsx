import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import  { Navbar }  from './components/Navbar';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Product } from './pages/Product';
import { Cart } from './pages/Cart';
import { Account } from './pages/Account';
import { CustomOrders } from './pages/CustomOrders';
import { Login } from './pages/Login';
import { Signup } from './pages/SignUp';
import { Verification } from './pages/Verification';
import { ProtectedRoute } from './components/routes/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verification" element={<Verification />} />
            <Route 
              path="/account" 
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              } 
            />
            <Route path="/custom-orders" element={<CustomOrders />} />
          </Routes>
        </div>
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App