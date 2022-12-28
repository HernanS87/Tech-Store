import { uploadImage, db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAdminContext } from "../context/AdminContext";

export default function AdminForm() {
  const stockRef = collection(db, "stock");
  const { categories } = useAdminContext();
  console.log(categories.sort());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const image = await uploadImage(e.target.image.files[0]);
    console.log("esta es la constante", image);

    addDoc(stockRef, {
      name: e.target.name.value,
      description: e.target.description.value,
      price: e.target.price.value,
      img: image,
    });

    e.target.image.value = null;
  };

  return (
    <form
      className="p-2 flex flex-col h-screen bg-slate-400"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name">Nombre del producto</label>
      <input
        type="text"
        id="name"
        placeholder="Producto"
        className="border-2 my-2 "
      />
      <label htmlFor="category">Selecciona una categoría</label>
      <select
        id="category"
        aria-placeholder="Categoría"
        className="border-2 my-2"
      >
        <option value="" ></option>
        {categories.sort().map((elem) => (
          <option key={elem} value={elem}>
            {elem}
          </option>
        ))}
      </select>
      <label htmlFor="price">Precio</label>
      <input
        type="number"
        id="price"
        placeholder="$ARS"
        className="border-2 my-2"
      />
      <label htmlFor="description">Descripcion</label>
      <textarea
        name=""
        id="description"
        cols="30"
        rows="3"
        className="border-2 my-2"
      ></textarea>
      <label htmlFor="image">Imagen</label>
      <input type="file" className="my-2" id="image" />
      <button
        type="submit"
        className="w-fit my-2 px-2 py-1 text-white bg-blue-600"
      >
        Guardar
      </button>
    </form>
  );
}
