import { db } from "../constants";
import { doc, updateDoc, setDoc } from "firebase/firestore";
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

  const initialState = {
    name: "",
    category: "",
    price: "",
    quantity: 1,
    offer: false,
    percent: "",
    description: "",
    images: [],
  };

  const [form, setForm] = useState(initialState);

  const validationsForm = (form) => {
    let validate = true;
    let errors = {};
    let regexName = /^.{4,200}$/;
    let regexPrice = /^[1-9]\d*$/;
    let regexComments = /^.{0,255}$/;

    if (!form.name.trim()) {
      errors.name = 'El campo "Nombre" es requerido';
      validate = false;
    } else if (!regexName.test(form.name.trim())) {
      errors.name = "Debes colocar un nombre con al menos 4 caracteres";
      validate = false;
    }

    if (!form.category) {
      errors.category = 'El campo "Categoría" es requerido';
      validate = false;
    }

    if (!form.price.trim()) {
      errors.price = 'El campo "Precio" es requerido';
      validate = false;
    } else if (!regexPrice.test(form.price)) {
      errors.price = "Debes colocar un numero entero mayor a cero";
      validate = false;
    }

    if (!form.quantity) {
      errors.quantity = 'El campo "Cantidad" es requerido';
      validate = false;
    } else if (!regexPrice.test(form.quantity)) {
      errors.quantity = "Debes colocar un numero entero mayor a cero";
      validate = false;
    }

    if (!regexComments.test(form.description)) {
      errors.description = 'El campo "Descripción" acepta solo 255 caracteres';
      validate = false;
    }

    if (form.offer && (form.percent > 100 || form.percent < 1)) {
      errors.percent = "Debes colocar un numero entero entre 1 y 100";
      validate = false;
    }

    if (form.images.length === 0) {
      errors.images = "Debes cargar al menos una imágen del producto";
      validate = false;
    }

    return validate ? null : errors;
  };

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const resetForm = () => {
    setForm(initialState);
    setError({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validationsForm(form);

    if (err === null) {
      console.log("enviado exitosamente");
      console.log(form);
      if (form.id) {
        const prodRef = doc(db, `Stock/${form.id}`);
        updateDoc(prodRef, {
          ...form,
        });
      } else {
        const stockRef = doc(db, "Stock", `${e.target.name.value}`);
        setDoc(stockRef, {
          ...form,
        });
      }

      resetForm();
    } else {
      setError(err);
    }
  };

  const [detailPopup, setDetailPopup] = useState({
    ok: false,
  });

  return (
    <AdminContext.Provider
      value={{
        categories,
        form,
        error,
        handleChange,
        handleSubmit,
        setForm,
        setError,
        resetForm,
        uploadImage,
        detailPopup,
        setDetailPopup,
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
