import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function Home() {
  const { currentUser, loading, logout } = useAuthContext();
  const navigate = useNavigate();

  return loading ? (
    <div className="flex flex-col items-center justify-center bg-gray-200 min-h-screen">
      <PacmanLoader color="#9b34cc" size={70} />
    </div>
  ) : !currentUser ? (
    <div className="flex flex-col items-center justify-center bg-gray-200 min-h-screen">
      <h1>Logueate para vivir toda la experiencia 😉</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </button>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center bg-gray-200 min-h-screen">
      <h1>
        Bienvenido <strong>{currentUser.name}</strong> a Tech Store la mejor
        tienda tecnológica del mundo 😎
      </h1>
      <button
        className="border rounded bg-blue-500 px-2 py-1"
        onClick={() => {
          logout();
        }}
      >
        Salir
      </button>
    </div>
  );
}
