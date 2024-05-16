import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import styles from "../../styles/navbar.module.css";

export const Navbar = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	const [isLogged, setIsLogged] = useState(false);

	const logout = () => {
		actions.logout();
	}

	useEffect(() => {
		if (store.token && store.token.length > 0) {
			setIsLogged(true); 
		  } else {
			setIsLogged(false);
		  }
	  }, [store.token]);

	return (
		<nav className="navbar navbar-dark navbar-expand-md bg-dark">
			<div className="container-fluid">
				<div>
					<span className="navbar-brand ms-2 h2" onClick={() => navigate('/')}>Logo</span>
				</div>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div className="container text-center">
						<div className="row justify-content-center">
							<div className="col-2">
								<span className="navbar-brand h4" onClick={() => navigate('/')}>Inicio</span>
							</div>
							<div className="col-2">
								<span className="navbar-brand h4" onClick={() => navigate('/')}>Servicios</span>
							</div>
							<div className="col-2">
								<span className="navbar-brand h4" onClick={() => navigate('/contact')}>Contacto</span>
							</div>
							<div className="col-2">
								<span className="navbar-brand h4" onClick={() => navigate('/')}>Sobre mi</span>
							</div>
						</div>
					</div>
				</div>
				<div>
					{isLogged ? (
							<button className={`btn me-2 px-4 ${styles.loginButton}`} onClick={() => logout}>Logout</button>
					) : (
						<>
							<Link to="/registro">
								<button className={`btn me-3 ${styles.registerButton}`}>Registro</button>
							</Link>
							<Link to="/login">
								<button className={`btn me-2 px-4 ${styles.loginButton}`}>Login</button>
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};
