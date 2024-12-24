import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card.jsx";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "@/context/CartContext.jsx";
import AlertAddToCart from "@/pages/Cart/AddToCartAlert.jsx";
import {Link} from "react-router";


const Product = () => {
    const [products, setProducts] = useState([]); // State to hold fetched products
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling
    const {addToCart} = useContext(CartContext);
    const [alert, setAlert] = useState(null); // State for success alert

    const handleAddToCart = (product) => {
        console.log("Product being added:", product);
        addToCart(product);
        setAlert(`Added "${product.name}" to cart!`); // Set success message
        setTimeout(() => setAlert(null), 3000); // Hide alert after 3 seconds
    };

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/products/");
                console.log("API Response:", response.data); // Debugging API response
                setProducts(response.data.products || []); // Access the 'products' key
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Render loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <p className="text-lg font-semibold">Loading products...</p>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="flex items-center justify-center w-full h-screen">
                <p className="text-lg font-semibold text-red-500">{error}</p>
            </div>
        );
    }

    // Render product grid
    return (
        <div>{
            alert && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
                    <AlertAddToCart/>
                </div>
            )
        }
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-6 justify-items-center">
            {products.map((product) => (
                <div
                    key={product._id} // Ensure unique key
                    className="relative m-1 flex w-52  flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                    <Link to={`/product/${product._id}`}
                        className="relative mx-2 mt-2 flex h-40 overflow-hidden rounded-lg bg-gray-200 dark:bg-black"

                    >
                        <img
                            className="object-cover object-center"
                            src={`http://localhost:3000/${product.image || "placeholder.jpg"}`}
                            alt={product.name || "Product Image"}
                            onError={(e) => (e.target.src = "/images/placeholder.jpg")}
                        />
                        <Badge
                            variant="outline"
                            className="absolute top-0 left-0 m-1 rounded-full bg-black px-1.5 text-center text-xs font-medium text-white"
                        >
                            {product.category?.name || "Uncategorized"}
                        </Badge>
                    </Link>
                    <div className="mt-3 px-3 pb-3">
                        <CardTitle>
                            <h5 className="text-lg tracking-tight text-slate-900 dark:text-white">
                                {product.name || "No Name"}
                            </h5>
                        </CardTitle>
                        <div className="mt-1 mb-3 flex items-center justify-between">
                            <p>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              ${product.price || "N/A"}
            </span>
                            </p>
                        </div>
                        <button onClick={() => handleAddToCart(product)}
                            className="flex items-center justify-center rounded-md bg-slate-900 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-gray-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-1 h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            Add to cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
};

export default Product;