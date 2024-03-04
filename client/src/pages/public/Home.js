import React from "react";
import {BestSeller, Sidebar, Banner, DealDaily} from '../../components' 
const Home = () => {
    return (
        <>
            <div className="w-main flex">
            <div className="flex flex-col gap-5 w-[25%] flex-auto">   
                <Sidebar />
                <DealDaily></DealDaily>
            </div>
            <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto ">   
                <Banner />
                <BestSeller />
            </div>
        </div>
        <div className="w-full h-[500px]">

        </div>
        </>
    )
}

export default Home