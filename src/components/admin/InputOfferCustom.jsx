import { useAdminContext } from "../../context";
import InputAlert from "./InputAlert";

export default function InputOfferCustom() {
  const { form, setForm, handleChange, error } = useAdminContext();

  return (
    <div className="flex items-start">
      <p className="mt-1">Añadir Oferta:</p>
      <div>
        <div className="ml-5 h-12 flex items-center">
          <input
            type="radio"
            name="offer"
            id="yes"
            checked={form.offer}
            onChange={() =>
              setForm({
                ...form,
                offer: true,
              })
            }
          />
          <label htmlFor="yes">Si</label>
          <div
            className={`ml-4 px-1 border-2 border-slate-500 bg-white rounded ${
              !form.offer && "opacity-30 text-gray-500"
            }`}
          >
            <input
              type="number"
              id="percent"
              name="percent"
              value={form.percent}
              placeholder="10"
              disabled={!form.offer}
              className="w-8 h-7 pr-1 text-right outline-none"
              required
              onChange={handleChange}
            />
            <span className="cursor-default">%</span>
          </div>
          <InputAlert msg={error.percent} />
        </div>
        <div className="ml-5">
          <input
            type="radio"
            name="offer"
            id="no"
            checked={!form.offer}
            onChange={() => {
              setForm({
                ...form,
                offer: false,
                percent: "",
              });
            }}
          />
          <label htmlFor="no">No</label>
        </div>
      </div>
    </div>
  );
}
