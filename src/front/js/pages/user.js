import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import styles from "../../styles/user.module.css";
import Calendly from "../component/calendar";
import { Link } from "react-router-dom";

export const User = () => {
    const { store, actions } = useContext(Context);

    const [userData, setUserData] = useState({
        nombre: "",
        apellidos: "",
        edad: "",
        altura: "",
        sexo: "",
        lesion: "",
        informacionAdicional: ""
    });

    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
        console.log(userData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${process.env.BACKEND_URL}/userProfile/1`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Datos del usuario guardados con éxito');
                } else {
                    console.error('Error al guardar los datos del usuario');
                }
            })
            .catch(error => {
                console.error('Error de red:', error);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className="text-center mt-5">
                        <form onSubmit={handleSubmit}>
                            <div className={styles.card}>
                                <div className={styles.titulo}>
                                    <h2>DATOS PERSONALES</h2>
                                    <div className={styles.datos}>
                                        <input type="text" className={styles.input} placeholder="Nombre:" name="nombre" value={userData.nombre} onChange={handleInputChange} />
                                        <input type="text" className={styles.input} placeholder="Apellidos:" name="apellidos" value={userData.apellidos} onChange={handleInputChange} />
                                        <input type="number" className={styles.input} placeholder="Edad:" name="edad" value={userData.edad} onChange={handleInputChange} />
                                        <input type="number" className={styles.input} placeholder="Altura:" name="altura" value={userData.altura} onChange={handleInputChange} />
                                        <input type="text" className={styles.input} placeholder="Sexo:" name="sexo" value={userData.sexo} onChange={handleInputChange} />
                                        <input type="boolean" className={styles.input} placeholder="Lesión:" name="lesion" value={userData.lesion} onChange={handleInputChange} />
                                        <input type="text" className={styles.input} placeholder="Información Adicional:" name="informacionAdicional" value={userData.informacionAdicional} onChange={handleInputChange} />
                                        <button type="submit" className={styles.guardar}>Guardar</button>
                                    </div>
                                    <div className={styles.card1}>
                                        <div className={styles.titulo1}>
                                            <h2> NUTRICIÓN Y ENTRENO </h2>
                                            <img src="https://cdn.euroinnova.edu.es/img/subidasEditor/funciones%20(55)-1617716195.webp" alt="Descripción de la imagen" className={styles.imagen} />
                                            <div className={styles.targeta}>
                                                <div className="card" style={{ backgroundColor: "#131a30" }}>
                                                    <div className="card-header">
                                                        NRC
                                                    </div>
                                                    <div className="card-body">
                                                        <h5 className="card-title">Empieza tu cambio</h5>
                                                        <p className="card-text"></p>
                                                        <Link to="/ejercicio" className={`btn btn ${styles.boton}`}>Dieta/Entreno</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="text-center mt-5">
                        <div className={styles.calendario}>
                            <Calendly />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;
