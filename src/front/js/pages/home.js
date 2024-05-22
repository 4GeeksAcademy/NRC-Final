import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Inicio } from "./inicio";
import { Servicios } from "./servicios";

import "../../styles/home.css";






export const Home = () => {

	return (
		<div className="fondo-home">
			<Inicio />
			<hr className="linea-home" />
			<div id="servicios">
				<Servicios />
			</div>
		</div>
	);
};
