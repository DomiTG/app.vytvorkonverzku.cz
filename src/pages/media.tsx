import FilterButtonComponent from "@/components/filters/FilterButtonComponent";
import MainLayout from "@/components/layouts/MainLayout";
import MediaComponent from "@/components/media/MediaComponent";
import { useUser } from "@/contexts/UserContext";
import IFilterType from "@/interfaces/IFilterType";
import IMedia from "@/interfaces/IMedia";
import { useEffect, useState } from "react";

export default function MediaPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [media, setMedia] = useState<IMedia | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 18;

  const [uploadModal, setUploadModal] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const filterTypes: IFilterType[] = [
    {
      name: "NAME",
      byName: "Podle názvu (A-Z)",
      filter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      name: "NAME2",
      byName: "Podle názvu (Z-A)",
      filter: (a, b) => b.name.localeCompare(a.name),
    },
    {
      name: "SIZE",
      byName: "Podle velikosti (vzestupně)",
      filter: (a, b) => a.size - b.size,
    },
    {
      name: "SIZE2",
      byName: "Podle velikosti (sestupně)",
      filter: (a, b) => b.size - a.size,
    },
    {
      name: "TYPE",
      byName: "Podle typu",
      filter: (a, b) => a.type.localeCompare(b.type),
    },
    {
      name: "DATE",
      byName: "Podle data (nejnovější)",
      filter: (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    },
    {
      name: "DATE2",
      byName: "Podle data (nejstarší)",
      filter: (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    },
  ];

  const [filter, setFilter] = useState<IFilterType | null>(filterTypes[0]);

  const handleUpload = async () => {
    if (!user || !uploadFile || uploading) return;

    setUploading(true);
    try {
      const res = await user.api.uploadImage(uploadFile);
      console.log(res);
      setUploading(false);
      // Optionally, refresh media after upload
      fetchMedia();
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const fetchMedia = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await user.api.getMedia();
      setMedia(res);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
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

  // Determine the current media items to display based on the current page
  const currentMedia = media
    ? media.media
        .slice() // Make a shallow copy to avoid mutating the original array
        .sort(filter ? filter.filter : undefined)
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  const totalPages = media ? Math.ceil(media.media.length / itemsPerPage) : 1;

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
                  setUploadFile(files[0]);
                }}
              />
              <button className="btn" onClick={() => setUploadModal(false)}>
                Zrušit
              </button>
              <button className="btn" onClick={handleUpload}>
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
                ((media?.stats.used || 0) / (media?.stats.max || 0)) * 100,
              )}
              % místa.
            </>
          ) : (
            "Načítám..."
          )}
        </p>
        <div className=" flex flex-row items-end justify-end gap-4">
          <button
            className="text-xs font-semibold bg-gray-200 text-gray-700 px-4 py-2 rounded-md uppercase hover:bg-gray-300  cursor-pointer disabled:opacity-50"
            onClick={() => setUploadModal(true)}
          >
            Přidat média
          </button>
          <FilterButtonComponent
            filterTypes={filterTypes}
            setFilter={setFilter}
            filter={filter || filterTypes[0]}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-4">
        {loading &&
          Array.from({ length: itemsPerPage }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-lg animate-pulse h-64 w-full"
            ></div>
          ))}

        {currentMedia.length === 0 && !loading && (
          <div className="col-span-full text-center text-gray-500">
            No media uploaded yet.
          </div>
        )}

        {currentMedia.map((item, i) => (
          <MediaComponent key={i} item={item} />
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-4 items-center">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md uppercase hover:bg-gray-300 disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Předchozí
        </button>
        <span className="text-gray-500">
          Strana {currentPage} z {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md uppercase hover:bg-gray-300 disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Další
        </button>
      </div>
    </MainLayout>
  );
}
