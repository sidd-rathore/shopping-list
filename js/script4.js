const addButton = document.querySelector('.btn');
const itemList = document.querySelector('.items');
const itemInput = document.querySelector('.form-input');
const clearBtn = document.getElementById('clear');

const itemFilter = document.getElementById('filter');

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
  checkUI();
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
  return icon;
};

// function to remove items from the list
const removeItem = (e) => {
  // if (e.target.parentElement.tagName === 'BUTTON') {
  //   e.target.parentElement.parentElement.remove();
  // }
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
};

// function to clear all of the list items
const clearItems = () => {
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  checkUI();
};

// function to check if the list is empty and if it is then hidding the filter and clear button
const checkUI = () => {
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
};

// adding event listener to the submit button
addButton.addEventListener('click', addItem);
// event listener for the list items
itemList.addEventListener('click', removeItem);

// adding event listener for the clear all button

clearBtn.addEventListener('click', clearItems);

checkUI();
