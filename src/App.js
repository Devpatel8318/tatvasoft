import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import IndexPage from "./components/IndexPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
