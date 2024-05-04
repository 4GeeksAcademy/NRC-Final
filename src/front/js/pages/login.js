import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [user, setUser] = useState({
		"email": "",
		"password": ""
	})

    const login = async () => {
		try {
			const response = await fetch(`${process.env.BACKEND_URL}/login`, {
				method: "POST",
				body: JSON.stringify(user),
				headers: { "Content-Type": "application/json" }
			});
			const userToken = await response.json();
			localStorage.setItem("access", JSON.stringify(userToken));
			/*authentication()*/
		} catch (error) {
			console.error(error);
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await login()
		} catch (error) {
			console.log('error', error)
		}
		}

	/*const authentication = async () => {
		const token = JSON.parse(localStorage.getItem("access"))
		const access_key = token.access_token
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/login`, {
				method: "GET",
				headers: { "Authorization": `Bearer ${access_key}` }
			});
			const data = await response.json();
			const authorizerUser = data.logged_in_as;
			navigate(`/private`)
        } catch (error) {
			console.error(error);
		}
    }*/

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
                <button type="submit" className="btn btn-primary" onClick={login}>Submit</button>
            </form>
		</div>
	);
};
