import React from "react";
import { IPOST } from "../types/types";


interface ISlides {
  image:string[]
}

const Slideshow:React.FC<ISlides> = ({image}) => {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef<any |null>(null);
  let colors:string[] = []
  function fotos() {
    image.forEach(o=>colors.push(`http://localhost:3003/${o}`))
}
fotos()
const delay = 4000;
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {colors.map(( imgg, index) => (
          <div
            className="slide"
            key={index}
            style={{background:`url(${imgg}) center center no-repeat`, 
            backgroundSize: 'cover',
          }}
          ></div>
        ))}
      </div>

      <div className="slideshowDots">
        {colors.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slideshow