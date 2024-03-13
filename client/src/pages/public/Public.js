import React from "react";
import {Header, Navigation, Top_Header, Footer} from '../../components' 
import {Outlet} from "react-router-dom";
const Public = () => {
    return (
        <div className = 'w-full flex flex-col items-center'>
                <Top_Header />
                <Header />
                <Navigation />
                <div className="w-main">
                    <Outlet />
                </div>
                <Footer />
        </div>
    )
}

export default Public