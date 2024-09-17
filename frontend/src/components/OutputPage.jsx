import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Gradient } from "./design/Services";

const OutputPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const { text, annotated_image } = location.state || { text: null, annotated_image: null };
  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      alert("Text copied to clipboard!");
    }
  };
  const handleDownload = () => {
    if (text) {
      const element = document.createElement("a");
      const file = new Blob([text], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "ocr_output.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">OCR Output</h1>
      <div className="rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 p-4 mb-4 min-h-[200px] whitespace-pre-wrap">
        {text
          ? text.map((t, i) => (
              <div key={i}>
                <p>Text: {t[1]}</p>
                <p>Confidence: {t[2]}</p>
              </div>
            ))
          : "No text available. Please process a file from the input page."}
      </div>
      {imageUrl && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Annotated Image:</h2>
          <img
            src={imageUrl}
            alt="Annotated OCR Result"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      )}
      <Gradient />
    </div>
  );
};

export default OutputPage;

