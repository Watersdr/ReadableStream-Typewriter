import React, { useEffect } from "react";

const Typewriter: React.FC<{ word: string[] }> = ({ word }) => {
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    let intervalId: number;
    const stepCounter = () => {
      intervalId = setInterval(() => {
        setIndex((v) => {
          if (v >= word.length) {
            clearInterval(intervalId);
            return v;
          }
          return v + 1;
        });
      }, 500);
    };
    stepCounter();
    return () => clearInterval(intervalId);
  }, []);
  return (
    <p>
      {word.slice(0, index)}
      {index < word.length ? <span>_</span> : <span>🍑</span>}
    </p>
  );
};

export default Typewriter;
