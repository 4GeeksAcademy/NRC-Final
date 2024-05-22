import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { jwtDecode } from 'jwt-decode';

import styles from "../../styles/navbar.module.css";
import logo from "../../img/logo1.png"
import PerfilModal from "./perfilModal";

export const Navbar = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	const [isLogged, setIsLogged] = useState(false);

	const logout = () => {
		actions.logout();
		setIsLogged(false);
		navigate(`/login`);
	}

	const isAuthenticated = (token) => {
		return token && token.access_token && token.access_token.trim() !== '';
	};

	let userRole = null;
	if (isLogged) {
		const tokenString = localStorage.getItem("token");
		if (tokenString) {
			try {
				const access_token = JSON.parse(tokenString);
				const decodedToken = jwtDecode(access_token.access_token);
				userRole = decodedToken.rol;
			} catch (error) {
				console.error('Error al decodificar el token:', error);
				logout();
				navigate('/login');
			}
		}
	}


	useEffect(() => {
		if (!isAuthenticated(store.token)) {
			setIsLogged(false);
		} else {
			setIsLogged(true);
		}
	}, [store.token]);

	return (
		<nav className="navbar navbar-dark navbar-expand-md bg-dark">
			<div className="container-fluid">
				<div>
					<a className="navbar-brand ms-2 h2" onClick={() => navigate('/')}>
						<img src={logo} alt="NRC Logo" style={{ width: '50px', height: 'auto' }} />
					</a>
				</div>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div className="container text-center">
						<div className="navbar-nav mb-2 mb-lg-0 row justify-content-center">
							{isLogged && userRole === 'admin' ? (
								<>
									<div className="col-2">
										<span className="navbar-brand h4 btn" onClick={() => navigate('/admin')}>Inicio</span>
									</div>
									<div className="col-2">
										<span className="navbar-brand h4 btn" onClick={() => navigate('/contact')}>Contacto</span>
									</div>
									<div className="col-2">
										<span className="navbar-brand h4 btn" onClick={() => navigate('/')}>Sobre mi</span>
									</div>
								</>
							) : isLogged ? (
								<>
									<div className="col-2">
										<span className="navbar-brand h4 btn" onClick={() => navigate('/user')}>Inicio</span>
									</div>
									<div className="col-2">
										<span className="navbar-brand h4 btn" onClick={() => navigate('/')}>Servicios</span>
									</div>
									<div className="col-2">
										<span className="navbar-brand h4 btn" onClick={() => navigate('/contact')}>Contacto</span>
									</div>
								</>
							) : (
								<>
									<div className="col-2">
										<span className="navbar-brand h4 btn" onClick={() => navigate('/')}>Inicio</span>
									</div>
									<div className="col-2">
										<span className="navbar-brand h4 btn" onClick={() => navigate('/')}>Servicios</span>
									</div>
									<div className="col-2">
										<span className="navbar-brand h4 btn" onClick={() => navigate('/contact')}>Contacto</span>
									</div>
									<div className="col-2">
										<span className="navbar-brand h4 btn" onClick={() => navigate('/sobremi')}>Sobre mi</span>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
				<div>
					{isLogged ? (
						<>
							{userRole === 'admin' && (
								<Link to="/inbox">
									<button className={`btn me-2 px-4 ${styles.registerButton}`}>Inbox</button>
								</Link>
							)}
							{userRole === 'user' && (
								<>
								<button className={`btn me-2 px-4 ${styles.registerButton}`} data-bs-toggle="modal" data-bs-target="#perfilModal">Perfil</button>
								<PerfilModal userRole={userRole} />
								</>
							)}
							<button className={`btn me-2 px-4 ${styles.loginButton}`} onClick={logout}>Logout</button>
						</>
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
