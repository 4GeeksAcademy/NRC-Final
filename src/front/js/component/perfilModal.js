import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';



export const PerfilModal = ({ userRole }) => {
    const { store, actions } = useContext(Context);
    /* const [showModal, setShowModal] = useState(false); */

    const [userData, setUserData] = useState({
        nombre: "",
        apellidos: "",
        edad: "",
        altura: "",
        lesion: false,
        genero: "",
        informacionAdicional: ""
    });

    const userProfile = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/userProfile/${store.user_id}`);
            if (!response.ok) {
                Swal.fire({
                    title: "Aviso",
                    text: "Recuerda completar tus datos para un mejor servicio.",
                    icon: "warning"
                  });
                }
            const data = await response.json();
            setUserData(data)
        } catch (error) {
            console.error(error);
        }
    };

/*     const isProfileComplete = () => {
        return userData.nombre && userData.apellidos && userData.edad && userData.altura && userData.genero && userData.informacionAdicional && userRole === "user";
    };
*/
    
    useEffect(() => {
        userProfile();
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
    };

/*     useEffect(() => {
        if (showModal) {
          const modal = new window.bootstrap.Modal(document.getElementById('perfilModal'));
          modal.show();
        }
      }, [showModal]); */
    

    return (
        <>
            <div className="modal fade" id="perfilModal" tabIndex="-1" aria-labelledby="perfilModalLabel" aria-hidden="true">
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