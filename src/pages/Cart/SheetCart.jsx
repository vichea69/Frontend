import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext.jsx";
import { Badge } from "@/components/ui/badge";

export function SheetDemo() {
    const { cartItems, removeFromCart } = useContext(CartContext);
    console.log("Cart Items in SheetDemo:", cartItems);
    // Calculate subtotal
    const subtotal = cartItems.reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
    );
    // Calculate total item count
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="relative" aria-label="Open notifications">
                    <ShoppingCart size={16} strokeWidth={2} aria-hidden="true" />
                    {totalItems > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full text-xs"
                        >
                            {totalItems}
                        </Badge>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Shopping cart</SheetTitle>
                </SheetHeader>
                <div className="mt-8">
                    {cartItems.length > 0 ? (
                        <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {cartItems.map((item) => (
                                    <li key={item._id } className="flex py-6">
                                        <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                alt={item.name || "Product Image"}
                                                src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/${
                                                    item.image
                                                }`}
                                                onError={(e) => (e.target.src = "/images/placeholder.jpg")}
                                                className="size-full object-cover"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                                    <h3>
                                                        <a>{item.name}</a>
                                                    </h3>
                                                    <p className="ml-4">${item.price}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-white">
                                                    {item.category?.name || "Uncategorized"}
                                                </p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm dark:text-white">
                                                <p className="text-gray-500 dark:text-white">Qty {item.quantity}</p>
                                                <div className="flex">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFromCart(item._id || item.name)}
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">Your cart is empty.</p>
                    )}
                </div>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6 w-full mt-6">
                    <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                        <p>Subtotal</p>
                        <p>${subtotal.toFixed(2)}</p>
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Checkout</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}