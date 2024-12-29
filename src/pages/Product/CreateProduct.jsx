import { useState, useContext } from "react";
import { ProductContext } from "@/context/ProductContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {CategoryContext} from "@/context/CategoryContext.jsx";
import {useNavigate} from "react-router";


const CreateProduct = () => {
    const { addProduct } = useContext(ProductContext);
    const { categories } = useContext(CategoryContext);
    const navigate = useNavigate(); // For navigation after update

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    // Handle image input and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("image", image);
    
        setLoading(true);
        try {
            const createdProduct = await addProduct(formData);
            console.log("Created product:", createdProduct); // Debug log
            alert("Product created successfully!");
            navigate("/productlist"); // Redirect to Product List
        } catch (err) {
            console.error("Error adding product:", err.message);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Create Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                {/* Product Name */}
                <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter product name"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter product description"
                        required
                    />
                </div>

                {/* Price */}
                <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter product price"
                        required
                    />
                </div>

                {/* Category Dropdown */}
                <div>
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={(value) => setCategory(value)} required>
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

                {/* Image Upload */}
                <div>
                    <Label htmlFor="image">Product Image</Label>
                    <Input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                    {preview && (
                        <div className="mt-2">
                            <p className="text-sm font-semibold text-gray-700 mb-2">Image Preview</p>
                            <div className="relative flex justify-center items-center w-48 h-48 bg-gray-50 rounded-lg overflow-hidden mx-auto">
                                <img
                                    src={preview}
                                    alt="Image Preview"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Creating..." : "Create Product"}
                </Button>
            </form>
        </div>
    );
};

export default CreateProduct;