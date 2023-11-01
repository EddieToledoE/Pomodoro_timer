import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Logo from "../img/Tite.png";
import Botonplay from "./botonplay";
import Botonpausa from "./botonpause";
import { useState, useEffect, useRef } from "react";
import ContextoConfiguracion from "./contextoconfiguracion";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import Configuracion from "./configuracion";
import ApiSpotify from "./apispotify";
import Botonconfig from "./botonconfig";
import Tareas from "./tareas";
const morado = "rgba(14, 165, 233)";
const amarillo = "rgba(229, 252, 27)";
export default function Header() {
  const [mostrarConfiguracion, SetmostrarConfiguracion] = useState(false);
  const [minutosTrabajo, SetminutosTrabajo] = useState(25);
  const [minutosDescanso, SetminutosDescanso] = useState(5);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("Trabajando");
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function thick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchMode() {
      const nextMode =
        modeRef.current === "Trabajando" ? "Descansando" : "Trabajando";
      const nextSeconds =
        (nextMode === "Trabajando" ? minutosTrabajo : minutosDescanso) * 60;
      setMode(nextMode);
      modeRef.current = nextMode;
      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }
    secondsLeftRef.current = minutosTrabajo * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      //agregar thick aca lo mueve
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }
      thick();
    }, 1000);

    return () => clearInterval(interval);
  }, [minutosDescanso, minutosTrabajo]);
  const totalSeconds =
    mode === "Trabajando" ? minutosTrabajo * 60 : minutosDescanso * 60;
  const porcentage = Math.round((secondsLeft / totalSeconds) * 100);
  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }, MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div
      className="group   relative   bg-gray-900 "
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px  opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
          radial-gradient(
            650px circle at ${mouseX}px ${mouseY}px,
            rgba(14, 165, 233, 0.15),
            transparent 20%
          )
        `,
        }}
      />
      <div>
        <h1 className="text-white text-center text-4xl ">Pomodoro timer</h1>
        <div className="flex">
          <div className="w-1/3 p-8">
            <h1 className="text-white text-center ">LISTA DE TAREAS</h1>
            <Tareas />
          </div>
          <div className="w-1/3 p-8">
            <h1 className="text-white text-center ">CONTADOR</h1>
            <div className="h-screen">
              <CircularProgressbarWithChildren
                value={porcentage}
                text={minutes + ":" + seconds}
                styles={buildStyles({
                  textColor: "#fff",
                  pathColor: mode === "Trabajando" ? morado : amarillo,
                  trailColor: "#fff",
                })}
              >
                <div className="w-32 mt-48">
                  <img src={Logo} />
                </div>
              </CircularProgressbarWithChildren>
              <div className=" justify-around py-2 flex pt-8 ">
                {isPaused ? (
                  <Botonplay
                    onClick={() => {
                      setIsPaused(false);
                      isPausedRef.current = false;
                    }}
                  />
                ) : (
                  <Botonpausa
                    onClick={() => {
                      setIsPaused(true);
                      isPausedRef.current = true;
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="w-1/3 p-8 ">
            {mostrarConfiguracion ? (
              <h1 className="text-white text-center">CONFIGURACION</h1>
            ) : (
              <h1 className="text-white text-center">SPOTIFY</h1>
            )}
            <Botonconfig onClick={() => SetmostrarConfiguracion(true)} />
            <ContextoConfiguracion.Provider
              value={{
                mostrarConfiguracion,
                SetmostrarConfiguracion,
                minutosTrabajo,
                minutosDescanso,
                SetminutosTrabajo,
                SetminutosDescanso,
              }}
            >
              {mostrarConfiguracion ? <Configuracion /> : <ApiSpotify />}
            </ContextoConfiguracion.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}
