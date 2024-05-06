import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<Link to="/user">
					<span className="navbar-brand mb-0 h1">User</span>
				</Link>

				<div className="ml-auto">
					<Link to="/contact">
						<button className="btn btn-primary">Contacto</button>
					</Link>
					<Link to="/login">
						<button className="btn btn-primary">Login</button>
					</Link>
					<Link to="/registro">
						<button className="btn btn-primary">Registro</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
