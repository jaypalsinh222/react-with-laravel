import React, {useEffect, useState} from "react";
import Sidebar from "@/Sidebar";
import Header from "@/Header";
import {Link, useNavigate} from "react-router-dom";
import MD5 from "crypto-js/md5";

export default function CheckEmail() {

    const [email, setEmail] = useState("");

    let navigate = useNavigate();
    useEffect(() => {
        let email = localStorage.getItem("email")
        let token = localStorage.getItem("token")
        console.log();
        if (token !== MD5(email).toString()) {
            if (window.location.pathname === '/login') {
                navigate('/login')
            }
            if (window.location.pathname === '/signup') {
                navigate('/signup')
            }
            if (window.location.pathname === '/check-email') {
                navigate('/check-email')
            }
        } else {
            navigate('/')
        }
    }, [])

    async function checkEmail(e) {
        e.preventDefault();
        await fetch("http://127.0.0.1:8000/api/check-email", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(email)
        }).then(r => r.json()).then((result) => {
            if (result.msg === "success") {
                $('#email-error').show().removeClass('text-danger').addClass('text-success').text('Mail sent to your email ! Please click on the given link in the email.')
                localStorage.setItem("email", email)
                localStorage.setItem("tokenEmail", MD5("test_email").toString())
            } else {
                $('#email-error').show().removeClass('text-success').addClass('text-danger').text('Enter registered email.')
            }
        });
    }

    // async function forgotPassword(e) {
    //     e.preventDefault();
    //     await fetch("http://127.0.0.1:8000/api/forgot-password", {
    //         method: "post",
    //         headers: {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(email)
    //     }).then(r => r.json()).then((result) => {
    //         $('#email-error').hide()
    //
    //
    //         // if (result.success) {
    //         //     localStorage.setItem("email", result.email)
    //         //     localStorage.setItem("token", MD5(result.email).toString())
    //         //     navigate('/');
    //         // }
    //         // if (result.emailError) {
    //         //     if ($('#textEmail').val() == "") {
    //         //         $('#email-error').show().text("* Please enter email.")
    //         //     } else {
    //         //         $('#email-error').show().text("* Invalid Email.")
    //         //     }
    //         // }
    //         // if (result.passwordError) {
    //         //     if ($('#textPassword').val() == "") {
    //         //         $('#password-error').show().text("* Please enter password.")
    //         //     } else {
    //         //         $('#password-error').show().text("* Invalid Password.")
    //         //     }
    //         // }
    //     });
    // }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">

                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-2">Forgot Your
                                                    Password?</h1>
                                                <p className="mb-4">We get it, stuff happens. Just enter
                                                    your email address below
                                                    and we'll send you a link to reset your password!</p>
                                            </div>
                                            <form className="user">
                                                <div className="form-group">
                                                    <input type="email"
                                                           className="form-control form-control-user"
                                                           id="textEmail"
                                                           onChange={(e) => setEmail(e.target.value)}
                                                           aria-describedby="emailHelp"
                                                           placeholder="Enter Email Address..."/>
                                                    <span
                                                        id="email-error" style={{display: "none"}}>
                                                    </span>
                                                </div>
                                                <button type="button" onClick={checkEmail}
                                                        className="btn btn-primary btn-user btn-block">
                                                    Reset Password
                                                </button>
                                            </form>
                                            <hr/>
                                            <div className="text-center">
                                                <Link className="small" to="/signup">Create an
                                                    Account!</Link>
                                            </div>
                                            <div className="text-center">
                                                <Link className="small" to="/login">Already have an
                                                    account? Login!</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}
