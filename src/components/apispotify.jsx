import { useState } from "react";

function ApiSpotify() {
  const [cancion, setCancion] = useState("");
  const [canciones, setCanciones] = useState([]);

  function handlesearch(e) {
    e.preventDefault();
    if (cancion.trim() === "") {
      alert("Debes de ingresar una cancion");
      return;
    }
    setCancion("");
    getSong(cancion);
    console.log(canciones);
  }

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d30be17ef6msh97a20bf3ff4f063p1d0c04jsn2f521f947f34",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  async function getSong(cancion) {
    try {
      let url = `https://spotify23.p.rapidapi.com/search/?q=${cancion}&type=multi&offset=0&limit=3&numberOfTopResults=5`;
      let data = await fetch(url, options);
      let res = await data.json();
      setCanciones(res.tracks.items);
    } catch (error) {
      console.log("Se ha encontrado el siguiente error :", error);
    }
  }

  return (
    <div className="text-center text-white items-center">
      <h1 className="py-2">Buscador de canciones</h1>
      <div>
        <form
          onSubmit={handlesearch}
          className=" items-center justify-center grid"
        >
          <input
            className=" text-white bg-transparent border-white border-2 outline-2 text-center font-semibold py-2 rounded-full"
            type="text"
            value={cancion}
            onChange={(e) => setCancion(e.target.value)}
            placeholder="Cancion a buscar"
          />
          <button
            className="text-black rounded-full py-2 px-2 m-4 bg-white"
            type="submit"
          >
            BUSCAR
          </button>
        </form>
        {canciones.map((cancion, index) => (
          <>
            <div className="justify-center flex m-4">
              <div key={index}>
                <img
                  className="w-48 justify-center"
                  src={cancion.data.albumOfTrack.coverArt.sources[0].url}
                  alt=""
                />
                <h1 className="text-">{cancion.data.name}</h1>
                <h2>{cancion.data.artists.items[0].profile.name}</h2>
                <a href={cancion.data.uri}>
                  <button className="bg-white rounded text-black w-1/2">
                    Reproducir
                  </button>
                </a>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
export default ApiSpotify;
