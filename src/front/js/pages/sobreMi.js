import styles from "../../styles/sobreMi.module.css";
import React from "react";
import { Link } from "react-router-dom";

export const SobreMi = () => {
    return (
        <div className={styles.sobreNosotros}>
            <section className={styles.card}>
                <img
                    className={styles.photoIcon}
                    loading="lazy"
                    alt=""
                    src="https://i.ibb.co/rbQNyVp/entrenador-1.webp"
                />
                <div className={styles.cardBackground} />
                <h1 className={styles.sobreMi}>Sobre mi</h1>
                <div className={styles.estudiosAcadmicosGraduadoContainer}>
                    <p className={styles.estudiosAcadmicos}>Estudios académicos</p>
                    <ul className={styles.graduadoEnCafydCienciasDe}>
                        <li className={styles.graduadoEnCafyd}>
                            Graduado en CAFyD ciencias de la actividad física y del deporte
                            (Universidad de A Coruña)
                        </li>
                        <li className={styles.entrenadorNacionalDe}>
                            Entrenador nacional de triatlón (FETRI)
                        </li>
                        <li className={styles.quiromasajistaTeraputicoDep}>
                            Quiromasajista Terapéutico deportivo en AGAMATEMA (1° Nivel)
                        </li>
                        <li className={styles.expertoUniversitarioEn}>
                            Experto universitario en nutrición y alimentación aplicada al
                            deporte (Universidad Illes Balears)
                        </li>
                        <li className={styles.cursoFundamentosDe}>
                            Curso fundamentos de programación del entrenamiento de la
                            resistencia(Instituto deporte y vida)
                        </li>
                        <li className={styles.cursoPrcticoEn}>
                            Curso práctico en programación del entrenamiento en triatlón,
                            medio ironman y ironman(Instituto deporte y vida)
                        </li>
                        <li>
                            Título de primeros auxilios y socorrismo acuático (Cruz Roja
                            Española)
                        </li>
                    </ul>
                </div>
                <div className={styles.botonContainer}>
                <Link to="/registro" className={`btn btn ${styles.boton}`}>Empezar</Link>
                </div>
            </section>
        </div>
    );
};
