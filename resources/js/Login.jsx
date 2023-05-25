import React, {useEffect, useState} from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import MD5 from "crypto-js/md5";
import '../css/Login.css'


import {Link, useNavigate} from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        let email = localStorage.getItem("email")
        let token = localStorage.getItem("token")
        console.log();
        if (token != MD5(email).toString()) {
            navigate('/login')
        } else {
            navigate('/')
        }
    }, [])

    async function loginUser(e) {
        let crendential = {email, password}
        e.preventDefault();
        await fetch("http://127.0.0.1:8000/api/user-login", {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(crendential)
        }).then(r => r.json()).then((result) => {
            $('#email-error').hide()
            $('#password-error').hide()
            if (result.success) {
                localStorage.setItem("email", result.email)
                localStorage.setItem("token", MD5(result.email).toString())
                navigate('/');
            }
            if (result.emailError) {
                if ($('#textEmail').val() == "") {
                    $('#email-error').show().text("* Please enter email.")
                } else {
                    $('#email-error').show().text("* Invalid Email.")
                }
            }
            if (result.passwordError) {
                if ($('#textPassword').val() == "") {
                    $('#password-error').show().text("* Please enter password.")
                } else {
                    $('#password-error').show().text("* Invalid Password.")
                }
            }
        });
    }

    return (
        <>
            {/* <Sidebar /> */}
            {/* <!-- Content Wrapper --> */}
            <div className="container">
                {/*<div id="content-wrapper" className="d-flex flex-column">*/}

                {/* <!-- Main Content --> */}
                {/*<div id="content">*/}

                {/*<Header/>*/}
                {/* <!-- Begin Page Content --> */}
                <div className="container-fluid">
                    <div className='login-main-div'>
                        <div className="row justify-content-center">
                            <div className="col-xl-10 col-lg-12 col-md-9">
                                <div className="card o-hidden border-0 shadow-lg my-5">
                                    <div className="card-body p-0">
                                        {/* <!-- Nested Row within Card Body --> */}
                                        <div className="row">
                                            <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                            <div className="col-lg-6 login-page">
                                                <div className="p-5">
                                                    <div className="text-center">
                                                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                                    </div>
                                                    <form className="user">
                                                        <div className="form-group">
                                                            <input type="email"
                                                                   className="form-control form-control-user"
                                                                   onChange={(e) => setEmail(e.target.value)}
                                                                   id="textEmail"
                                                                   aria-describedby="emailHelp"
                                                                   placeholder="Enter Email Address..."/>
                                                            <span className="text-danger"
                                                                  id="email-error" style={{display: "none"}}></span>
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="password"
                                                                   className="form-control form-control-user"
                                                                   onChange={(e) => setPassword(e.target.value)}
                                                                   id="textPassword"
                                                                   placeholder="Password"/>
                                                            <span className="text-danger"
                                                                  id="password-error" style={{display: "none"}}></span>
                                                        </div>
                                                        <button type='button' onClick={loginUser}
                                                                className="btn btn-primary btn-user btn-block">
                                                            Login
                                                        </button>
                                                    </form>
                                                    <hr/>
                                                    <div className="text-center">
                                                        <Link className="small" to="/check-email">Forgot
                                                            Password?</Link>
                                                    </div>
                                                    <div className="text-center">
                                                        <Link className="small" to="/signup">Create an
                                                            Account!</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/*</div>*/}
            {/*</div>*/}
        </>
    )
}
