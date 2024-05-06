import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import styles from "../.././styles/user.module.css";


export const User = () => {
	const { store, actions } = useContext(Context);

    const [userData, setUserData] = useState({
        
        nombre:"",
        apellidos:"",
        edad:"",
        altura:"",
        sexo:"",
        lesion:"",
        informacionAdicional:""

    });

	return (
		<div className="text-center mt-5">
			<div className={styles.card}>
            <div className={styles.titulo}>
            <h2>DATOS PERSONALES</h2>
            <div className={styles.datos}>
             <p>Nombre:</p>
             <p>Apellidos:</p>
             <p>Edad:</p>
             <p>Altura:</p>
             <p>Sexo:</p>
             <p>Lesión:</p>
             <p>Información Adicional</p>
        </div>
        </div>

        <div className={styles.card1}>
        <div className={styles.datos1}>
            <h2>VISTA DE CONTENIDO</h2>
             
        </div>
        </div>
        </div>

        

		</div>
	);
};

export default User