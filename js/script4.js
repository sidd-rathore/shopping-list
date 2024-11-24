const addButton = document.querySelector('.btn');
const itemList = document.querySelector('.items');
const itemInput = document.querySelector('.form-input');
const clearBtn = document.getElementById('clear');

const itemFilter = document.getElementById('filter');

let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

// creating function to add new items into the list
const onaddItemSubmit = (e) => {
  e.preventDefault();
  let newItem = itemInput.value;
  // checking for empty entries
  if (newItem === '') {
    alert('Please enter an item to be added.');
    return;
  }

  // Check for submit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');
    // console.log(itemToEdit);
    removeItemfromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.parentElement.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert('That item already exists!');
      return;
    }
  }

  // settiing input value to blank after submit
  itemInput.value = '';

  // create item DOM element
  addItemToDOM(newItem);

  // add item to local storage
  addItemToStorage(newItem);

  checkUI();
};

// function to add items to the DOM
function addItemToDOM(item) {
  let button = createButton('remove-item btn-link text-red');

  // creating list item
  let listItem = document.createElement('li');

  let span = document.createElement('span');
  span.appendChild(document.createTextNode(item));
  span.className = 'item-name';
  listItem.appendChild(span);
  listItem.appendChild(button);
  itemList.appendChild(listItem);
}

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

// function to add items to the local storage
function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage(item) {
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}

// function to edit or remove item

const onClickItem = (e) => {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else if (e.target.parentElement.parentElement.classList.contains('items')) {
    setItemToEdit(e.target);
  }
};

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}

// function to edit item

const setItemToEdit = (item) => {
  isEditMode = true;

  itemList.querySelectorAll('li').forEach((i) => {
    i.firstChild.classList.remove('edit-mode');
  });
  item.classList.add('edit-mode');

  addButton.innerHTML = '<i class = "fa-solid fa-pen"></i> Update Item';
  addButton.style.backgroundColor = '#22BB22';
  itemInput.value = item.textContent;
  itemInput.focus();
};

// function to remove items from the list
const removeItem = (item) => {
  // if (e.target.parentElement.tagName === 'BUTTON') {
  //   e.target.parentElement.parentElement.remove();
  // }
  if (confirm('Are you sure?')) {
    // remove item from DOM
    item.remove();

    // remove item form local storage
    removeItemfromStorage(item.textContent);
    checkUI();
  }
};

// function to remove items from storage

const removeItemfromStorage = (itemToRemove) => {
  let itemsFromStorage = getItemsFromStorage();
  // let index = itemsFromStorage.indexOf(item);
  // if (index !== -1) {
  //   itemsFromStorage.splice(index, 1);
  // }
  // localStorage.setItem('items', JSON.stringify(itemsFromStorage));

  itemsFromStorage = itemsFromStorage.filter((item) => {
    if (item !== itemToRemove) {
      return item;
    }
  });
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

// function to clear all of the list items
const clearItems = () => {
  if (confirm('Do you want to clear all items?')) {
    while (itemList.firstChild) {
      itemList.firstChild.remove();
    }

    // Clear from local storage
    localStorage.removeItem('items');
  }

  checkUI();
};

// function to filter items based on the filter input
const filterItems = (e) => {
  const text = itemFilter.value.toLowerCase();
  const items = itemList.querySelectorAll('li');
  for (const item of items) {
    const itemName = item.innerText.toLowerCase();
    if (!itemName.includes(text)) {
      item.style.display = 'none';
    } else {
      item.style.display = 'flex';
    }
  }
};

// function to check if the list is empty and if it is then hidding the filter and clear button
const checkUI = () => {
  itemInput.value = '';

  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }

  addButton.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  addButton.style.backgroundColor = '#333';

  isEditMode = false;
};

// Initialize app

function init() {
  // adding event listener to the submit button
  addButton.addEventListener('click', onaddItemSubmit);

  // event listener for the list items
  itemList.addEventListener('click', onClickItem);

  // adding event listener for the clear all button
  clearBtn.addEventListener('click', clearItems);

  // event listener for the filter input
  itemFilter.addEventListener('input', filterItems);

  // event listener when content is loaded
  document.addEventListener('DOMContentLoaded', displayItems);

  checkUI();
}

init();
