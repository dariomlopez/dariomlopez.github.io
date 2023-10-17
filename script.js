
// TODO 

// [] Cómo cambiar de idioma una página web https://www.youtube.com/watch?v=hBYVxQLtrqQ&ab_channel=DorianDesings */

// [] dark mode 
// https://bootcamp.uxdesign.cc/create-a-dark-mode-for-your-website-d62e73a4275d

// https://www.geeksforgeeks.org/how-to-create-dark-light-mode-for-website-using-javascript-jquery/

// https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/#aa-using-custom-properties

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const page = document.querySelector(".page");
const toggle = document.querySelector(".toggle-input");

toggle.addEventListener("change", toggleTheme());

function toggleTheme() {
  if(toggle.checked) {
    page.classList.replace("light", "dark")
  } else {
    page.classList.replace("dark", "light");
  }

  if(page.classList.contains("dark")) {
    toggleIcon.src = "./assets/light.png"
  }
}