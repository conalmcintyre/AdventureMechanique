var currentRoom = "start";
var commands = ["go", "take", "open", "inventory", "talk", "attack"];

function changeRoom (dir){
  if (rooms[currentRoom].directions[dir] !== undefined){
    currentRoom = rooms[currentRoom].directions[dir];
    $('#game-text').append(rooms[currentRoom].description);
  }
  else {
      $('#game-text').append("You cannot go that way");
  }
}

function showInventory(){
  if (inventory.length == 0){
    "You are not carrying anything";
  }
  else{
    $("#game-text").append("<ul>")
    $("#game-text").append("<li>You are currently carrying:</li>")
    for (var i = 0; i < inventory.length; i++){
      $("#game-text").append("<li>" + inventory[i] + ": " + inventoryDescriptions[i] + "</li>");
    }
    $("#game-text").append("</ul>")
  }
}

function takeItem(item){
  if (rooms[currentRoom].items[item] !== undefined){
    $("#game-text").append("<ul>")
    $('#game-text').append("<li>You have taken " + item + "</li>");
    $('#game-text').append("<li>" + rooms[currentRoom].items[item].description + "</li>");
    inventory.push(item);
    inventoryDescriptions.push(rooms[currentRoom].items[item].description);
  }
else {
    $('game-text').append("There is no " + item + " to take.");
  }
}

function describeItem (item){
  if (rooms[currentRoom].items[item] !== undefined){
    $('#game-text').append(rooms[currentRoom].items[item].comment);
  }
  else if (inventory.includes(item)) {
    $('#game-text').append("Your bag contains " + inventoryDescriptions[inventory.indexOf(item)]);
  }
  else {
    $('#game-text').append("I know not of this " + item);
  }
}

function executeCommand (input){
  $('#game-text').append("<p>");
  var command = input.split(" ")[0];
  switch (command) {
    case "go":
      changeRoom(input.split(" ")[1]);
      break;
    case "take":
      takeItem(input.split(" ")[1]);
      break;
    case "describe":
      describeItem(input.split(" ")[1]);
      break;
    case "inventory":
      showInventory();
      break;
    default:
      $("game-text").append("I don't know how to " + command);
  }
}


$(document).ready(function(){
  $('#game-text').append("<p>" + rooms.start.description + "</p>");
  $('#console-in').is(':focus');

  $(document).keypress(function(key){
    if (key.which === 13 && $('#console-in').is(':focus')){
      var value = $('#console-in').val().toLowerCase();
      document.getElementById("console-in").value = "";
      executeCommand(value);

    }
  })
})
