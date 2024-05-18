import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, useNavigate, BrowserRouter, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { jwtDecode } from 'jwt-decode';

export const Login = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [user, setUser] = useState({
		"email": "",
		"password": ""
	})

    const handleLogin = async () => {
		await actions.login(user);
        const access_token = JSON.parse(localStorage.getItem("token"))
        const access_key = access_token.access_token
        const decodedToken = jwtDecode(access_key);
        const userRol = decodedToken.rol;
        if (userRol===`admin`) {
            navigate(`/demo`); //Cambiar por la direccion de la vista admin
        } else {
            navigate(`/user`);
        } 
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await handleLogin()
		} catch (error) {
			console.log('error', error)
		}
		}

	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="inputEmail1" className="form-label">Email</label>
                    <input type="email" 
                    className="form-control" 
                    id="inputEmail1" 
                    aria-describedby="emailHelp" 
                    onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword1" className="form-label">Password</label>
                    <input type="password" 
                    className="form-control" 
                    id="inputPassword1" 
                    onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleLogin}>Submit</button>
            </form>
			<Link to='/admin'>
				<button className="btn btn-primary">Admin</button>
			</Link>
		</div>
	);
};
