import { createContext, useContext } from "react";

const AdminContext = createContext();

const categories = [
  "Electrónica, audio y video",
  "Computación",
  "Celulares",
  "Laptops",
  "Sillas para pc",
  "Camaras y accesorios",
];

export const AdminContextProvider = ({ children }) => {
  return (
    <AdminContext.Provider
      value={{
        categories,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);

  if (!context) throw new Error("you can't execute useAdminContext here");

  return context;
};
