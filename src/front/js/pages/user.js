import React, { useContext, useState, useEffect } from "react";
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

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch(`${process.env.BACKEND_URL}/video`)
            .then(response => response.json())
            .then(data => setVideos(data))
            .catch(error => console.error('Error fetching videos:', error));
    }, []);

    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
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

    const VideoComponent = ({ video }) => (
        <div key={video.id} className={styles.videos}>
            <h5>{video.exercise_name}</h5>
            <a href={video.url} target="_blank" rel="noopener noreferrer">
                Ver en YouTube
            </a>
        </div>
    );

    return (
        <div className={styles.fondo}>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="text-center mt-5">
                            <form onSubmit={handleSubmit}>
                                <div className={styles.card}>
                                    <div className={styles.titulo}>
                                        <h2>VIDEOS RECOMENDADOS</h2>
                                        <div>
                                            {videos.map(video => (
                                                <VideoComponent video={video} key={video.id} />
                                            ))}
                                        </div>
                                        <div className={styles.card1}>
                                            <div className={styles.titulo1}>
                                                <h2>NUTRICIÓN Y ENTRENO</h2>
                                                <div className="container">
                                                <img src="https://cdn.euroinnova.edu.es/img/subidasEditor/funciones%20(55)-1617716195.webp" alt="Descripción de la imagen" className={styles.imagen} />
                                                </div>
                                                <div className={styles.targeta}>
                                                    <div className="card" style={{ backgroundColor: "#1c1c1c" }}>
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
        </div>
      
    );
};

export default User;
