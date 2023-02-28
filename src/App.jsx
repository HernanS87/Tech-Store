import { Home, Login, AdminForm, AdminStock, Register } from "./pages";
import { Routes, Route } from "react-router-dom";
import { Header} from "./components/";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/*" element={<h1>Not Found 404</h1>}/>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/admin/form"
          element={
            <>
              <AdminForm />
            </>
          }
        />
        <Route
          path="/admin/stock"
          element={
            <>
              <AdminStock />
            </>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
