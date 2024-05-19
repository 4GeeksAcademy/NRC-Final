import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';



export const PerfilModal = () => {
    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(true);

    const [userData, setUserData] = useState({
        nombre: "",
        apellidos: "",
        edad: "",
        altura: "",
        genero: "",
        lesion: "",
        informacionAdicional: ""
    });

    const userProfile = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/userProfile/${store.user_id}`);
            const data = await response.json();
            setUserData(data)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        userProfile();
        if (!isProfileComplete()) {
            setShowModal(true);
            console.log(showModal);
        }
    }, []);

    const isProfileComplete = () => {
        return userData.nombre && userData.apellidos && userData.edad && userData.altura && userData.genero && userData.lesion && userData.informacionAdicional;
    };

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
        if (isProfileComplete()) {
            setShowModal(false);
            fetch(`${process.env.BACKEND_URL}/userProfile/${store.user_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
                .then(response => Swal.fire({
                    title: "Perfil actualizado",
                    text: "Datos modificados correctamente",
                    icon: "success"
                }))
                .catch(error => Swal.fire({
                    title: "Error",
                    text: "Error de red",
                    icon: "error"
                }))
        } else {
            Swal.fire({
                title: "Error",
                text: "Por favor, completa todos los campos.",
                icon: "error"
            })
        }
    };

    

    return (
        <>
            <button className="btn me-2 px-4" data-bs-toggle="modal" data-bs-target="#perfilModal">Perfil</button>
            <div className="modal fade" show={showModal} onHide={() => setShowModal(false)} id="perfilModal" tabIndex="-1" aria-labelledby="perfilModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="perfilModalLabel">Perfil</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="nombreInput" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="nombreInput" placeholder="Nombre:" name="nombre" value={userData.nombre} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="apellidosInput" className="form-label">Apellidos</label>
                                <input type="text" className="form-control" id="apellidosInput" placeholder="Apellidos:" name="apellidos" value={userData.apellidos} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edadInput" className="form-label">Edad</label>
                                <input type="number" className="form-control" id="edadInput" placeholder="Edad:" name="edad" value={userData.edad} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="alturaInput" className="form-label">Altura</label>
                                <input type="number" className="form-control" id="alturaInput" placeholder="Altura:" name="altura" value={userData.altura} onChange={handleInputChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="generoInput" className="form-label">Género</label>
                                <select id="generoInput" className="form-select" name="genero" onChange={handleInputChange}>
                                    <option selected>{userData.genero}</option>
                                    <option>Masculino</option>
                                    <option>Femenino</option>
                                    <option>Otros</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lesionInput" className="form-label me-2">Lesión</label>
                                <input className="form-check-input" type="checkbox" checked={userData.lesion} id="lesionInput" name="lesion" onChange={handleInputChange}></input>
                                {/* <input type="boolean" className="form-control" id="lesionInput" placeholder="Lesión:" name="lesion" value={userData.lesion} onChange={handleInputChange} /> */}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="infoAdicionalInput" className="form-label">Información Adicional</label>
                                <input type="text" className="form-control" id="infoAdicionalInput" placeholder="Información Adicional:" name="informacionAdicional" value={userData.informacionAdicional} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Salvar cambios</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PerfilModal;