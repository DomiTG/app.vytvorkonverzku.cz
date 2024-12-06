import React, { useState } from "react";
import IEditorComponent from "../classes/IEditorComponent";
import { CiText } from "react-icons/ci";

export default class TextComponent extends IEditorComponent {
  constructor() {
    super("text", "text", "text", CiText);
  }

  render() {
    return <EditableText />;
  }

  clone() {
    return new TextComponent();
  }
}

const EditableText = () => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const toggleStyle = (style: string) => {
    document.execCommand(style);
  };

  return (
    <div
      style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}
    >
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={() => {
            setIsBold(!isBold);
            toggleStyle("bold");
          }}
          style={{
            fontWeight: isBold ? "bold" : "normal",
            marginRight: "5px",
          }}
        >
          Bold
        </button>
        <button
          onClick={() => {
            setIsItalic(!isItalic);
            toggleStyle("italic");
          }}
          style={{
            fontStyle: isItalic ? "italic" : "normal",
            marginRight: "5px",
          }}
        >
          Italic
        </button>
        <button
          onClick={() => {
            setIsUnderline(!isUnderline);
            toggleStyle("underline");
          }}
          style={{
            textDecoration: isUnderline ? "underline" : "none",
          }}
        >
          Underline
        </button>
      </div>
      <div
        contentEditable
        suppressContentEditableWarning
        style={{
          minHeight: "100px",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
          cursor: "text",
        }}
      >
        Editable text here...
      </div>
    </div>
  );
};
