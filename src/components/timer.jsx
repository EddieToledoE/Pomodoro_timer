"use client";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Logo from "../img/Tite.png";
import Botonplay from "./botonplay";
import Botonpausa from "./botonpause";
import Botonconfig from "./botonconfig";

const morado = "rgba(229, 252, 27);";
const amarillo = "rgba(229, 252, 27);";

function Timer() {
  return (
    <div>
      <CircularProgressbarWithChildren
        value={45}
        text={`${45}%`}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: morado,
          trailColor: amarillo,
        })}
      >
        <div className="w-32 mt-48">{/* <img src={Logo} /> */}</div>
        <div className="flex ">
          <Botonplay />
          <Botonpausa />
        </div>
        <div>
          <Botonconfig />
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}
export default Timer;
