import { useContext } from "react";
import { CategoryContext } from "@/context/CategoryContext.jsx";
import {DialogDemo} from "@/pages/Category/DialogAddCategory.jsx";
import {AlertDialogDemo} from "@/pages/Category/AlertDeleteCategory.jsx";
import {DialogUpdateCategory} from "@/pages/Category/DialogUpdateCategory.jsx";

const Category = () => {
    const { categories, loading , deleteCategory , updateCategory, fetchCategories } = useContext(CategoryContext);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (categories.length === 0) {
        return <p className=" text-primary dark:text-white justify-center items-center text-center text-2xl">
            No categories available.
              </p>;
    }
    //call delete function
    const handleDelete = (id) => {
        deleteCategory(id);
    };

    //call update function
    const handleUpdate = async (id, updatedData) => {
        await updateCategory(id, updatedData); // Call context update function
    };


    //call Add category function


    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 ">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl dark:text-white">
                        List of Categories
                    </h3>
                </div>
                <div className="mt-3 md:mt-0">
                    <DialogDemo onAddSuccess={fetchCategories}/>
                </div>
            </div>
            <div className="mt-16 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-[100%] table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b dark:bg-cyan-300dark:text-red-500">
                    <tr>
                        <th className="py-3 px-6">Name</th>
                        <th className="py-3 px-6">Description</th>
                        <th className="py-3 px-6">Action</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                    {categories.map((category) => (
                        <tr key={category._id}>
                            <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                                {category?.name || "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                                {category?.description || "N/A"}
                            </td>
                            <td className="  space-x-5">
                                <DialogUpdateCategory
                                    category={category}
                                    onUpdate={handleUpdate}
                                />
                                <AlertDialogDemo
                                    onConfirm={() => handleDelete(category._id)}
                                    message={`Are you sure you want to delete the category "${category.name}"?`}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Category;