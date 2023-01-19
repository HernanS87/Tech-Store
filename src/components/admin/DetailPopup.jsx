import { useAdminContext } from "../../context";
import Carousel from "../Carousel";

function UserPopup() {
  const { setDetailPopup, detailPopup } = useAdminContext();
  return (
    <div
      className="modal-container w-full h-full fixed top-0 left-0 z-10 flex justify-center items-center bg-black bg-opacity-60 "
      onClick={() => {
        setDetailPopup(false);
      }}
    >
      <div
        className="modal max-w-2xl p-4 flex flex-wrap bg-white rounded-md "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Carousel images={detailPopup.img} />
        <div className="ml-2 pt-2 flex items-center max-w-xs">
          <div className="pl-2">
            <h1 className="mb-2 font-medium text-xl capitalize">
              {detailPopup.name}
            </h1>
            <div className="flex flex-grow mb-3">
              {!detailPopup.offer ? (
                <span className="text-3xl ">
                  $ {new Intl.NumberFormat("es-AR").format(detailPopup.price)}
                </span>
              ) : (
                <div>
                  <p className="text-xs text-gray-600 line-through">
                    $ {new Intl.NumberFormat("es-AR").format(detailPopup.price)}
                  </p>
                  <div className="flex items-center">
                    <p className="text-3xl">
                      ${" "}
                      {new Intl.NumberFormat("es-AR").format(
                        Math.floor(
                          detailPopup.price * (1 - detailPopup.percent / 100)
                        )
                      )}
                    </p>
                    <span className="text-sm pt-1 font-medium text-green-500 ml-2">
                      {detailPopup.percent}% OFF
                    </span>
                  </div>
                </div>
              )}
            </div>
            <h3 className="mb-3">
              Cantidad:{" "}
              <span className="font-medium">
                {detailPopup.quantity > 1
                  ? `${detailPopup.quantity} unidades`
                  : "1 unidad"}
              </span>{" "}
            </h3>
            {detailPopup.description && (
              <div>
                <p className="text-lg font-medium mb-2">Descripción</p>
                <p className="text-gray-700">{detailPopup.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPopup;
