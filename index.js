/**
 * Original Maintained version by Grégory Esberci @GregoryEsberci and Guilherme Theodoro @JoelGamer
 */

const intervalsTimeout = {
  trelloLists: 9000,
  trelloStoryPoints: 3000,
}

const htmlIDs = {
  amountStoryPointsList: 'total-story-points-list'
}

/**
 * @param {Element} element 
 */
function getListStoryPoints(element) {
  element
}

/**
 * @param {Element} element 
 * @param {number} storyPoints
 */
function insertStorePoints(element, storyPoints) {
  element.textContent = `${storyPoints} Story points`
}

/**
 * @type {NodeListOf<Element>}
 */
let trelloLists;

function updateTrelloLists() {
  trelloLists = document.querySelectorAll('.list-wrapper:not(.mod-add)');

  trelloLists.forEach((trelloList) => {
    const storyPointQuantityHTML = (
      trelloList.querySelector(`#${htmlIDs.amountStoryPointsList}`) ||
      document.createElement('p')
    );

    storyPointQuantityHTML.id = htmlIDs.amountStoryPointsList;
    storyPointQuantityHTML.className = 'list-header-num-cards'

    insertStorePoints(
      storyPointQuantityHTML,
      +document.createElement('p').textContent || 0
    );

    trelloList.querySelector('.list-header').appendChild(storyPointQuantityHTML)
  })
}

function calculateStoryPoints() {
  trelloLists.forEach((trelloList) => {
    const totalStoryPoints = Array.from(
      trelloList.querySelectorAll('.js-plugin-badges .badge-text')
    ).reduce((total, storyPoints) => total + +storyPoints.textContent, 0);

    insertStorePoints(
      trelloList.querySelector(`#${htmlIDs.amountStoryPointsList}`),
      totalStoryPoints
    );
  })
}

updateTrelloLists();
setInterval(updateTrelloLists, intervalsTimeout.trelloLists);

setInterval(calculateStoryPoints, intervalsTimeout.trelloStoryPoints);
