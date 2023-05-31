import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import IndexPage from "./pages/index/IndexPage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import ProductList from "./pages/index/IndexPage";
import { AppWrapper } from "./userContext";

function App() {
  return (
    <AppWrapper>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
