import { useAdminContext } from "../../context";
import ErrorMsg from "../ErrorMsg";

export default function InputPriceCustom() {
  const { form, handleChange, error } = useAdminContext();

  return (
    <div className="flex-col">
      <div className="flex items-center">
        <label htmlFor="price">Precio</label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="$ARS"
          className="border-2 ml-4 w-24 h-8 px-1 text-center outline-none border-slate-500 rounded"
          value={form.price}
          onChange={handleChange}
        />
      </div>
      <ErrorMsg msg={error.price} />
    </div>
  );
}
