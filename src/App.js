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
import Cart from "./pages/cart/Cart";
import { ThemeProvider } from "styled-components";
import AddBook from "./components/AddBook";
import User from "./pages/user/User";
import EditUser from "./pages/user/EditUser";
import Categories from "./pages/category/Categories";
import AddCategory from "./pages/category/AddCategory";
import EditCategory from "./pages/category/EditCategory";
import Books from "./pages/Books";
import EditBook from "./pages/EditBook";
import Profile from "./pages/profile/Profile";

function App() {
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/users" element={<User />} />
              <Route path="/users/:id" element={<EditUser />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/addcategory" element={<AddCategory />} />
              <Route path="/categories/:id" element={<EditCategory />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/addbook" element={<AddBook />} />
              <Route path="/books/:id" element={<EditBook />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </CartContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  );
}

export default App;
