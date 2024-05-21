import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Inicio } from "./inicio";
import { Servicios } from "./servicios";

import "../../styles/home.css";






export const Home = () => {

	return (
		<div>
			<Inicio />
			<Servicios />
		</div>
	);
};
