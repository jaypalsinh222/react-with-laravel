import React, {useEffect} from "react";
import Sidebar from "@/Sidebar";
import Header from "@/Header";
import {useNavigate} from "react-router-dom";

export default function Logout() {
    let navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        navigate('/login');
    })
    return (
        <>

        </>
    )
}
