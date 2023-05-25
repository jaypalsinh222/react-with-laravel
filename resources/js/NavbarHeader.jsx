import React from "react";
import {Nav, Navbar} from 'react-bootstrap'
import {Link} from 'react-router-dom';

export function NavbarHeader() {
    return (
        <div>
            <Navbar bg="light" variant="dark">
                <Nav className="mr-auto nav-bar-wrapper">
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/add">Add Product</Link>
                    <Link to="/student">Student</Link>
                </Nav>
            </Navbar>
        </div>
    );
}