import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import IndexPage from "./pages/index/IndexPage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import Products from "./pages/products/Products";
import { CartContextProvider } from "./context/CartContext";
import { UserContextProvider } from "./context/UserContext";

function App() {
  return (
    <UserContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;
