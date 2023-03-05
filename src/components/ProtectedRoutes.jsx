import { useAuthContext } from "../context";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children, type }) {
  const { currentUser, loading } = useAuthContext();

  return loading ? (
    <div className="flex flex-col items-center justify-center bg-gray-200 min-h-screen">
      <PacmanLoader color="#9b34cc" size={70} />
    </div>
  ) : currentUser ? ( // Si el usuario existe pregunto si type es admin
    type === "admin" ? ( // Si eso es true me muestra los hijos
      <>{children}</>
    ) : ( // Sino significa que es auth y me lleva al home
      <Navigate to={"/"} />
    )
  ) : type === "admin" ? ( // Si el usuario no existe pregunto si type es admin
    <Navigate to={"/login"} /> // Si eso es true me lleva a login
  ) : ( // sino significa que es auth y me muestra los hijos
    <>{children}</>
  );
}
