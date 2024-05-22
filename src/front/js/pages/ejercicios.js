import React, { useContext, useState, useEffect } from "react";
import styles from "../../styles/ejercicios.module.css";



export const Ejercicios = () => {
    const [ejercicios, setEjercicios] = useState([])
    const [musculo, setMusculo] = useState("undefined")
    const [recetas, setRecetas] = useState([])
    const [ingredientes, setIngredientes] = useState("undefined")


    //API de ejercicios
    useEffect(() => {
        fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${musculo}&offset=100`, {
            headers: { 'X-Api-Key': 'QSdrJl+KYuK99PeqDg83vA==6tq5jcMRGi7hTOof' },
            contentType: 'application/json',
        })
            .then(response => response.json())
            .then(response => setEjercicios(response))
    }, [musculo])

    const handleMusculoChange = (e) => {
        setMusculo(e.target.value)
        setIngredientes("undefined")
    }

    // API de recetas
    useEffect(() => {
        fetch(`https://api.api-ninjas.com/v1/recipe?query=${ingredientes}`, {
            headers: { 'X-Api-Key': 'QSdrJl+KYuK99PeqDg83vA==6tq5jcMRGi7hTOof' },
            contentType: 'application/json',
        })
            .then(response => response.json())
            .then(response => setRecetas(response))
    }, [ingredientes])

    const handleRecetasChange = (e) => {
        setIngredientes(e.target.value)
        setMusculo("undefined")
    }

    if (musculo === "undefined" && ingredientes === "undefined") {
        return (
            <div className={styles.fondo}>
            <div className="container">
                    <div className={styles.contenedor}>
                        <div className={styles.input}>
                            <div className="input-group mb-3">
                                <select className="form-select" id="inputGroupSelect01" onChange={handleMusculoChange}>
                                    <option selected>Grupo muscular</option>
                                    <option value="biceps">Biceps</option>
                                    <option value="chest">Pecho</option>
                                    <option value="glutes">Gluteos</option>
                                </select>
                            </div>
                            <div className="">
                                <div className={styles.input1}>
                                    <div className="input-group mb-3">
                                        <select className="form-select" id="inputGroupSelect01" onChange={handleRecetasChange}>
                                            <option selected>Recetas</option>
                                            <option value="vegetables">Vegetales</option>
                                            <option value="fish">Pescado</option>
                                            <option value="meat">Carne</option>
                                        </select>
                                    </div>
                                </div>
                                <h1>Busca todo lo que necesites</h1>
                            </div>
                        </div>
                        <div className="row row-cols-1 row-cols-md-2 g-4 d-flex justify-contet-center">
                            <div className="col">
                                <div className={styles.cardentreno} style={{ width: '25rem' }}>
                                    <img src="https://media.revistagq.com/photos/5ecea90bd6d588d6f671d17c/16:9/w_2240,c_limit/ejercicios-comba.jpg" className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text"> Queremos crear esta ruta de entrenamiento online personalizada para ti. Empieza tu camino.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className={styles.cardnutri} style={{ width: '25rem' }}>
                                    <img src="https://assets-global.website-files.com/6252f25195e36c72de793f76/6531ff0eb0b84e8af1028889_nutricion-deportiva-1.jpeg" className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <p className="card-text">No empieces una dieta que terminará algún día, comienza un estilo de vida que dure para siempre.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

/* EJERCICIOS/RECETAS/MODAL*/
    return (
        <div className={styles.fondo}>
            <div classNameName="container">
                <div className={styles.input3}>
                    <div className="input-group mb-3">
                        <select className="form-select" id="inputGroupSelect01" onChange={handleMusculoChange}>
                            <option selected>Grupo muscular</option>
                            <option value="biceps">Biceps</option>
                            <option value="chest">Pecho</option>
                            <option value="glutes">Gluteos</option>
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <select className="form-select" id="inputGroupSelect01" onChange={handleRecetasChange}>
                            <option selected>Recetas</option>
                            <option value="vegetables">Vegetales</option>
                            <option value="fish">Pescado</option>
                            <option value="meat">Carne</option>
                        </select>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {
                        ejercicios.map((ejercicio, index) => (
                            <div className="col" key={index}>
                                <div className={styles.ejercicios}>
                                    <div className="card-body">
                                        <h5 className="card-title">{ejercicio.name}</h5>
                                        <p className="card-text">Tipo: {ejercicio.type}</p>
                                        <p className="card-text">Musculo: {ejercicio.muscle}</p>
                                        <p className="card-text">Dificultad: {ejercicio.difficulty}</p>
                                        <p className="card-text">Equipamiento: {ejercicio.equipment}</p>
                                        <button type="button" className={`btn btn ${styles.boton}`} data-bs-toggle="modal" data-bs-target={`#exampleModal${index}`}>
                                            Ver instrucciones
                                        </button>
                                        <div className="modal fade" id={`exampleModal${index}`} tabindex="-1" aria-labelledby={`exampleModalLabel${index}`} aria-hidden="true">                                        <div className="modal-dialog">
                                            <div className={styles.modal}>
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id={`exampleModal${index}`}>{ejercicio.name}</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    {ejercicio.instructions}
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className={`btn btn ${styles.boton}`} data-bs-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))
                    }
                </div>

                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {
                        recetas.map((receta, index) => (
                            <div className="col" key={index}>
                                <div className={styles.recetas}>
                                    <h5 className="card-title">{receta.title}</h5>
                                    <p className="card-text">Ingredientes: {receta.ingredients}</p>
                                    <p className="card-text">Porciones: {receta.servings}</p>
                                    <button type="button" className={`btn btn ${styles.boton}`} data-bs-toggle="modal" data-bs-target={`#exampleModal${index}`}>
                                        Ver instrucciones
                                    </button>
                                    <div className="modal fade" id={`exampleModal${index}`} tabindex="-1" aria-labelledby={`exampleModalLabel${index}`} aria-hidden="true">                                        <div className="modal-dialog">
                                        <div className={styles.modal}>
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id={`exampleModal${index}`}>{receta.title}</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                {receta.instructions}
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className={`btn btn ${styles.boton}`} data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};


