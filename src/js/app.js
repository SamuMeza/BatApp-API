
import {getData} from "../js/services/peticion-API.js";

const mainTitle = document.getElementById("main-title")
const navCharacters = document.getElementById("nav-characters")
const navLocations = document.getElementById("nav-locations")
const navConcepts = document.getElementById("nav-concepts")
const navStorylines = document.getElementById("nav-storylines")
const carouselSection = document.getElementById("carousel-section")
const carouselContainer = document.getElementById("carousel-container")
const loader = document.getElementById("loader")
const errorMessage = document.getElementById("error-message")
const contentContainer = document.getElementById("content-container")






const getDataCharacters = async () => {
  const data = await getData("https://api.batmanapi.com/v1/characters");
  data.forEach(element => {
    const card = createCard(element);
    contentContainer.appendChild(card);
  });
}

const createCard = (data) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <img src="${data.image_url}" alt="${data.name}">
    <h3>${data.name}</h3>
    <p>Rol: ${data.rol}</p>
    <p>Alias: ${data.alias}</p>
    <p>Status: ${data.alive ? "Alive" : "Dead"}</p>
    <p>Creado por: ${data.creator}</p>
    <p>Descripción: ${data.description}</p>
    <p>Primera aparición: ${data.first_appearance}</p>
    <p>Género: ${data.gender}</p>
    <ul>
      ${data.abilities.map(ability => `<li>${ability}</li>`).join("")}
    </ul>
  `;

  return card;
}

getDataCharacters();
