import { useContext } from "react";
import { ProductContext } from "@/context/ProductContext.jsx";
import { Link } from "react-router";
import { AlertDeleteProduct } from "@/pages/Product/AlertDeleteProduct.jsx";
import { useEffect } from "react";

const ProductListManagement = () => {
  const { products, deleteProduct, fetchProducts } = useContext(ProductContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex mb-6">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl dark:text-white">
            All Products
          </h3>
          <p className="text-gray-600 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <Link
            to="/productform"
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add Product
          </Link>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block mt-6 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Category</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                  <img
                    src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/${product.image
                      }`}
                    className="w-20 h-20 border rounded object-cover"
                    alt={product.name || "Product Image"}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/placeholder.jpg";
                    }}
                  />
                  <div>
                    <span className="block text-gray-700 text-sm font-medium dark:text-white">
                      {product.name || "product name"}
                    </span>
                    <span className="block text-gray-700 text-xs dark:text-white">
                      {product.description || "product description"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                  {product.price || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                  {product.category?.name || "Uncategorized"}
                </td>
                <td className="text-right px-6 whitespace-nowrap">
                  <Link
                    to={"/editproduct/" + product._id || ""}
                    className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    Edit
                  </Link>
                  <AlertDeleteProduct
                    onConfirm={() => handleDelete(product._id)}
                    message="Are you sure you want to delete this product?"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4">
        {products.map((product) => (
          <div key={product._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-3">
            <div className="flex items-center space-x-4">
              <img
                src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/${product.image}`}
                className="w-24 h-24 rounded-lg object-cover"
                alt={product.name || "Product Image"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/placeholder.jpg";
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {product.name || "product name"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {product.description || "product description"}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center border-t pt-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Price: ${product.price || "N/A"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Category: {product.category?.name || "Uncategorized"}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Link
                  to={"/editproduct/" + product._id}
                  className="py-2 px-3 text-sm font-medium text-indigo-600 hover:text-indigo-500 duration-150"
                >
                  Edit
                </Link>
                <AlertDeleteProduct
                  onConfirm={() => handleDelete(product._id)}
                  message="Are you sure you want to delete this product?"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListManagement;