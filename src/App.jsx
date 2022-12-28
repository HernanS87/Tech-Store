import About from "./pages/About";
import Home from "./pages/Home";
import Header from "./components/Header";
import Admin from "./pages/Admin";
import AdminForm from "./pages/AdminForm";
import { Routes, Route } from "react-router-dom";
import AdminStock from "./pages/AdminStock";
import Sidebar from "./components/admin/Sidebar";

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
        <Route path="/admin/" element={<Admin />}>
          <Route
            path="form"
            element={
              <>
                <Sidebar />
                <AdminForm />
              </>
            }
          />
          <Route
            path="stock"
            element={
              <>
                <Sidebar />
                <AdminStock />
              </>
            }
          />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
