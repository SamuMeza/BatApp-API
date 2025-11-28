
import { getData } from "../js/services/peticion-API.js";
import { localCharacters } from "../data/localCharacters.js";

// Elementos principales
const app = document.getElementById('app');

// Estados
let currentSection = 'characters';
let isLoading = true;

/****************************************************************************/


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

const createHeader = () => {
  const header = document.createElement('header');
  header.className = 'app__header';
  header.innerHTML = `
    <h1 class="app__title">Batman API</h1>
    <p class="app__subtitle">Explora el universo de Batman</p>
  `;
  return header;
};

const createNavigation = () => {
  const nav = document.createElement('nav');
  nav.className = 'app__nav';
  nav.innerHTML = `
    <ul class="app__nav-list">
      <li class="app__nav-item">
        <button class="app__nav-link ${currentSection === 'characters' ? 'active' : ''}" data-section="characters">
          Personajes
        </button>
      </li>
      <li class="app__nav-item">
        <button class="app__nav-link" data-section="locations">Ubicaciones</button>
      </li>
      <li class="app__nav-item">
        <button class="app__nav-link" data-section="concepts">Conceptos</button>
      </li>
      <li class="app__nav-item">
        <button class="app__nav-link" data-section="storylines">Historias</button>
      </li>
    </ul>
  `;
  return nav;
};

const createMainContent = () => {
  const main = document.createElement('main');
  main.className = 'app__main';
  return main;
};

const createCharacterCard = (character) => {
  const { id, attributes } = character;
  const card = document.createElement('article');
  card.className = 'character-card';
  card.dataset.id = id;

  card.innerHTML = `
    <div class="character-card__image">
      <img src="${attributes.image_url || 'https://via.placeholder.com/300x450?text=No+Image'}" 
           alt="${attributes.name}" 
           class="character-card__img">
    </div>
    <div class="character-card__content">
      <h3 class="character-card__title">
        ${attributes.name} 
        ${attributes.alias ? `<span class="character-card__alias">(${attributes.alias})</span>` : ''}
      </h3>
      <div class="character-card__meta">
        <span class="character-card__status ${attributes.alive ? 'alive' : 'deceased'}">
          ${attributes.alive ? 'Vivo' : 'Fallecido'}
        </span>
        <span class="character-card__role">${attributes.role}</span>
        <span class="character-card__gender">${attributes.gender}</span>
      </div>
      <p class="character-card__description">${attributes.description}</p>
      <div class="character-card__details">
        <p class="character-card__detail">
          <strong>Primera aparición:</strong> 
          <span>${attributes.first_appearance || 'Desconocida'}</span>
        </p>
        <p class="character-card__detail">
          <strong>Creador(es):</strong> 
          <span>${attributes.creator || 'Desconocido'}</span>
        </p>
        ${attributes.abilities?.length > 0 ? `
          <div class="character-card__abilities">
            <h4 class="character-card__abilities-title">Habilidades</h4>
            <ul class="character-card__abilities-list">
              ${attributes.abilities.map(ability => `
                <li class="character-card__ability">${ability}</li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    </div>
  `;
  return card;
};

// Renderizado
const renderLoader = () => {
  app.innerHTML = '';
  app.appendChild(createLoader());
};

const renderError = (message) => {
  app.innerHTML = '';
  app.appendChild(createError(message));
};

// Función para combinar personajes de la API con los locales
const getCombinedCharacters = async () => {
  try {
    // 1. Obtener datos de la API
    const apiResponse = await getData(`https://api.batmanapi.com/v1/characters`);
    const apiCharacters = apiResponse.data || [];

    // 2. Extraer personajes locales
    const localChars = localCharacters.map(item => item.data);

    // 3. Combinar y desduplicar por ID
    const combined = [...localChars, ...apiCharacters].reduce((acc, current) => {
      const exists = acc.some(item => item.id === current.id);
      if (!exists) {
        acc.push(current);
      }
      return acc;
    }, []);

    return combined;
  } catch (error) {
    console.error('Error al combinar personajes:', error);
    // En caso de error, devolver los personajes locales como respaldo
    return localCharacters.map(item => item.data);
  }
};

const renderApp = async () => {
  try {
    // Mostrar loader
    renderLoader();

    // Construir interfaz
    app.innerHTML = '';
    app.appendChild(createHeader());

    // Crear y agregar navegación
    const nav = createNavigation();
    app.appendChild(nav);

    // Agregar event listeners a los botones de navegación
    const navLinks = nav.querySelectorAll('.app__nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        if (section !== currentSection) {
          currentSection = section;
          renderApp(); // Volver a renderizar la app con la nueva sección
        }
      });
    });

    const main = createMainContent();

    if (currentSection === 'characters') {
      // Obtener datos combinados
      const combinedCharacters = await getCombinedCharacters();

      const grid = document.createElement('div');
      grid.className = 'characters-grid';
      combinedCharacters.forEach(character => {
        grid.appendChild(createCharacterCard(character));
      });
      main.appendChild(grid);
    }

    app.appendChild(main);

    
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    renderError('No se pudieron cargar los datos. Por favor, inténtalo de nuevo más tarde.');
  }
};

renderApp();
