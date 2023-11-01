import React, { useState, useEffect } from "react";

function Tareas() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
    setTareas(tareasGuardadas);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (tarea.trim() === "") {
      alert("Debes ingresar una tarea");
      return;
    }

    const nuevaTarea = { texto: tarea, completada: false };
    const nuevasTareas = [...tareas, nuevaTarea];

    setTareas(nuevasTareas);
    setTarea("");

    guardarTareasEnLocalStorage(nuevasTareas);
  }

  function handleTareaToggle(index) {
    const nuevasTareas = [...tareas];
    nuevasTareas[index].completada = !nuevasTareas[index].completada;
    setTareas(nuevasTareas);

    guardarTareasEnLocalStorage(nuevasTareas);
  }

  function guardarTareasEnLocalStorage(tareas) {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }

  return (
    <div className="text-center text-white items-center">
      <h1 className="py-2">Agregar a la lista:</h1>
      <div>
        <form
          onSubmit={handleSearch}
          className="items-center justify-center grid"
        >
          <input
            className="text-white bg-transparent border-white border-2 outline-2 text-center font-semibold py-2 rounded-full"
            type="text"
            value={tarea}
            onChange={(e) => setTarea(e.target.value)}
            placeholder="Tarea a agregar"
          />
          <button
            className="text-black rounded-full py-2 px-2 m-4 bg-white"
            type="submit"
          >
            AGREGAR
          </button>
        </form>
      </div>
      <ul>
        {tareas.map((tarea, index) => (
          <li
            className=" border-white border-2 rounded-full m-2"
            key={index}
            onClick={() => handleTareaToggle(index)}
            style={{
              textDecoration: tarea.completada ? "line-through" : "none",
            }}
          >
            {tarea.texto}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tareas;
