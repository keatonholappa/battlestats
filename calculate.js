/* This file contains the functions required to calculate the results of the battle simulation
*
*/
function generatePlayer(playerType){
  
  alert("Generating Player: " + playerType);
  
  // get all of the desired values
  switch(playerType) {
      case("attacker"):
        var nameIds = ["attackerId","attackerBaseId","attackerWeaponId"];
        var baseStatIds = getInputIdsFromTable("baseAttackStatsTable",1);
        break;

      case("defender"):
        var nameIds = ["defenderId","defenderBaseId"];
        var baseStatIds = getInputIdsFromTable("baseDefenceStatsTable",1);
        break;    
  }

  // get the name values
  var allNames = getValuesFromInputs(nameIds);  
  
  alert("calculated ALL property values");
  
  // create a new player object and its properties
  var player = { 
    playerType   : playerType,
    buildName    : nameIds[0],
    attackType   : getAttackType(),
    charName     : nameIds[1],
    baseStats    : getValuesFromInputs(baseStatIds),
    weaponName   : nameIds[2],
    numModAttacks: 0, // integer for number of modified stats entered
    modNames     : ["empty"], // array of input fields after modified head
    modStats     : [0] // array of arrays of all modified stats
  };
  
  alert(playerType + " generated");
  return player;
}


// define a function to get values from all of the name input fields
function getValuesFromInputs(inputIds) {
  var allValues = [];
  for(var index = 0; index < inputIds.length; ++index) {
    allValues[index] = document.getElementById(inputIds[index]).value;
  }
  return allValues;
}


// defines a function to get the value in every input field
function getInputFieldValues(){
  var inputs, index;
  var allInputs = [];
  inputs = document.getElementsByTagName('input');
  for (index = 0; index < inputs.length; ++index) {
    allInputs[index] = inputs;
  }
  return allInputs;
}


// defines a function to get the Ids of all cells inside of a table
function getInputIdsFromTable(tableId,rowNum) {
  var allInputIds = [];
  var row = document.getElementById(tableId).rows[rowNum];
  for(var index = 0; index < row.length; ++index) {
    allInputIds[index] = row.cells[index].id;
  }
  return allInputIds; 
}


// defines a function to determine if the attacker is using melee or ranged attacks
function getAttackType() {
  var meleeAttack, rangedAttack, attackType;
  meleeAttack = document.getElementById('meleeAttack');
  rangedAttack = document.getElementById('rangedAttack');
  
  // get which one is selected
  if (meleeAttack.checked == true) {
    attackType = "melee";
  } else if (rangedAttack.checked == true) {
    attackType = "ranged";
  } else {
    writeErrorMsg("Please select and Attack Type");
    attackType = "";
  }
  return attackType;
}


// defines a function to roll a die
function calculateDieRoll(qty, type, modifier) { 
  // correct for the d# value
  type = type.replace('d','');
  
  // ensure values are numbers
  qty = Number(qty);
  type = Number(type);
  modifier = Number(modifier);
  
  // loop for qty and roll die/dice
  var totalRoll = 0;
  for (var index = 0; index < qty; ++index) {
    var roll = Math.floor(Math.random() * type) + 1 + modifier;
    totalRoll = Number(totalRoll + roll);
  }
  return totalRoll;
}


// defines a function to calculate the results of the battle simulation
function calculateOutput() {
  
  // clear any errors
  writeErrorMsg("");
  
  // create the players
  if(inputEmpty("attackerId") || inputEmpty("defenderId")){
    writeErrorMsg("You must enter values for the attacker and defender");
  } else {
    var attacker = generatePlayer("attacker");
    var defender = generatePlayer("defender");
  }
  
  alert("created players");
  alert(attacker.baseStats);
  
  // do the analytics
  createTable(attacker.baseStats);
  alert("done");
}
  

// defines a function to check if a input field is empty
function inputEmpty(inputId){
  if(document.getElementById(inputId).value == "") {
   return true; 
  } else {
    return false;
  }
}


// defines a function to write the error to errorMsg
function writeErrorMsg(error) {
  document.getElementById("errorMsg").innerHTML = error;
}


function createTable(cells) {
  var numCells = cells.length;

  var table = document.createElement("TABLE");
  table.setAttribute("id", "myTable");
  document.body.appendChild(table);

  var y = document.createElement("TR");
  y.setAttribute("id", "myTr");
  document.getElementById("myTable").appendChild(y);

  for(var index = 0; index < numCells; ++index) {
    var z = document.createElement("TD");
    var t = document.createTextNode(cells[index]);
    z.appendChild(t);
    document.getElementById("myTr").appendChild(z);
  }
}
