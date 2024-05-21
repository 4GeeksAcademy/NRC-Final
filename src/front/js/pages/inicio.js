import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/registro.module.css";
import "../../styles/inicio.css";

export const Inicio = () => {
  return (
    <div className="home">
      <div className="frame">
        <p className="text-wrapper">MEJORA TU CUERPO AL MÁXIMO</p>
        <p className="text-line">
          Los ganadores se ponen METAS, los perdedores EXCUSAS.
          <br />
          <br />
          NO PAIN NO GAIN
        </p>
      </div>
      <img className="image" alt="Image" src="https://static.vecteezy.com/system/resources/previews/024/098/167/original/dumbbell-gym-tool-free-png.png" />
      <Link to={"/registro"}>
        <button type="submit" className="button-instance">Empezar  <i className="fas fa-long-arrow-alt-right"></i></button>
      </Link>
    </div>
  );
};
