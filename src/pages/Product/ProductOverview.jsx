import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { ProductContext } from "@/context/ProductContext.jsx";
import AlertAddToCart from "@/pages/Cart/AddToCartAlert.jsx";

export default function ProductOverview() {
    const { id } = useParams(); // Get product ID from URL
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(CartContext);
    const { fetchProductById } = useContext(ProductContext); // Context methods
    const [alert, setAlert] = useState(null); // Alert state

    const handleAddToCart = () => {
        addToCart({ ...product, quantity }); // Pass quantity from state
        setAlert(`Added "${product.name}" to the cart!`); // Show alert
        setTimeout(() => setAlert(null), 3000); // Hide alert after 3 seconds
    };

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const product = await fetchProductById(id);
                setProduct(product);
            } catch (err) {
                console.error("Error loading product:", err.message);
            }
        };

        loadProduct();
    }, [id, fetchProductById]);

    if (!product) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12">

                {/* Alert */}
                {alert && (
                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2  px-4 py-2 rounded shadow">
                        <AlertAddToCart/>
                    </div>
                )}

                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                        src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/${
                            product.image
                        }`}
                        alt={product.name || "Product Image"}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.src = "/placeholder.svg")}
                    />
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-light mb-2">{product.name}</h1>
                        <p className="text-2xl font-light mb-6">${product.price || "N/A"}</p>
                        <p className="text-2xl font-light mb-6">#{product.category?.name || "Uncategorized"}</p>
                        <Separator className="mb-6" />
                        <p className="text-gray-600 mb-6 leading-relaxed dark:text-white">
                            {product.description || "Product description"}
                        </p>
                        <div className="flex items-center mb-6">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="mx-4 text-xl">{quantity}</span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setQuantity((prev) => prev + 1)}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <Button
                        className="w-full"
                        size="lg"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </Button>

                    <Separator className="my-6" />

                    {/* Product Features */}
                    <div>
                        <h2 className="text-xl font-light mb-4">Features</h2>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>Adjustable lumbar support</li>
                            <li>Breathable mesh back</li>
                            <li>Customizable armrests</li>
                            <li>360-degree swivel base</li>
                            <li>Weight capacity: 300 lbs</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}