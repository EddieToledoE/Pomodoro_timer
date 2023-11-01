import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Logo from "../img/Tite.png";
import Botonplay from "./botonplay";
import Botonpausa from "./botonpause";

import { useState, useEffect, useContext, useRef } from "react";
import ContextoConfiguracion from "./contextoconfiguracion";

const morado = "rgba(229, 252, 27)";
const amarillo = "rgba(229, 252, 27)";

function Timer() {
  const contexto = useContext(ContextoConfiguracion);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setModo] = useState("Trabajando");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function switchMode() {
    const nextMode =
      modeRef.current === "Trabajando" ? "Descansando" : "Trabajando";
    const nextSeconds =
      (nextMode === "Trabajando"
        ? contexto.minutosTrabajo
        : contexto.minutosDescanso) * 60;
    setModo(nextMode);
    modeRef.current = nextMode;
    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }
  function thick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  function initTimer() {
    setSecondsLeft(contexto.minutosTrabajo * 60);
  }
  useEffect(() => {
    initTimer();

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      thick();
    }, 1000);

    return () => clearInterval(interval);
  }, [contexto]);
  const totalSeconds =
    mode === "Trabajando"
      ? contexto.minutosTrabajo * 60
      : contexto.minutosDescanso * 60;
  let porcentage = Math.round(secondsLeft / totalSeconds) * 100;
  let minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;
  return (
    <div className="h-screen">
      <CircularProgressbarWithChildren
        value={porcentage}
        text={minutes}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: morado,
          trailColor: "fff",
        })}
      >
        <div className="w-32 mt-48">{/* <img src={Logo} /> */}</div>
      </CircularProgressbarWithChildren>
      <div className=" justify-around py-2 flex pt-8 ">
        {isPaused ? <Botonplay /> : <Botonpausa />}
      </div>
    </div>
  );
}
export default Timer;
