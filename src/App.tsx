import React, { useMemo } from "react";
import "./styles.css";
import Typewriter from "./Typewriter";

/**
 * let url = "";
 * const list = document.querySelectorAll('code[data-class^="23"] div[data-tag$="93"] span[data-id*="21"] i.char');
 * list.values().forEach(v => a += v.getAttribute('value'));
 * return url;
 */

const url =
  "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/617072";

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [wordToRender, setWordToRender] = React.useState("");
  React.useEffect(() => {
    const getFlag = async () => {
      try {
        const response = await fetch(url);
        // Assuming happy path for the sake of the problem.
        // Assume response is a ReadableStream with one chunk
        // Assume the one chunk is a Uint8Array decoded into a string
        const reader = response.body?.getReader();
        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (value) {
              setWordToRender(new TextDecoder().decode(value));
            }
            if (done) {
              break;
            }
          }
        }
      } catch {
        console.error("An error occurred");
      }
      setIsLoading(false);
    };

    getFlag();
  });

  const wordAsArray = useMemo(() => wordToRender.split(""), [wordToRender]);

  return (
    <div className="App">
      {isLoading ? <p>Loading...</p> : <Typewriter word={wordAsArray} />}
    </div>
  );
}
