import { createContext, useContext, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../constants";
import { v4 } from "uuid";

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

  async function uploadImage(image) {
    const storageRef = ref(storage, `testing/${v4()}`);
    await uploadBytes(storageRef, image);
    return getDownloadURL(storageRef);
  }
  const [priceOk, setPriceOk] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [prodToEdit, setProdToEdit] = useState(null);
  const [imgArray, setImgArray] = useState([]);
  return (
    <AdminContext.Provider
      value={{
        categories,
        priceOk,
        setPriceOk,
        quantity,
        setQuantity,
        prodToEdit,
        setProdToEdit,
        uploadImage,
        imgArray,
        setImgArray,
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
