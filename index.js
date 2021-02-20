/**
  * Original Maintained version by Grégory Esberci @GregoryEsberci and Guilherme Theodoro @JoelGamer
  */	
const appendStoryPointElements = (storyPointsElements) => {
  storyPointsElements.forEach((storyPointsElement, listHeader) =>
    listHeader.appendChild(storyPointsElement)
  );
};

const isStoryPointsBandage = (element) => {
  if (element.children.length !== 2) return false;

  const [icon, text] = element.children;

  if (isNaN(+text.textContent)) return false;

  const hasExpectedIcon = icon.style.backgroundImage.startsWith(
    'url("https://getcorrello.com/manifests/agiletools/images/icon-points'
  );

  return hasExpectedIcon;
};

const getListHeader = (listHeader) => {
  let storyPointsTextElement = listHeader.querySelector('#total-story-points-list');

  if (storyPointsTextElement) return { storyPointsTextElement, isNew: false };

  storyPointsTextElement = document.createElement('p');

  storyPointsTextElement.id = 'total-story-points-list';
  storyPointsTextElement.className = 'list-header-num-cards';

  return { storyPointsTextElement, isNew: true };
};

const updateTrelloStoryPoints = () => {
  let storyPointsElements = new Map();
  let hasStoryPoints = false;

  document
    .querySelectorAll('#content #board .list-cards')
    .forEach((listCards) => {
      let storyPoints = 0;
      const listHeader = listCards.parentElement.querySelector('.list-header');
      const { storyPointsTextElement, isNew } = getListHeader(listHeader);

      listCards
        .querySelectorAll('.list-card:not(.hide) .list-card-details [class*="plugin-color-"].badge')
        .forEach((badge) => {
          if (isStoryPointsBandage(badge)) {
            storyPoints += +badge.children[1].textContent;
            hasStoryPoints = true;
          }
        });

      storyPointsTextElement.textContent = `${storyPoints} Story points`;

      if (isNew) storyPointsElements.set(listHeader, storyPointsTextElement);
    });

  if (hasStoryPoints) appendStoryPointElements(storyPointsElements);
};

setInterval(updateTrelloStoryPoints, 1000);
