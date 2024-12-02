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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999999]">
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
      <div className="w-full flex flex-row justify-between items-center">
        <p className="text-gray-500 text-xs mt-2">
          {media ? (
            <>
              {convertBytes(media?.stats.used || 0)} z celkových{" "}
              {convertBytes(media?.stats.max || 0)}, procentuálně jsi využil{" "}
              {Math.round(
                ((media?.stats.used || 0) / (media?.stats.max || 0)) * 100
              )}
              % místa.
            </>
          ) : (
            "Načítám..."
          )}
        </p>
        <div className=" flex flex-row items-end justify-end gap-4">
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-4">
        {/* Loading placeholders */}
        {loading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-lg animate-pulse h-64 w-full"
            ></div>
          ))}

        {/* No media message */}
        {media && media.media.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No media uploaded yet.
          </div>
        )}

        {/* Media items */}
        {media &&
          media.media.length > 0 &&
          media.media.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg overflow-hidden transform transition-all hover:scale-105 cursor-pointer"
            >
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
              </div>
            </div>
          ))}
      </div>
    </MainLayout>
  );
}
