import { useContext } from "react";
import ContextoConfiguracion from "./contextoconfiguracion";

function Botonvolver(props) {
  const contexto = useContext(ContextoConfiguracion);
  return (
    <button
      onClick={() => contexto.SetmostrarConfiguracion(false)}
      {...props}
      className="px-2 py-2  bg-white rounded-full "
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
        />
      </svg>
    </button>
  );
}
export default Botonvolver;
