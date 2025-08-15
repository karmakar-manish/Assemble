import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout()
{

    return <div className="min-h-screen bg-[#111827]">
        <Navbar/>
        
        {/* this will render the children components  */}
        <Outlet key={location.pathname}/>
    </div>
}