
import {getData} from "../js/services/peticion-API.js";

// Elementos principales
const app = document.getElementById('app');

// Estados
let currentSection = 'characters';
let isLoading = true;

// Elementos secundarios
// const mainTitle = document.getElementById("main-title")
// const navCharacters = document.getElementById("nav-characters")
// const navLocations = document.getElementById("nav-locations")
// const navConcepts = document.getElementById("nav-concepts")
// const navStorylines = document.getElementById("nav-storylines")
// const carouselSection = document.getElementById("carousel-section")
// const carouselContainer = document.getElementById("carousel-container")
// const loader = document.getElementById("loader")
// const errorMessage = document.getElementById("error-message")
// const contentContainer = document.getElementById("content-container")

/****************************************************************************/

const createCharacterCard = (character) => {
  const { id, attributes } = character;
  const { 
    name, 
    alias, 
    alive, 
    role, 
    description, 
    creator, 
    first_appearance, 
    gender, 
    abilities, 
    image_url 
  } = attributes;

  const card = document.createElement('div');
  card.className = 'character-card';
  card.dataset.id = id;

  card.innerHTML = `
    <div class="character-image">
      <img src="${image_url || 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${name}">
    </div>
    <div class="character-info">
      <h3>${name} ${alias ? `(${alias})` : ''}</h3>
      <p class="character-meta">
        <span class="status ${alive ? 'alive' : 'deceased'}">${alive ? 'Vivo' : 'Fallecido'}</span> • 
        <span>${role}</span> • 
        <span>${gender}</span>
      </p>
      <p class="character-description">${description}</p>
      <div class="character-details">
        <p><strong>Primera aparición:</strong> ${first_appearance}</p>
        <p><strong>Creador(es):</strong> ${creator}</p>
        ${abilities && abilities.length > 0 ? `
          <div class="character-abilities">
            <strong>Habilidades:</strong>
            <ul>
              ${abilities.map(ability => `<li>${ability}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  return card;
};

const getDataCharacters = async () => {
  try {
    const { data } = await getData("https://api.batmanapi.com/v1/characters");
    
    // Limpiar el contenedor
    contentContainer.innerHTML = '';
    
    // Crear y añadir las tarjetas al contenedor
    data.map(character => {
      const card = createCharacterCard(character);
      contentContainer.appendChild(card);
    });
    
    // Ocultar el loader
    loader.style.display = 'none';
    
  } catch (error) {
    console.error('Error al cargar los personajes:', error);
    errorMessage.classList.remove('hidden');
    loader.style.display = 'none';
  }
};

// Componentes
const createLoader = () => {
  const loader = document.createElement('div');
  loader.className = 'app__loader';
  loader.innerHTML = `
    <div class="app__loader-spinner"></div>
    <p class="app__loader-text">Cargando datos de la Batman API...</p>
  `;
  return loader;
};

const createError = (message) => {
  const error = document.createElement('div');
  error.className = 'app__error';
  error.innerHTML = `
    <p class="app__error-message">${message}</p>
    <button class="app__error-retry">Reintentar</button>
  `;
  return error;
};

getDataCharacters();
