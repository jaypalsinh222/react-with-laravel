//import React from "react";
//import {createRoot} from 'react-dom/client'
//import 'bootstrap/dist/css/bootstrap.min.css';
//
//import {Header} from './Header';
//import {BrowserRouter, Route, Routes, Router} from 'react-router-dom'
//
//function App() {
//    return (
//        <>
//            <BrowserRouter>
//                <Header/>
//            </BrowserRouter>
//        </>
//    );
//}
//
//export default App;

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Login";
import {createRoot} from 'react-dom/client'
import Dashboard from "./Dashboard";
import React, {useEffect} from 'react'
//import Header from "./Header";
//import Footer from "./Footer";
//import Scroll from "./Scroll";
//import Sidebar from "./Sidebar";
import SignUp from "./SignUp";
import Protected from "./Protected";
import Logout from "./Logout";
import ForgotPassword from "./ForgotPassword";
import MD5 from "crypto-js/md5";
import CheckEmail from "./CheckEmail";
import CreateMatch from "@/CreateMatch";

// import Test from "@/Test";

function App() {

    return (
        <div id="page-top">

            {/* <!-- Page Wrapper --> */}
            <div id="wrapper">
                {<BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Protected Component={Dashboard}/>}/>
                        <Route path="/forgot-password" element={<ForgotPassword/>}/>
                        <Route path="/check-email" element={<CheckEmail/>}/>
                        <Route path="/logout" element={<Protected Component={Logout}/>}/>
                        <Route path="/create-match" element={<Protected Component={CreateMatch}/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                    </Routes>

                </BrowserRouter>}

                {/* <!-- End of Content Wrapper --> */}

            </div>
            {/* <!-- End of Page Wrapper --> */}

            {/* <!-- Scroll to Top Button--> */}
            {/*<Scroll/>*/}

        </div>

    );
}

export default App;

if (document.getElementById('root')) {
    createRoot(document.getElementById('root')).render(
        <div className="">
            <App/>
        </div>
    )
}
