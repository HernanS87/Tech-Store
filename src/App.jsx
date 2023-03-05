import { Home, Login, AdminForm, AdminStock, Register } from "./pages";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./components";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/*" element={<h1>Not Found 404</h1>} />
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />

        <Route
          path="/register"
          element={
            <ProtectedRoutes type={'auth'}>
              <Register />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoutes type={'auth'}>
              <Login />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/admin/form"
          element={
            <ProtectedRoutes type={'admin'}>
              <AdminForm />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/stock"
          element={
            <ProtectedRoutes type={'admin'}>
              <AdminStock />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
