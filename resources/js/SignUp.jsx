import React, {useEffect, useState} from 'react'
import Header from './Header'
import {Link, useNavigate} from 'react-router-dom'
import MD5 from "crypto-js/md5";
import '../css/Signup.css'

export default function SignUp() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    function signupUser() {
        let userData = {fname, lname, email, password};

        fetch("http://127.0.0.1:8000/api/signup-user", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        }).then(r => r.json()).then((result) => {
            if (result.emailNotFound) {

                if ($('#textEmail').val() == "") {
                    $('#email-error').show().text("* Please enter email.")
                } else {
                    $('#email-error').show().text("* Email already exists.")
                }
            }

            if (result.msg === "success") {
                $('#registration-msg').show().text('Registered Successfully !');
                setInterval(function () {
                    navigate('/login');
                }, 3000);
            }

        });
    }

    return (
        <>
            {/* <Sidebar /> */}
            <div className="container">
                {/* <!-- Content Wrapper --> */}
                {/*<div id="content-wrapper" className="d-flex flex-column">*/}

                {/* <!-- Main Content --> */}
                {/*<div id="content">*/}
                {/*<Header/>*/}
                {/* <!-- Begin Page Content --> */}
                {/*<div className="container-fluid">*/}
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        {/* <!-- Nested Row within Card Body --> */}
                        <div className="row">
                            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                            <div className="col-lg-7 signup-page">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                    </div>
                                    <form className="user">
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input type="text"
                                                       className="form-control form-control-user"
                                                       value={fname}
                                                       onChange={(e) => setFname(e.target.value)}
                                                       id="exampleFirstName" placeholder="First Name"/>
                                            </div>
                                            <div className="col-sm-6">
                                                <input type="text"
                                                       className="form-control form-control-user"
                                                       value={lname}
                                                       onChange={(e) => setLname(e.target.value)}
                                                       id="exampleLastName" placeholder="Last Name"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-user"
                                                   value={email} onChange={(e) => setEmail(e.target.value)}
                                                   id="textEmail" placeholder="Email Address"/>
                                            <span className="text-danger"
                                                  id="email-error" style={{display: "none"}}></span>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input type="password"
                                                       className="form-control form-control-user"
                                                       value={password}
                                                       onChange={(e) => setPassword(e.target.value)}
                                                       id="exampleInputPassword" placeholder="Password"/>
                                            </div>
                                            {/*<div className="col-sm-6">*/}
                                            {/*    <input type="password" className="form-control form-control-user"*/}
                                            {/*           id="exampleRepeatPassword"*/}
                                            {/*           placeholder="Repeat Password"/>*/}
                                            {/*</div>*/}
                                        </div>
                                        <button type="button" onClick={signupUser}
                                                className="btn btn-primary btn-user btn-block">
                                            Register Account
                                        </button>
                                        <span className="text-success"
                                              id="registration-msg" style={{display: "none"}}>
                                        </span>
                                    </form>
                                    <hr/>
                                    <div className="text-center">
                                        <Link className="small" to="/check-email">Forgot
                                            Password?</Link>
                                    </div>
                                    <div className="text-center">
                                        <Link className="small" to="/login">Already have an account?
                                            Login!</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*</div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}
