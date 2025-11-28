// src/js/ui/renderers.js
import { 
  createLoader, 
  createError, 
  createHeader, 
  createNavigation, 
  createMainContent,
  createCharacterCard,
  createLocationCard,
  createConceptCard,
  createStorylineCard
} from './templates.js';

export const renderLoader = (app) => {
  app.innerHTML = '';
  app.appendChild(createLoader());
};

export const renderError = (app, message) => {
  app.innerHTML = '';
  const errorElement = createError(message);
  app.appendChild(errorElement);
  
  // Add event listener for retry button
  const retryButton = errorElement.querySelector('.app__error-retry');
  if (retryButton) {
    retryButton.addEventListener('click', () => window.location.reload());
  }
};

export const createCardForSection = (section, item) => {
  switch (section) {
    case 'characters':
      return createCharacterCard(item);
    case 'locations':
      return createLocationCard(item);
    case 'concepts':
      return createConceptCard(item);
    case 'storylines':
      return createStorylineCard(item);
    default:
      return null;
  }
};

export const renderCurrentSection = async (app, section, getCombinedData) => {
  try {
    const data = await getCombinedData(section);
    const grid = document.createElement('div');
    grid.className = 'characters-grid';
    
    data.forEach(item => {
      const card = createCardForSection(section, item);
      if (card) grid.appendChild(card);
    });
    
    return grid;
  } catch (error) {
    console.error(`Error rendering ${section}:`, error);
    return null;
  }
};

export const renderApp = async (app, currentSection, getCombinedData) => {
  try {
    renderLoader(app);
    
    // Clear and rebuild the app structure
    app.innerHTML = '';
    app.appendChild(createHeader());
    
    const nav = createNavigation(currentSection);
    app.appendChild(nav);
    
    // Set up navigation
    const navLinks = nav.querySelectorAll('.app__nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        if (section !== currentSection) {
          currentSection = section;
          renderApp(app, currentSection, getCombinedData);
        }
      });
    });
    
    const main = createMainContent();
    const grid = await renderCurrentSection(app, currentSection, getCombinedData);
    
    if (grid) {
      main.appendChild(grid);
      app.appendChild(main);
    } else {
      renderError(app, 'No se pudieron cargar los datos. Por favor, intenta de nuevo más tarde.');
    }
  } catch (error) {
    console.error('Error rendering app:', error);
    renderError(app, 'Ocurrió un error al cargar la aplicación.');
  }
};