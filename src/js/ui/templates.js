// src/js/ui/templates.js
export const createLoader = () => {
  const loader = document.createElement('div');
  loader.className = 'app__loader';
  loader.innerHTML = `
    <div class="app__loader-spinner"></div>
    <p class="app__loader-text">Cargando datos de la Batman API...</p>
  `;
  return loader;
};

export const createError = (message) => {
  const error = document.createElement('div');
  error.className = 'app__error';
  error.innerHTML = `
    <p class="app__error-message">${message}</p>
    <button class="app__error-retry">Reintentar</button>
  `;
  return error;
};

export const createHeader = () => {
  const header = document.createElement('header');
  header.className = 'app__header';
  header.innerHTML = `
    <h1 class="app__title">Batman API</h1>
    <p class="app__subtitle">Explora el universo de Batman</p>
  `;
  return header;
};

export const createNavigation = (currentSection) => {
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
        <button class="app__nav-link ${currentSection === 'locations' ? 'active' : ''}" data-section="locations">Ubicaciones</button>
      </li>
      <li class="app__nav-item">
        <button class="app__nav-link ${currentSection === 'concepts' ? 'active' : ''}" data-section="concepts">Conceptos</button>
      </li>
      <li class="app__nav-item">
        <button class="app__nav-link ${currentSection === 'storylines' ? 'active' : ''}" data-section="storylines">Historias</button>
      </li>
    </ul>
  `;
  return nav;
};

export const createMainContent = () => {
  const main = document.createElement('main');
  main.className = 'app__main';
  return main;
};

export const createCharacterCard = (character) => {
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

export const createLocationCard = (location) => {
  const { id, attributes } = location;
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
      <h3 class="character-card__title">${attributes.name}</h3>
      <p class="character-card__description">${attributes.description}</p>
      <div class="character-card__meta">
        <span class="character-card__type">${attributes.type}</span>
      </div>
      ${attributes.notable_events?.length > 0 ? `
        <div class="character-card__details">
          <h4>Eventos destacados:</h4>
          <ul>
            ${attributes.notable_events.map(event => `<li>${event}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `;
  return card;
};

export const createConceptCard = (concept) => {
  const { id, attributes } = concept;
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
      <h3 class="character-card__title">${attributes.name}</h3>
      <p class="character-card__description">${attributes.description}</p>
      <div class="character-card__meta">
        <span class="character-card__type">${attributes.type}</span>
      </div>
      ${attributes.related_characters?.length > 0 ? `
        <div class="character-card__details">
          <h4>Personajes relacionados:</h4>
          <p>${attributes.related_characters.join(', ')}</p>
        </div>
      ` : ''}
    </div>
  `;
  return card;
};

export const createStorylineCard = (storyline) => {
  const { id, attributes } = storyline;
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
      <h3 class="character-card__title">${attributes.name}</h3>
      <p class="character-card__description">${attributes.description}</p>
      <div class="character-card__meta">
        <span class="character-card__date">${new Date(attributes.publication_date).getFullYear()}</span>
      </div>
      ${attributes.characters?.length > 0 ? `
        <div class="character-card__details">
          <h4>Personajes:</h4>
          <p>${attributes.characters.slice(0, 3).join(', ')}${attributes.characters.length > 3 ? '...' : ''}</p>
        </div>
      ` : ''}
    </div>
  `;
  return card;
};