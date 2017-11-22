/* This file contains the functions required to calculate the results of the battle simulation
*
*/

function generatePlayers(playerType){
  
  // set the correct values based on the playerType
  switch(playerType) {
      case(playerType = "attacker"):
      var buildNameVal = 0;
      
      break;
      
      case(playerType = "defender"):
      
      
      break;
  
  // create a new player object and its properties
  var player = {
      buildName: getInputFieldValues(buildNameVal),
      attackType: getAttackType(),
      baseStats: getDesiredValues(),
      modifiedStats: getDesiredValues()
  };
  
  
}

// defines a function to separate out the desired input value
function getDesiredValues(){
  var allValues = getInputFieldValues(); 
  
}


// defines a function to get the value in every input field
function getInputFieldValues(){
  var inputs, index, allInputs;
  inputs = document.getElementsByTagName('input');
  for (index = 0; index < inputs.length; ++index) {
    allInputs[index] = inputs;
  }
  return allInputs;
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
    attackType = "null"; 
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
  
  // get the value of each input field
  getInputFieldValues();
}


// defines a function to write the error to errorMsg
function writeErrorMsg(error) {
  document.getElementById("errorMsg").innerHTML = error;
}
