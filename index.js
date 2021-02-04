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
 * @type {NodeListOf<Element>}
 */
let trelloLists;


/**
 * @param {Element} element 
 * @param {number} storyPoints
 */
function insertStorePoints(element, storyPoints) {
  element.textContent = `${storyPoints} Story points`
}

/**
 * @param {Element} trelloList 
 */
function getListStoryPoints(trelloList) {
  let result = 0;

  trelloList
    .querySelectorAll('[class*="plugin-color-"].badge')
    .forEach((badge) => {
      const [icon, text] = badge.children

      const hasExpectedIcon = icon
        .style
        .backgroundImage
        ?.startsWith('url("https://getcorrello.com/manifests/agiletools/images/icon-points-');

      if (hasExpectedIcon) result += +text.textContent;
    })

  return result
}

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
    insertStorePoints(
      trelloList.querySelector(`#${htmlIDs.amountStoryPointsList}`),
      getListStoryPoints(trelloList)
    );
  })
}

updateTrelloLists();
setInterval(updateTrelloLists, intervalsTimeout.trelloLists);

setInterval(calculateStoryPoints, intervalsTimeout.trelloStoryPoints);
