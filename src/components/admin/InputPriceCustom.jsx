import { useAdminContext } from "../../context";
import InputAlert from "./InputAlert";

export default function InputPriceCustom() {
  const { priceOk, setPriceOk, prodToEdit } = useAdminContext();

  return (
    <div className="flex-col">
      <div className="flex items-center">
        <label htmlFor="price">Precio</label>
        <input
          type="number"
          id="price"
          placeholder="$ARS"
          className="border-2 my-2 ml-4 w-24 h-8 px-1 text-center outline-none border-slate-500 rounded"
          defaultValue={prodToEdit ? prodToEdit.price : ""}
          required
          onChange={(e) => {
            console.log(e.target.value);
            if (e.target.value == "" || e.target.value == 0) {
              setPriceOk(false);
            } else {
              setPriceOk(true);
            }
          }}
        />
      </div>
      <InputAlert state={priceOk} />
    </div>
  );
}
