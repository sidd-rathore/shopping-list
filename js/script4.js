const addButton = document.querySelector('.btn');
const itemList = document.querySelector('.items');
const itemInput = document.querySelector('.form-input');

// creating function to add new items into the list
const addItem = (e) => {
  e.preventDefault();
  let newItem = itemInput.value;
  // checking for empty entries
  if (newItem === '') {
    alert('Please enter an item to be added.');
    return;
  }

  // settiing input value to blank after submit
  itemInput.value = '';
  let button = createButton('remove-item btn-link text-red');

  // creating list item
  let listItem = document.createElement('li');

  let span = document.createElement('span');
  span.appendChild(document.createTextNode(newItem));
  span.className = 'item-name';
  listItem.appendChild(span);
  listItem.appendChild(button);
  itemList.appendChild(listItem);
};

// fucntion to create a new item button
const createButton = (classes) => {
  let button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
};

// function to create icons
const createIcon = (classes) => {
  let icon = document.createElement('i');
  icon.className = classes;
};

// adding event listener to the submit button
addButton.addEventListener('click', addItem);
