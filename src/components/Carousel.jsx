import { useEffect, useState } from "react";

export default function Carousel(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(props.images[0]);
  const [loaded, setLoaded] = useState(false);
  const [translate, setTranslate] = useState("-translate-x-full");
  const [showBtns, setShowBtns] = useState(false);
  const [stopAutoPlay, setStopAutoPlay] = useState(false);
  let touchStartX = 0;
  let touchEndX = 0;

  // useEffect(() => {
  //   // props.autoPlay || !props.showButtons
  //   if (!stopAutoPlay) {
  //     const interval = setInterval(() => {
  //       next();
  //     }, 5000);
  //     return () => clearInterval(interval);
  //   }
  // });

  const selectNewImage = (index, images, next = true) => {
    setLoaded(false);
    setTimeout(() => {
      const condition = next ? index < images.length - 1 : index > 0;
      const nextIndex = next
        ? condition
          ? index + 1
          : 0
        : condition
        ? index - 1
        : images.length - 1;
      setSelectedImage(images[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 500);
  };

  const previous = () => {
    console.log("se ejecuta previous");
    setTranslate("translate-x-full");
    selectNewImage(selectedIndex, props.images, false);
  };

  const next = () => {
    console.log("se ejecuta next");
    setTranslate("-translate-x-full");
    selectNewImage(selectedIndex, props.images);
  };

  const checkMove = () => {
    if (touchStartX - touchEndX > 10) {
      next();
    } else if (touchStartX - touchEndX < -10) {
      previous();
    } else {
      console.log("no deslizó el dedo");
    }
    touchStartX = 0;
    touchEndX = 0;
  };
  return (
    <div className="flex justify-center relative">
      {props.images.length > 1 && <span className="bg-gray-100 font-medium text-sm rounded-r-full rounded-l-full px-2 absolute left-0 z-10">{`${selectedIndex + 1 } / ${props.images.length}` }</span>}
      {props.images.length > 1 ? (
        <div
          className="flex-col relative"
          onMouseOver={() => {
            setStopAutoPlay(true);
            setShowBtns(true);
          }}
          onMouseLeave={() => {
            setStopAutoPlay(false);
            setShowBtns(false);
          }}
          onTouchStart={(e) => {
            touchStartX = e.changedTouches[0].screenX;
          }}
          onTouchEnd={(e) => {
            touchEndX = e.changedTouches[0].screenX;
            checkMove();
          }}
        >
          <img
            src={selectedImage}
            className={`w-72 h-96 object-contain ${
              !loaded ? `transition duration-500 opacity-0 ${translate}` : ""
            }`}
            onLoad={() => setLoaded(true)}
          />
          <div>
            {true ? (
              <>
                <button
                  className={`text-blue-600 ${
                    showBtns ? "inline" : "hidden"
                  } pr-1 pb-1 font-medium text-xl bg-white btn-pos rounded-r-full`}
                  onClick={previous}
                >
                  {"<"}
                </button>
                <button
                  className={`text-blue-600 ${
                    showBtns ? "inline" : "hidden"
                  } pl-1 pb-1 font-medium text-xl bg-white btn-pos right-0 rounded-l-full`}
                  onClick={next}
                >
                  {">"}
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-col relative">
          <img
            src={selectedImage}
            alt=""
            className="w-72 h-96 object-contain"
          />
        </div>
      )}
    </div>
  );
}
