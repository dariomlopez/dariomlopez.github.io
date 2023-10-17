
// TODO 

// [] Cómo cambiar de idioma una página web https://www.youtube.com/watch?v=hBYVxQLtrqQ&ab_channel=DorianDesings */

// [] dark mode 
// https://bootcamp.uxdesign.cc/create-a-dark-mode-for-your-website-d62e73a4275d

// https://www.geeksforgeeks.org/how-to-create-dark-light-mode-for-website-using-javascript-jquery/

// https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/#aa-using-custom-properties

const page = document.querySelector(".page");
const toggle = document.querySelector(".toggle-input");
const toggleIcon = page.querySelector(".toggle-icon");

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// function bodyReplaceClass() {
//   if(toggle.checked) {
//     page.classList.replace("light", "dark")
//   } else {
//     page.classList.replace("dark", "light");
//   }
// }

function toggleIconTheme() {
  if(page.classList.contains("dark")) {
    toggleIcon.src = "./assets/light.png";
    toggleIcon.alt = "Light mode";
  } else {
    toggleIcon.src = "./assets/night-mode.png";
    toggleIcon.alt = "Light mode";
  }
}

function checkedState() {
  if (!(localStorage.checked === undefined)) {
    toggle.checked = isTrue(localStorage.getItem("checked"));
    toggleTheme();
  }
}

function toggleTheme() {
  if(toggle.checked) {
    page.classList.remove("light");
    page.classList.add("dark")
  } else {
    page.classList.remove("dark");
    page.classList.add("light")
  }
    // bodyReplaceClass();
  toggleIconTheme();
  localStorage.setItem("checked", toggle.checked);
}

function isTrue(value) {
    return value === "true";
}

checkedState();

toggle.addEventListener("change", toggleTheme);
