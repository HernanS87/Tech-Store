import { createContext, useContext, useState } from "react";

const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const categories = [
    "Electrónica, audio y video",
    "Computación",
    "Celulares",
    "Laptops",
    "Sillas para pc",
    "Camaras y accesorios",
  ];

  const [prodToEdit, setProdToEdit] = useState(null);

  return (
    <AdminContext.Provider
      value={{
        categories,
        prodToEdit,
        setProdToEdit,
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
