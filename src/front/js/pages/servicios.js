import React from "react";
import "../../styles/servicios.css";

export const Servicios = ({ className }) => {
  return (
    <div className={`servicios ${className}`}>
      <div className="overlap">
        <div className="group">
          <div className="overlap-group">
            <div className="text-wrapper">Acondicionamiento</div>
            <p className="acondicionamiento">
              El Acondicionamiento Físico Es Importante, Ya Que Aumenta Las Capacidades Físicas Del Individuo Ayudando A
              Mantener Un Cuerpo Saludable Y Más Fuerte.
            </p>
            <img className="line" alt="Line" src="https://i.ibb.co/TL2HM30/line-1.png" />
          </div>
        </div>
        <div className="overlap-wrapper">
          <div className="div">
            <img className="power" alt="Power" src="https://i.ibb.co/cx1bGnk/power.png" />
            <div className="rehab-group">Rehabilitación</div>
            <p className="rehabilitacion">
              La Rehabilitación Deportiva Tiene Como Objetivo Principal La Curación De Las Lesiones Debidas A La
              Práctica Deportiva
            </p>
            <img className="img" alt="Line" src="https://i.ibb.co/TL2HM30/line-1.png" />
          </div>
        </div>
        <div className="overlap-group-wrapper">
          <div className="overlap-2">
            <img className="weightlifting" alt="Weightlifting" src="https://i.ibb.co/RTTNGWH/weightlifting.png" />
            <div className="text-wrapper-2">Oposiciones</div>
            <p className="oposiciones">
              Entrenamiento Para Todo Tipo De Cuerpos Policiales, Bomberos, Vigilantes De Seguridad Y Estudiantes De La
              Actividad Física Y El Deporte.
            </p>
            <img className="line-2" alt="Line" src="https://i.ibb.co/TL2HM30/line-1.png" />
          </div>
        </div>
        <img className="dumbbell" alt="Dumbbell" src="https://i.ibb.co/DDP1rdG/dumbbell.png" />
      </div>
      <div className="text-wrapper-3">Nuestros Servicios</div>
    </div>
  );
};
