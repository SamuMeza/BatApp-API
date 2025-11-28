// src/js/App.js
import { getData } from "./services/peticion-API.js";
import { localCharacters, localConcepts, localLocations, localStoryLines } from "../data/localData.js";
import { renderApp } from './ui/renderers.js';

// Elementos principales
const app = document.getElementById('app');

// Estados
let currentSection = 'characters';

// Mapa de secciones a sus respectivos datos locales
const localDataMap = {
  'characters': localCharacters,
  'locations': localLocations,
  'concepts': localConcepts,
  'storylines': localStoryLines
};

// Función genérica para obtener datos
const getCombinedData = async (section) => {
  try {
    // Obtener datos de la API
    const apiResponse = await getData(`https://api.batmanapi.com/v1/${section}`);
    const apiData = apiResponse.data || [];
    
    // Obtener datos locales
    const localData = (localDataMap[section] || []).map(item => item.data);
    
    // Combinar y eliminar duplicados por ID
    return [...localData, ...apiData].reduce((acc, current) => {
      if (!acc.some(item => item.id === current.id)) {
        acc.push(current);
      }
      return acc;
    }, []);
  } catch (error) {
    console.error(`Error al cargar ${section}:`, error);
    // En caso de error, devolver los datos locales como respaldo
    return (localDataMap[section] || []).map(item => item.data);
  }
};

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
  renderApp(app, currentSection, getCombinedData);
});