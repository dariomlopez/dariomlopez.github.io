
// TODO 

// [] Cómo cambiar de idioma una página web https://www.youtube.com/watch?v=hBYVxQLtrqQ&ab_channel=DorianDesings */

// [x] dark mode 
// https://bootcamp.uxdesign.cc/create-a-dark-mode-for-your-website-d62e73a4275d

// https://www.geeksforgeeks.org/how-to-create-dark-light-mode-for-website-using-javascript-jquery/

// https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/#aa-using-custom-properties

/** Elementos del DOM para cambio de tema*/

const page = document.querySelector(".page");
const toggle = document.querySelector(".toggle-input");
const toggleIcon = page.querySelector(".toggle-icon");

/** Elementos del DOM para cambio de idioma */
/** tag select cuando la pantalla es grande */
const langElementDesk = document.getElementById("lang-select");

/** tag select cuando la pantalla es pequeña */
const langElementSmall = document.getElementById("lang-select-small");

/** Comprobando que el valor escogido esta bien seleccionado */
langElementDesk.addEventListener("change", () => {
  const selectValue = langElementDesk.value;
  changeLanguage(selectValue);
});
langElementSmall.addEventListener("change", () => {
  const selectValue = langElementSmall.value;
  changeLanguage(selectValue);
});

const textsChange = document.querySelectorAll("[data-section]")

const changeLanguage = async language => {
  const requestJson = await fetch(`./languages/${language}.json`)
  const texts = await requestJson.json()
  
  for (const textChange of textsChange) {
    const section = textChange.dataset.section;
    const value = textChange.dataset.value;
    textChange.innerHTML = texts[section][value]
  } 
};

/** Función para cambiar el menu del navbar */

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/** Función para cambiar el icono cuando cambia el modo */

function toggleIconTheme() {
  if (page.classList.contains("dark")) {
    toggleIcon.src = "./assets/light.png";
    toggleIcon.alt = "Light mode";
  } else {
    toggleIcon.src = "./assets/night-mode.png";
    toggleIcon.alt = "Dark mode";
  }
}

// Verifica si hay un estado previamente guardado en el almacenamiento local

function checkedState() {
  if (!(localStorage.checked === undefined)) {
    // Establece el estado del checkbox al valor guardado en el almacenamiento local
    toggle.checked = isTrue(localStorage.getItem("checked"));
    // Aplica el tema de acuerdo al estado actual del checkbox
    toggleTheme();
  }
}

/** Cambia la clase del body añadiendo o eliminando la clase */

function toggleTheme() {
  if(toggle.checked) {
    /** Si el checkbox está marcado aplica el tema oscuro */
    page.classList.remove("light");
    page.classList.add("dark")
  } else {
    /** Si el checkbox esta desmarcado aplic el tema claro */
    page.classList.remove("dark");
    page.classList.add("light")
  }

  /** Llamamos a la función para que cambie el icono */
  toggleIconTheme();
  localStorage.setItem("checked", toggle.checked);
}

function isTrue(value) {
    return value === "true";
}

/** Verificar el estado inicial del checkbox al cargar la página */
checkedState();

/** Escucha cambios en el checkbox y aplica el tema correspondiente */
toggle.addEventListener("change", toggleTheme);
