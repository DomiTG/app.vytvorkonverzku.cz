import MainLayout from "@/components/layouts/MainLayout";
import { useUser } from "@/contexts/UserContext";
import IProduct from "@/interfaces/IProduct";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductsListPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (!user) return;
    const fetchProducts = async () => {
      try {
        const res = await user.api.getProducts();
        setProducts(res.products);
        setLoading(false);
      } catch (err) {}
    };
    fetchProducts();
  }, []);
  return (
    <MainLayout>
      <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-2 uppercase tracking-wider">
        Produkty
      </h2>
      <p className="text-gray-500">
        Zde můžete spravovat produkty, které se zobrazují na vašem webu.
      </p>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-6">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Jméno
              </th>
              <th scope="col" className="px-6 py-3">
                Typ
              </th>
              <th scope="col" className="px-6 py-3">
                Podkategorie
              </th>
              <th scope="col" className="px-6 py-3">
                Akce
              </th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, i) => (
                <tr className="bg-white border-b" key={i}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {product.name}
                  </th>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {product.product_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {product.product_subtype}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/products/${product.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Editovat
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <div className="flex flex-row justify-end gap-4 items-center mt-4">
        <Link
          className="px-4 py-2 text-xs font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all uppercase"
          href="/products/create"
        >
          Vytvořit produkt
        </Link>
      </div>
    </MainLayout>
  );
}
