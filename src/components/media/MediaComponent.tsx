import IMediaAttachment from "@/interfaces/IMediaAttachment";
import { useState } from "react";

export default function MediaComponent({ item }: { item: IMediaAttachment }) {
  const [show, setShow] = useState<boolean>(false);
  const [text, setText] = useState<string>("Copy the link");

  const convertBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} Bytes`;
    const units = ["KB", "MB", "GB", "TB", "PB"];
    let unitIndex = -1;
    let size = bytes;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  const copyLink = () => {
    navigator.clipboard.writeText(item.url);
    setText("Link copied!");
    setTimeout(() => {
      setText("Copy the link");
    }, 2000);
  };

  return (
    <div
      key={item.id}
      className="bg-white rounded-lg overflow-hidden transform transition-all hover:scale-105 cursor-pointer relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {show && (
        <div
          className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 h-full flex justify-center items-center"
          onClick={copyLink}
        >
          <p className="text-center font-semibold uppercase tracking-widest">
            {text}
          </p>
        </div>
      )}
      {item.type === "VIDEO" && (
        <video
          src={item.url}
          className="w-full h-40 object-cover"
          crossOrigin="anonymous"
          controls
        />
      )}
      {item.type === "IMAGE" && (
        <img
          src={item.url}
          alt={item.name}
          className="w-full h-40 object-cover"
          crossOrigin="anonymous"
          loading="lazy"
        />
      )}
      <div className="p-3">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-sm font-semibold text-gray-800 truncate">
            {item.name}
          </h3>
          <span className="text-xs text-gray-500">
            {item.type === "IMAGE"
              ? "Image"
              : item.type === "VIDEO"
                ? "Video"
                : "Unknown"}
          </span>
        </div>
        <p className="text-xs text-gray-500">
          {new Date(item.created_at).toLocaleString()}
        </p>
        <p className="text-xs text-gray-500">{convertBytes(item.size)}</p>
      </div>
    </div>
  );
}
