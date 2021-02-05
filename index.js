/**
 * Original Maintained version by Grégory Esberci @GregoryEsberci and Guilherme Theodoro @JoelGamer
 */

const intervalsTimeout = {
  trelloLists: 9000,
  trelloStoryPoints: 3000
}

const htmlIDs = {
  amountStoryPointsList: 'total-story-points-list'
}

/**
 * @type {NodeListOf<Element>}
 */
let trelloLists;

/**
 * @param {Element} trelloList 
 */
function getListStoryPoints(trelloList) {
  let result = 0;

  trelloList
    .querySelectorAll('[class*="plugin-color-"].badge')
    .forEach((badge) => {
      const [icon, text] = badge.children;

      const hasExpectedIcon = icon
        .style
        .backgroundImage
        ?.startsWith('url("https://getcorrello.com/manifests/agiletools/images/icon-points-');

      if (hasExpectedIcon) result += +text.textContent;
    })

  return result;
}

function updateTrelloLists() {
  trelloLists = document.querySelectorAll('#board .list-wrapper:not(.mod-add) .list');

  trelloLists.forEach((trelloList) => {
    if (trelloList.querySelector(`#${htmlIDs.amountStoryPointsList}`)) return;

    const storyPointQuantityHTML = document.createElement('p');

    storyPointQuantityHTML.id = htmlIDs.amountStoryPointsList;
    storyPointQuantityHTML.className = 'list-header-num-cards';

    trelloList.querySelector('.list-header').appendChild(storyPointQuantityHTML);

    insertTotalStoryPoints(trelloList);
  })
}

/**
 * @param {Element} trelloList 
 */
function insertTotalStoryPoints(trelloList) {
  const storyPointsTextElement = trelloList.querySelector(`#${htmlIDs.amountStoryPointsList}`);
  const totalStoryPoints = getListStoryPoints(trelloList);

  storyPointsTextElement.textContent = `${totalStoryPoints} Story points`;
}

updateTrelloLists();
setInterval(updateTrelloLists, intervalsTimeout.trelloLists);

setInterval(
  () => trelloLists.forEach(insertTotalStoryPoints),
  intervalsTimeout.trelloStoryPoints
)
