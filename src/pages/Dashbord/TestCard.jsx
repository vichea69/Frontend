"use client";
import {useEffect, useState} from "react";
import axios from "axios";
import {BackgroundGradient} from "@/components/ui/background-gradient";
import {Badge} from "@/components/ui/badge";

export function TestCard() {
    const [products, setProducts] = useState([]); // State to hold fetched products
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/products/");
                console.log("API Response:", response.data); // Debugging API response
                setProducts(response.data.products); // Access the 'products' key
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="m-10">
            {/* Title and View All */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-black dark:text-white">
                    Featured Products
                </h1>
                <button className="text-sm font-medium text-blue-500 hover:underline">
                    View All
                </button>
            </div>

            {/* Loading State */}
            {loading ? (
                <p className="text-center text-gray-500">Loading products...</p>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
                    {products.map((product) => (
                        <BackgroundGradient
                            key={product._id}
                            className="rounded-[22px] bg-white dark:bg-zinc-900 shadow-md overflow-hidden"
                        >
                            {/* Image Container */}
                            <div className="relative w-full h-48">
                                <img
                                    src={`http://localhost:3000/${product.image}`}
                                    alt={product.name}
                                    className="w-full h-full object-fill"
                                />

                                {/* Category Badge */}
                                <div className="absolute top-2 left-2 z-10">
                                    <Badge variant="outline" className="text-xs bg-black/50 text-white">
                                        {product.category?.name || "Uncategorized"}
                                    </Badge>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-4 sm:p-6">
                                <p className="text-sm sm:text-base text-black mb-2 dark:text-neutral-200">
                                    {product.name}
                                </p>
                                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                                    {product.description}
                                </p>

                                {/* Price and Button */}
                                <button
                                    className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                                    <span>Buy now</span>
                                    <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-red-500">
        ${product.price}
      </span>
                                </button>
                            </div>
                        </BackgroundGradient>
                    ))}
                </div>
            )}
        </div>
    );
}