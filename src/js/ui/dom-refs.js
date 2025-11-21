const domRefs = () => {
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
  return {
    mainTitle,
    navCharacters,
    navLocations,
    navConcepts,
    navStorylines,
    carouselSection,
    carouselContainer,
    loader,
    errorMessage,
    contentContainer
  }
}

export default domRefs
