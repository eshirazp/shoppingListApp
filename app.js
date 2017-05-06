var grocList = {
  items: [
    {displayName: 'apples', checkedOff: false}, 
    {displayName: 'oranges', checkedOff: false},
    {displayName: 'milk', checkedOff: true},
    {displayName: 'bread', checkedOff: false}
  ]
};

var listItemTemplate = (
  '<li>' +
    '<span class="shopping-item js-shopping-item"></span>' +
    '<div class="shopping-item-controls">' +
      '<button class="js-shopping-item-toggle">' +
        '<span class="button-label">check</span>' +
      '</button>' +
      '<button class="js-shopping-item-delete">' +
        '<span class="button-label">delete</span>' +
      '</button>' +
    '</div>' +
  '</li>'
);


/*--------------------------------------------------
DOM MANIPULATION
----------------------------------------------------*/
function renderDOM(grocList) {
  var itemsHTML = grocList.items.map(
    function(item, index) {
      var element = $(listItemTemplate);
      element.find('.js-shopping-item').text(item.displayName);
      if (item.checkedOff) {
        element.find('.js-shopping-item').addClass('shopping-item__checked');
      }
      return element;
    });
  $('.shopping-list').html(itemsHTML);
}

/*--------------------------------------------------
APPLICATION STATE FUNCTIONS
----------------------------------------------------*/
// Application State function to add item in grocery list 
function addItem(grocList, item) {
  if(item == '')
    return;

  grocList.items.push({
    displayName: item, 
    checkedOff: false
  });
}

// Application State function to check/uncheck item in grocery list
function updateItem(grocList, item) {
  var idx = getItem(grocList, item);
  grocList.items[idx].checkedOff = !grocList.items[idx].checkedOff;
}


// Application State function to delete item in grocery list
function deleteItem(grocList, item) {
  var idx = getItem(grocList, item);
  grocList.items.splice(idx, 1);
}

// Application State to get index of item in grocery list
function getItem(grocList, item) {
  for(var i = 0; i < grocList.items.length; i++) {
    if (grocList.items[i].displayName === item)
      return i;
  }
}


/*--------------------------------------------------
EVENT LISTENERS AND MAIN CONTROLLER
----------------------------------------------------*/
function controlMain() {
  // If user selects to add item on top of application
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    var value = $('#shopping-list-entry').val();
    addItem(grocList, value);
    printList();
  });

  //If user selects to check off item already in shopping list
  $('.shopping-list').on('click', '.shopping-item-toggle', function(event) {
    var value = $(this).closest('li').find('.shopping-item').text();
    updateItem(grocList, value);
    printList();
  });

  //If user selects to delete item already in shopping list
  $('.shopping-list').on('click', '.shopping-item-delete', function(event) {
    var value = $(this).closest('li').find('.shopping-item').text();
    deleteItem(grocList, value);
    printList();
  });
}

$(function() {
  controlMain();
});


/*--------------------------------------------------
DEBUGGING FUNCTIONS
----------------------------------------------------*/
function printList() {
  for(var i = 0; i < grocList.items.length; i++) {
    $('.container').append("<p>" + grocList.items[i].displayName + "</p>");
    $('.container').append("<p>" + grocList.items[i].checkedOff + "</p>");
  }
  $('.container').append("<p>-------</p>");
}