import Footer from "../components/Footer/Footer.jsx";
import Header from "../components/Header/Header.jsx";
import {Outlet} from "react-router";


const MainLayout = () => {
    console.log("MainLayout");
    return (

        <div>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default MainLayout;