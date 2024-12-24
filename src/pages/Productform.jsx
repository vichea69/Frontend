import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Productform = () => {
    // State for form inputs
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState(""); // Category ID
    const [image, setImage] = useState(null); // File input
    const [preview, setPreview] = useState(null); // Image preview URL

    // State for categories fetched from backend
    const [categories, setCategories] = useState([]);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/categories");
                setCategories(res.data.categories); // Array of categories
            } catch (err) {
                console.error("Error fetching categories:", err.message);
            }
        };
        fetchCategories();
    }, []);

    // Handle file input and generate preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);

            // Generate image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare form data for submission
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category); // Category ObjectId
        formData.append("image", image); // File upload

        try {
            const res = await axios.post("http://localhost:3000/api/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Product created successfully!");
            console.log(res.data);
            setPreview(null); // Reset image preview
        } catch (err) {
            console.error("Error creating product:", err.message);
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
                    {/* Image Preview */}
                    {preview && (
                        <div className="mt-2">
                            <p className="text-sm font-semibold text-gray-700 mb-2">Image Preview</p>
                            <div
                                className="relative flex justify-center items-center w-48 h-48 bg-gray-50 rounded-lg overflow-hidden mx-auto">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Image Preview"
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center text-gray-500">
                                        No image selected
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full">
                    Create Product
                </Button>
            </form>
        </div>
    );
};

export default Productform;