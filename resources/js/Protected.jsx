import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import MD5 from "crypto-js/md5";

function Protected(props) {
    let navigate = useNavigate();

    const {Component} = props;
    useEffect(() => {
        let email = localStorage.getItem("email")
        let token = localStorage.getItem("token")
        console.log();
        if (token != MD5(email).toString()) {
            navigate('/login')
        }

    })
    return (

        <Component/>

    )
}

export default Protected;
