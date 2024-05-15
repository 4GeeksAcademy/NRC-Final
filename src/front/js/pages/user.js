import React, { useContext, useState, useEffect } from "react";
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

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch(`${process.env.BACKEND_URL}/video`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error al obtener los videos del servidor');
                }
            })
            .then(data => {
                setVideos(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

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
                                        <input type="text" className={styles.input} placeholder="Lesión:" name="lesion" value={userData.lesion} onChange={handleInputChange} />
                                        <input type="text" className={styles.input} placeholder="Información Adicional:" name="informacionAdicional" value={userData.informacionAdicional} onChange={handleInputChange} />
                                        <button type="submit" className={styles.guardar}>Guardar</button>
                                    </div>
                                    <div className={styles.card1}>
                                        <div className={styles.titulo1}>
                                            <h2>VISTA DE CONTENIDO</h2>
                                            <ul className={styles.videoList}>
                                                {videos.map(video => (
                                                    <li key={video.id} className={styles.videoItem}>
                                                        <iframe 
                                                            src={`https://www.youtube.com/embed/${video.url.split('v=')[1]}?autoplay=0&controls=0&showinfo=0&rel=0`} 
                                                            className={styles.videoThumbnail} 
                                                            frameBorder="0" 
                                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                                            allowFullScreen>
                                                        </iframe>
                                                        <a href={video.url} target="_blank" rel="noopener noreferrer" className={styles.videoLink}>{video.exercise_name}</a>
                                                    </li>
                                                ))}
                                            </ul>
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
