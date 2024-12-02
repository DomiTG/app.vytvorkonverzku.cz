import MainLayout from "@/components/layouts/MainLayout";
import { useUser } from "@/contexts/UserContext";
import IMedia from "@/interfaces/IMedia";
import { useEffect, useState } from "react";

export default function MediaPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [media, setMedia] = useState<IMedia>();

  const [uploadModal, setUploadModal] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleUpload = async () => {
    console.log("ahoj");
    if (!user) return;
    if (!uploadFile) return;
    console.log("upload");
    if (uploading) return;
    console.log("next");
    setUploading(false);
    try {
      const res = await user.api.uploadImage(uploadFile);
      console.log(res);
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    const fetchMedia = async () => {
      setLoading(true);
      try {
        const res = await user.api.getMedia();
        setMedia(res);
        setLoading(false);
        console.log(res);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

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

  return (
    <MainLayout>
      {uploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-96">
            <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-2 uppercase tracking-wider">
              Nahrát média
            </h2>
            <p className="text-gray-500">
              Nahraj své obrázky, videa a další média.
            </p>
            <div className="flex flex-col gap-4 mt-4">
              <input
                type="file"
                onChange={(e) => {
                  const files = e.target.files;
                  if (!files) return;
                  if (!files[0]) return;

                  setUploadFile(files[0]);
                }}
              />
              <button className="btn" onClick={handleUpload}>
                Zrušit
              </button>
              <button className="btn" onClick={() => setUploading(true)}>
                Nahrát
              </button>
            </div>
          </div>
        </div>
      )}
      <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-2 uppercase tracking-wider">
        Media
      </h2>
      <p className="text-gray-500">
        Zde najdeš všechny své obrázky, videa a další média.
      </p>
      <div className="w-full flex flex-row items-end justify-end gap-4">
        {/* glass button */}
        <button
          className="text-xs font-semibold bg-gray-200 text-gray-700 px-4 py-2 rounded-md uppercase hover:bg-gray-300  cursor-pointer disabled:opacity-50"
          onClick={() => setUploadModal(true)}
        >
          Přidat média
        </button>
        <button className="text-xs font-semibold bg-gray-200 text-gray-700 px-4 py-2 rounded-md uppercase hover:bg-gray-300  cursor-pointer disabled:opacity-50">
          Filtrovat média
        </button>
      </div>
      <p className="text-gray-500 text-xs mt-2">
        {media ? (
          <>
            {convertBytes(media?.stats.used || 0)} z celkových{" "}
            {convertBytes(media?.stats.max || 0)}, procentuálně jsi využil{" "}
            {Math.round(
              ((media?.stats.used || 0) / (media?.stats.max || 0)) * 100,
            )}
            % místa.
          </>
        ) : (
          "Načítám..."
        )}
      </p>
      <div className="flex flex-row gap-8 mt-4 justify-center flex-wrap">
        {loading &&
          Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 w-48 h-48 animate-pulse bg-gray-200"
            ></div>
          ))}
        {media && media.media.length === 0 && (
          <div className="w-full text-center text-gray-500">
            Zatím jsi neuploadnul žádná média.
          </div>
        )}
        {media &&
          media.media.length > 0 &&
          media.media.map((image, i) => {
            return (
              <div
                key={image.id}
                className="border border-gray-200 w-48 h-64 overflow-hidden rounded-lg flex flex-col"
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-48 object-cover"
                  crossOrigin="anonymous"
                />
                <div className="bg-white w-full items-center justify-center text-center p-2">
                  <div className="flex flex-row justify-between px-2 pt-2 items-center">
                    <p className="text-xs font-semibold truncate">
                      {image.name}
                    </p>
                    <span className="text-gray-500 text-xs">
                      {image.type === "IMAGE"
                        ? "Obrázek"
                        : image.type === "VIDEO"
                          ? "Video"
                          : "Neznámý"}
                    </span>
                  </div>
                  <span className="text-gray-500 text-xs">
                    {new Date(image.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </MainLayout>
  );
}
