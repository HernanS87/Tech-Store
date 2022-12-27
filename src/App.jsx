import About from "./pages/About";
import Home from "./pages/Home";
import Header from "./components/Header";
import Admin from "./pages/Admin";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Header />
              <About />
            </>
          }
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </main>
  );
}

export default App;
