import { useAuthContext } from "../context";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMsg } from "../components";

export default function Login() {
  const {
    login,
    loginWithGoogle,
    resetPassword,
    currentUser,
    logout,
    loading,
    setLoading,
  } = useAuthContext();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
        setUser({...user, password : ""});
      } else if (error.code === "auth/internal-error") {
        setError("No olvides colocar tu contraseña");
      } else if (error.code === "auth/user-not-found") {
        setError("No existe un usuario con este email");
        setUser({...user, password : ""});
      } else setError(error.code);
    }
    setLoading(false);
  };

  const handleGoogleSigning = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      if (error.code == "auth/popup-closed-by-user") {
        setError(
          "Cerraste muy pronto la ventana del login y no pudimos cargar tu usuario. Intenta de nuevo"
        );
      } else setError(error.message);
    }
    setLoading(false);
  };

  // const handleResetPassword = async (e) => {
  //   e.preventDefault();
  //   if (!user.email) return setError("Write an email to reset password");
  //   try {
  //     await resetPassword(user.email);
  //     setError("We sent you an email. Check your inbox");
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  return loading ? (
    <div className="flex flex-col items-center justify-center bg-gray-200 min-h-screen">
      <PacmanLoader color="#9b34cc" size={70} />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center bg-gray-200 min-h-screen">
      {error && <ErrorMsg msg={error} />}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            id="email"
            placeholder="youremail@company.com"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            placeholder="******"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
          <button
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#!"
            // onClick={handleResetPassword}
          >
            Forgot Password?
          </button>
        </div>
      </form>

      <p className="my-4 text-sm flex justify-between px-3">
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="hover:font-bold">
          Registrate
        </Link>
      </p>

      <button
        onClick={handleGoogleSigning}
        className="w-fit bg-slate-50 hover:bg-gray-400 hover:text-white text-gray-700 font-bold shadow-md rounded border-2 border-gray-300 py-2 px-4"
      >
        Google Login
      </button>
    </div>
  );
  // const { currentUser, loginWithGoogle, logout, loading, setLoading } =
  //   useAuthContext();
  // // console.log('usuario actual', currentUser)
  // return loading ? (
  //   <div className="flex flex-col items-center justify-center bg-gray-200 min-h-screen">
  //     <PacmanLoader color="#9b34cc" size={70} />
  //   </div>
  // ) : (
  //   <section className="flex flex-col items-center justify-center bg-gray-200 min-h-screen">
  //     {/* Acá tengo que hacer el login para editar el stock */}
  //     <div className="my-8">
  //       {currentUser
  //         ? currentUser.name != null
  //           ? `${currentUser.name} esta logueado`
  //           : `${currentUser.email} esta logueado`
  //         : "No hay nadie logueado"}
  //     </div>
  //     {!currentUser ? (
  //       <button
  //         className="border rounded bg-blue-500 px-2 py-1"
  //         onClick={() => {
  //           loginWithGoogle();
  //           setLoading(true);
  //         }}
  //       >
  //         Entrar como invitado
  //       </button>
  //     ) : (
  //       <button
  //         className="border rounded bg-blue-500 px-2 py-1"
  //         onClick={() => {
  //           logout();
  //         }}
  //       >
  //         Salir
  //       </button>
  //     )}
  //   </section>
  // );
}
