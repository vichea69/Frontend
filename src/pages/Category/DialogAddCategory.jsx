import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea.jsx";
import { CategoryContext } from "@/context/CategoryContext.jsx";

export function DialogDemo({ onAddSuccess }) {
    const { addCategory } = useContext(CategoryContext); // Access the context
    const [name, setName] = useState(""); // State for name input
    const [description, setDescription] = useState(""); // State for description input
    const [errors, setErrors] = useState({}); // State for validation errors
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [isOpen, setIsOpen] = useState(false); // State for dialog visibility

    // Validation Function
    const validateForm = () => {
        const validationErrors = {};

        if (!name.trim()) {
            validationErrors.name = "Name is required";
        }
        if (!description.trim()) {
            validationErrors.description = "Description is required";
        } else if (description.length < 2) {
            validationErrors.description = "Description must be at least 10 characters";
        }

        setErrors(validationErrors);

        // Return true if no errors
        return Object.keys(validationErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!validateForm()) return; // Exit if validation fails

        setLoading(true);

        try {
            await addCategory({ name, description });
            if (onAddSuccess) onAddSuccess(); // Refresh categories
            setName("");
            setDescription("");
            setIsOpen(false);
        } catch (err) {
            console.error("Error adding category:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add Category</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                </DialogHeader>
                <form className="grid gap-5 py-4" onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <div className="col-span-3">
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Type your name here."
                                id="name"
                                className="w-full"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                    </div>

                    {/* Description Field */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-left">
                            Description
                        </Label>
                        <div className="col-span-3">
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Type your description here."
                                id="description"
                                className="w-full"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm">{errors.description}</p>
                            )}
                        </div>
                    </div>

                    {/* Dialog Footer */}
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}