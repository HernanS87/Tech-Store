import { About, Home, Admin, AdminForm, AdminStock } from "./pages";
import { Routes, Route } from "react-router-dom";
import {Header, Sidebar} from "./components/";

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
