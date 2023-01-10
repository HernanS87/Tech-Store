import { useAdminContext } from "../../context";
import InputAlert from "./InputAlert";

export default function InputQuantityCustom() {
  const { quantity, setQuantity } = useAdminContext();
  return (
    <div className="flex-col">
      <div className={` flex items-center ${quantity && quantity != 0 && ""}`}>
        <label htmlFor="quantity" className="">
          Cantidad
        </label>
        <div className="ml-4 mr border-2 border-slate-500 bg-white rounded">
          <button
            type="button"
            id="decrease"
            className="pl-1 text-blue-500 font-semibold"
            onClick={() => {
              if (quantity > 1) setQuantity(parseInt(quantity) - 1);
            }}
          >
            -
          </button>
          <input
            type="number"
            min={1}
            pattern="[0-9]+"
            id="quantity"
            value={quantity}
            className="w-14 h-7 px-1 text-center outline-none"
            required
            onChange={(e) => {
              if (e.target.value < 0) {
                setQuantity(e.target.value * -1);
              } else {
                setQuantity(e.target.value);
              }
            }}
          />
          <button
            type="button"
            id="increase"
            className="pr-2px text-blue-500 font-semibold "
            onClick={() => {
              if (quantity) setQuantity(parseInt(quantity) + 1);
            }}
          >
            +
          </button>
        </div>
      </div>
      <InputAlert state={quantity} />
    </div>
  );
}
