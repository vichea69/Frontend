import {useState, useEffect, useContext} from "react";
import { useParams, useNavigate } from "react-router";
import { ProductContext } from "@/context/ProductContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CategoryContext } from "@/context/CategoryContext.jsx";

const UpdateProduct = () => {
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate(); // For navigation after update
    const { updateProduct, fetchProductById } = useContext(ProductContext); // Context methods
    const { categories } = useContext(CategoryContext); // Categories from context

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    // Load product details
    useEffect(() => {
        const loadProduct = async () => {
            try {
                const product = await fetchProductById(id);
                console.log("Fetched product:", product); // Debug API response
                setName(product.name || "");
                setDescription(product.description || "");
                setPrice(product.price || "");
                setCategory(product.category || "");
                setPreview(
                    product.image
                        ? `${import.meta.env.VITE_API_URL.replace('/api', '')}/${product.image}`
                        : "/images/placeholder.jpg" // Fallback image
                );
            } catch (err) {
                console.error("Error loading product:", err.message);
            }
        };

        loadProduct();
    }, [id, fetchProductById]);

    // Handle image input and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        if (image) formData.append("image", image);

        setLoading(true);
        try {
            await updateProduct(id, formData);
            alert("Product updated successfully!");
            navigate("/productlist");
        } catch (err) {
            console.error("Error updating product:", err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter product name"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter product description"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter product price"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={(value) => setCategory(value)} value={category}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cat) => (
                                <SelectItem key={cat._id} value={cat._id}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="image">Product Image</Label>
                    <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                    {preview && (
                        <div className="mt-2">
                            <div className="w-48 h-48">
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    )}
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Updating..." : "Save Changes"}
                </Button>
            </form>
        </div>
    );
};

export default UpdateProduct;