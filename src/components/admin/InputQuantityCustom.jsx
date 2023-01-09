import { useAdminContext } from "../../context";

export default function InputQuantityCustom() {
  const { quantity, setQuantity } = useAdminContext();
  return (
    <>
      <div
        className={`mt-2 flex items-center ${
          quantity && quantity != 0 && "mb-4"
        }`}
      >
        <label htmlFor="quantity" className="">
          Cantidad
        </label>
        <div className="mx-4 border-2 border-slate-500 bg-white rounded">
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
      {(!quantity || quantity == 0) && (
        <p className="text-xs font-medium text-red-600">
          ¡Debes seleccionar una cantidad mayor o igual a 1!
        </p>
      )}
    </>
  );
}
