import React, {useEffect, useState} from "react";
import Sidebar from "@/Sidebar";
import Header from "@/Header";
import {Link, useNavigate} from "react-router-dom";
import MD5 from "crypto-js/md5";

export default function ForgotPassword() {

    const [password, setPassword] = useState("");
    const [CPassword, setCPassword] = useState("");
    let navigator = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("tokenEmail")
        // console.log(token !== MD5("test_email"))
        if (token !== MD5("test_email").toString()) {
            navigator('/signup');
        }
    }, [])


    async function forgotPassword(e) {

        let email = localStorage.getItem('email');

        let passwords = {password, CPassword, email}
        e.preventDefault();
        await fetch("http://127.0.0.1:8000/api/forgot-password", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(passwords)
        }).then(r => r.json()).then((result) => {

            if (result.success) {
                $('#password-error').show().removeClass('text-danger').addClass('text-success').text('Password reset successfully !');
                localStorage.clear();
                setInterval(function () {
                    navigator('/login');
                }, 3000);
            }

            if (result.error) {
                if ($('#textPassword').val() === "") {
                    $('#password-error').show().text("* Please Enter Password")
                } else {
                    $('#password-error').show().text("* Password mismatched")
                }
            }

        });
    }

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
                                                    <input type="password"
                                                           className="form-control form-control-user"
                                                           id="textPassword"
                                                           onChange={(e) => setPassword(e.target.value)}
                                                           aria-describedby="emailHelp"
                                                           placeholder="Enter Password..."/>
                                                    <span className="text-danger"
                                                          id="password-error" style={{display: "none"}}>
                                                    </span>
                                                </div>
                                                <div className="form-group">
                                                    <input type="password"
                                                           className="form-control form-control-user"
                                                           id="textCPassword"
                                                           onChange={(e) => setCPassword(e.target.value)}
                                                           aria-describedby="emailHelp"
                                                           placeholder="Enter Confirm Password..."/>
                                                </div>
                                                <button type="button" onClick={forgotPassword}
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
