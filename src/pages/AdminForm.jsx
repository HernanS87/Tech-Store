import { useAdminContext } from "../context";
import {
  InputPriceCustom,
  InputFileCustom,
  InputQuantityCustom,
  InputOfferCustom,
  ErrorMsg,
  Sidebar,
} from "../components";
import { Toaster } from "react-hot-toast";

export default function AdminForm() {
  const { categories, form, error, handleChange, handleSubmit } =
    useAdminContext();

  return (
    <>
      <Sidebar />
      <form
        className="p-2 flex flex-col flex-1 min-h-screen bg-slate-400 pl-40"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Nombre del producto</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Producto"
          className="border-2 my-2 "
          value={form.name}
          onChange={handleChange}
        />

        <ErrorMsg msg={error.name} />
        <label htmlFor="category">Selecciona una categoría</label>
        <select
          id="category"
          name="category"
          aria-placeholder="Categoría"
          className="border-2 my-2"
          value={form.category}
          onChange={handleChange}
        >
          <option value=""></option>
          {categories.sort().map((elem) => (
            <option key={elem} value={elem}>
              {elem}
            </option>
          ))}
        </select>
        <ErrorMsg msg={error.category} />
        <div className="flex justify-center my-2">
          <div className="flex flex-wrap items-center justify-between py-4 w-full sm:w-3/4 md-920-w-66 lg:w-3/5 ">
            <InputPriceCustom />
            <InputQuantityCustom />
          </div>
        </div>
        <div>
          <InputOfferCustom />
        </div>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          cols="30"
          rows="3"
          placeholder="..."
          className="border-2 my-2"
          value={form.description}
          onChange={handleChange}
        ></textarea>
        <ErrorMsg msg={error.description} />

        <InputFileCustom />
        <button
          type="submit"
          className="w-fit my-2 px-2 py-1 text-white bg-blue-600"
        >
          {form.id ? "Editar" : "Guardar"}
        </button>
        <Toaster />
      </form>
    </>
  );
}
