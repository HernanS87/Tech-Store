import { useState } from "react";
import { useAdminContext } from "../../context";
import InputAlert from "./InputAlert";

export default function InputOfferCustom() {
  const { offer, setOffer, prodToEdit } = useAdminContext();
  const [percentOk, setPercentOk] = useState(true);

  return (
    <div className="flex items-start">
      <p className="mt-1">Añadir Oferta:</p>
      <div>
        <div className="ml-5 h-12">
          <input
            type="radio"
            name="offer"
            id="yes"
            checked={offer ? true : false}
            onChange={() => setOffer(true)}
          />
          <label htmlFor="yes">Si</label>
          <input
            type="number"
            id="percent"
            min={1}
            max={100}
            defaultValue={prodToEdit ? prodToEdit.percent : ""}
            placeholder="10%"
            disabled={!offer}
            className="border-2 ml-4 mt-2px w-12 py-2px px-1 text-center outline-none border-slate-500 rounded"
            required
            onChange={(e) => {
              console.log(e.target.value);
              if (
                e.target.value == "" ||
                e.target.value == 0 ||
                e.target.value > 100
              ) {
                setPercentOk(false);
              } else {
                setPercentOk(true);
              }
            }}
          />
          {offer && (
            <span className="ml-2 bg-white p-1 rounded text-xs font-medium text-blue-700">
              Indica el porcentaje de descuento
            </span>
          )}
          <InputAlert
            state={percentOk}
            msg={"¡Debes escribir un numero entre 1 y 100!"}
          />
        </div>
        <div className="ml-5">
          <input
            type="radio"
            name="offer"
            id="no"
            checked={!offer ? true : false}
            onChange={(e) => {
              e.target.form.percent.value = "";
              setOffer(false);
              setPercentOk(true);
            }}
          />
          <label htmlFor="no">No</label>
        </div>
      </div>
    </div>
  );
}
