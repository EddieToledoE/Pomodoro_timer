import ReactSlider from "react-slider";
import React from "react";
import Styles from "@/styles/sliders.css";
import Botonvolver from "./botonvolver";
import { useContext } from "react";
import ContextoConfiguracion from "./contextoconfiguracion";
function Configuracion() {
  const contexto = useContext(ContextoConfiguracion);
  return (
    <div className="text-center">
      <h1>Configuracion</h1>
      <label className="text-white">
        Minutos de trabajo : {contexto.minutosTrabajo}:00
      </label>
      <ReactSlider
        className={"slider"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={contexto.minutosTrabajo}
        onChange={(newValue) => contexto.SetminutosTrabajo(newValue)}
        min={1}
        max={60}
      />
      <label className="text-white">
        Minutos de descanso : {contexto.minutosDescanso}:00
      </label>
      <ReactSlider
        className={"slider_descanso"}
        thumbClassName={"thumb_descanso"}
        trackClassName={"track_descanso"}
        value={contexto.minutosDescanso}
        onChange={(newValue) => contexto.SetminutosDescanso(newValue)}
        min={1}
        max={15}
      />
      <div className="bg-white mt-2">
        <Botonvolver />
      </div>
    </div>
  );
}
export default Configuracion;
