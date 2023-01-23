import { useAdminContext } from "../../context";
import InputAlert from "./InputAlert";

export default function InputQuantityCustom() {
  const { form, setForm, handleChange, error } = useAdminContext();
  return (
    <div className="flex-col">
      <div className="flex items-center">
        <label htmlFor="quantity" className="">
          Cantidad
        </label>
        <div className="ml-4 border-2 border-slate-500 bg-white rounded">
          <button
            type="button"
            id="decrease"
            className="pl-1 text-blue-500 font-semibold"
            onClick={() => {
              if (form.quantity > 1)
                setForm({
                  ...form,
                  quantity: parseInt(form.quantity) - 1,
                });
            }}
          >
            -
          </button>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={form.quantity}
            className="w-14 h-7 px-1 text-center outline-none"
            onChange={(e) => {
              let { value } = e.target;
              if (value < 0 && value != "") {
                e.target.value = parseInt(value) * -1;
              }
              handleChange(e);
            }}
          />
          <button
            type="button"
            id="increase"
            className="pr-2px text-blue-500 font-semibold "
            onClick={() => {
              if (form.quantity > 0)
                setForm({
                  ...form,
                  quantity: parseInt(form.quantity) + 1,
                });
            }}
          >
            +
          </button>
        </div>
      </div>
      <InputAlert msg={error.quantity} />
    </div>
  );
}
