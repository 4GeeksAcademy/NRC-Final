import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import styles from "../../styles/user.module.css";
import Calendly from "../component/calendar";

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
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://ejemplo.com/api/usuarios', {
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
                                        <input type="text" className={styles.input} placeholder="Nombre:" value={userData.nombre} onChange={handleInputChange} />
                                        <input type="text" className={styles.input} placeholder="Apellidos:" value={userData.apellidos} onChange={handleInputChange} />
                                        <input type="number" className={styles.input} placeholder="Edad:" value={userData.edad} onChange={handleInputChange} />
                                        <input type="number" className={styles.input} placeholder="Altura:" value={userData.altura} onChange={handleInputChange} />
                                        <input type="text" className={styles.input} placeholder="Sexo:" value={userData.sexo} onChange={handleInputChange} />
                                        <input type="text" className={styles.input} placeholder="Lesión:" value={userData.lesion} onChange={handleInputChange} />
                                        <input type="text" className={styles.input} placeholder="Información Adicional:" value={userData.informacionAdicional} onChange={handleInputChange} />
                                        <button type="submit" className={styles.guardar}>Guardar</button>
                                    </div>
                                    <div className={styles.card1}>
                                        <div className={styles.titulo1}>
                                            <h2>VISTA DE CONTENIDO</h2>
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
