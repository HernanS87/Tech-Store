import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { ErrorMsg } from "../components";
import { useAuthContext } from "../context";

export default function Register() {
  const { signup, loading, setLoading, currentUser } = useAuthContext();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Email no válido");
      } else if (error.code === "auth/weak-password") {
        setError("La contraseña debe tener al menos 6 dígitos");
      } else if (error.code === "auth/internal-error") {
        setError("Coloca una contraseña de al menos 6 dígitos");
      } else if (error.code === "auth/email-already-in-use") {
        setError("Ya existe un usuario con este email. Intenta con otro");
      } else {
        setError(error.code);
      }
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="flex flex-col items-center justify-center bg-gray-200 min-h-screen">
      <PacmanLoader color="#9b34cc" size={70} />
    </div>
  ) : !currentUser ? (
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
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline">
          Register
        </button>
      </form>

      <p className="my-4 text-sm flex justify-between px-3">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="hover:font-bold">
          Logueate
        </Link>
      </p>
    </div>
  ) : < Navigate to={'/'} />
}
