const input = document.querySelector('.input');
const choices = document.querySelector('.select');
const submit = document.querySelector('.submit');
const getLocalStorage = document.querySelector('.get');
const deleteLocalStorage = document.querySelector('.del');
const display = document.querySelector('.display');
const objectArray = [];

const personFactory = (name, type) => {
  const saveData = (array) =>
    localStorage.setItem('name', JSON.stringify(array));
  return { name, type, saveData };
};

function makeHideButton() {
  if (document.querySelector('.hide')) return;

  const btn = document.createElement('button');
  btn.textContent = 'Hide Characters';
  btn.setAttribute('class', 'hide');
  display.appendChild(btn);
  btn.addEventListener('click', () => {
    display.textContent = '';
  });
}

function retrieveLocalStorage() {
  // clear display on get character button to prevent duplicating the list
  display.textContent = '';

  if (!localStorage.getItem('name')) {
    display.textContent = 'Nothing to show';
  } else {
    const items = localStorage.getItem('name');
    const test = JSON.parse(items);
    const newArray = test.map(
      (item) => `Name: ${item.name} Type: ${item.type}`
    );

    // add each object as a list item
    for (let i = 0; i < newArray.length; i += 1) {
      const el = document.createElement('li');
      el.textContent += newArray[i];
      display.appendChild(el);
    }
    makeHideButton();
  }
}

getLocalStorage.addEventListener('click', retrieveLocalStorage);

deleteLocalStorage.addEventListener('click', () => {
  if (!localStorage.getItem('name')) return;
  localStorage.removeItem('name');
  display.textContent = '';
});

function sanatizeInput(name) {
  const tempDiv = document.createElement('div');
  tempDiv.textContent = name;
  return tempDiv.innerHTML;
}

function getCharacterData() {
  const name = input.value;
  const type = choices.value;
  const sanatizedName = sanatizeInput(name);
  const newCharacter = personFactory(sanatizedName, type);
  objectArray.push(newCharacter);

  // Retrieve existing data from localStorage
  const existingData = localStorage.getItem('name');
  const dataArray = existingData ? JSON.parse(existingData) : [];
  // Add the new data to the existing data array
  dataArray.push(newCharacter);
  // Save the updated data array to localStorage
  localStorage.setItem('name', JSON.stringify(dataArray));
}

submit.addEventListener('click', () => {
  if (!input.value) return;
  getCharacterData();
  input.value = '';
});
