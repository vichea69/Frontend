import {Route, Routes} from "react-router";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import NotFound from "../pages/NotFound.jsx";
import Contact from "../pages/Contact.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import Register from "@/components/Form/Register.jsx";
import Login from "@/components/Form/Login.jsx";
import Category from "@/pages/Category/Category.jsx";
import CategoryProvider from "@/context/CategoryContext.jsx";
import Productform from "@/pages/Productform.jsx";
import ProductListManagement from "@/pages/Product/ProductListManagement.jsx";
import ProductProvider from "@/context/ProductContext.jsx";
import UpdateProduct from "@/pages/Product/UpdateProduct.jsx";
import AuthProvider from "@/context/AuthContext.jsx";
import {CartProvider} from "@/context/CartContext.jsx";
import Product from "@/pages/Dashbord/Product.jsx";
import ProductOverview from "@/pages/Product/ProductOverview.jsx";
import ProtectedRoute from "@/routes/ProtectedRoute.jsx";

const AppRoutes = () => {
    return (
            <AuthProvider>
            <ProductProvider>
            <CategoryProvider>
                <CartProvider>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route index element={<Home/>}></Route>
                    <Route path={'/about'} element={<About/>}></Route>
                    <Route path={'/contact'} element={<Contact/>}></Route>
                    <Route path={'/login'} element={<Login/>}></Route>
                    <Route path={'/register'} element={<Register/>}></Route>
                    <Route path={'*'} element={<NotFound/>}></Route>
                    <Route path={'/product'} element={<Product/>}></Route>
                    <Route path={'/product/:id/'} element={<ProductOverview/>}></Route>
                    {/* Protected routes */}
                <Route element={<ProtectedRoute/>}>
                    <Route path={'/productlist'} element={<ProductListManagement/>}></Route>
                    <Route path={'/category'} element={<Category/>}></Route>
                    <Route path={'/productform'} element={<Productform/>}></Route>
                    <Route path={'/editproduct/:id'} element={<UpdateProduct/>}></Route>
                </Route>
                </Route>
            </Routes>
                </CartProvider>
            </CategoryProvider>
            </ProductProvider>
            </AuthProvider>

    );
};

export default AppRoutes;