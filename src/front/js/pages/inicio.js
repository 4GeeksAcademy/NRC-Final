import React from "react";

import "../../styles/inicio.css";

export const Inicio = () => {
  return (
    <div className="home">
      <button
        arowArowClassName="button-2"
        buttonLink="default"
        className="button-instance"
        divClassName="design-component-instance-node"
        focus="default"
        iconLeft={false}
        roundness="modern"
        size="large"
        variant="default"
      >Empezar</button>
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
    </div>
  );
};
