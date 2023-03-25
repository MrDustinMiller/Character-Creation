const input = document.querySelector('.input');
const submit = document.querySelector('.submit');
const getLocalStorage = document.querySelector('.get');
const deleteLocalStorage = document.querySelector('.del');
const display = document.querySelector('.display');
const objectArray = [];

function MakeCharacter(name, type) {
  this.Character = { name, type };
}

MakeCharacter.prototype.save = (array) => {
  localStorage.setItem('name', JSON.stringify(array));
};

function retrieveLocalStorage() {
  const items = localStorage.getItem('name');
  display.textContent = items;

  if (!localStorage.getItem('name')) {
    display.textContent = 'Nothing to show';
  }
}

getLocalStorage.addEventListener('click', retrieveLocalStorage);
deleteLocalStorage.addEventListener('click', () => {
  localStorage.removeItem('name');
  display.textContent = '';
});

function sanatizeInput(name) {
  const tempDiv = document.createElement('div');
  tempDiv.textContent = name;
  return tempDiv.innerHTML;
}

function getCharacterInfo() {
  const name = input.value;
  const type = 'Wizzy';
  const sanatizedName = sanatizeInput(name);
  const newCharacter = new MakeCharacter(sanatizedName, type);
  objectArray.push(newCharacter);
  newCharacter.save(objectArray);
}

submit.addEventListener('click', () => {
  if (!input.value) return;
  getCharacterInfo();
  input.value = '';
});
