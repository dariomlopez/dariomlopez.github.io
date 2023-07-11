import { useState } from 'react';
import './App.css';

function App() {

  // Ejercicio 3
  /* Añade las explicaciones que veas necesarias a partir de esta línea */
  // Nota: puedes modificar las siguientes línea pero ten en cuenta que tendrás que editar el ejercicio 2 acorde a esos cambios.
  const [title, setTitle] = useState(''); 
  const [content, setContent] = useState(''); 
  const [tags, setTags] = useState(''); 

  const handleTitle = (event) => {
    setTitle(event.target.value); 
    console.log("title:", event.target.value);
  };
  const handleTextarea = (event) => {
    setContent(event.target.value);
    console.log("content:", event.target.value);
  };
  const handleTags = (event) => {
    setTags(event.target.value); 
    console.log("tags:", event.target.value);
  };
  const resetearCampos = () => {
    setTitle('');
    setContent('');
    setTags('');
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("tags").value = "";
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que se recargue la página
    resetearCampos();

    // Envía los datos al servidor
    const url = "http://localhost:3000/posts";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({title, content, tags})
    })
    .then(response => response.json())
    .then(data => console.log(data));

    resetearCampos();
    alert("Datos enviados");
  };
  /* Añade las explicaciones que veas necesarias antes de esta línea */

  return (
    <>
    <div className="App">
      <header className="App-header">
        <h1>Crear Post</h1>
      </header>
      <div className="container">
        {/* Escribir la solución a partir de esta línea */}
        <form>
          {/* Solución del ejercicio 2 aquí */}
          <p>Tu solución va aquí</p>
        </form>
        {/* Escribir la solución antes de esta línea */}
      </div>
    </div>
    {/* No editar */}
    <div className='states'>
      <h2>Datos</h2>
      <p>Titulo: {title}</p>
      <p>Contenido: {content}</p>
      <p>Etiquetas: {tags}</p>
    </div>
    {/* No editar */}
    </>
  );
}

export default App;
