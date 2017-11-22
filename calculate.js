/* This file contains the functions required to calculate the results of the battle simulation
*
*/
/**
function generatePlayer(playerType){
  // initialize vars
  var buildNameVal = [], baseLims = [], modLims = [];
  
  // set the correct values based on the playerType
  switch(playerType) {
    alert("looking for player type");
    case(playerType == "attacker"):
      alert("creating attacker player");
      buildNameVal = [0];
      baseLims = [2,9];
      modLims = [13,20];
      break;
      
    case(playerType == "defender"):
      alert("creating defender player");
      buildNameVal = [26];
      baseLims = [28,35];
      modLims = [39,46];
      break;
  }
  
  alert(playerType);
  
  // create a new player object and its properties
  var player = { 
    buildName: getDesiredValues(buildNameVal),
    attackType: getAttackType(),
    baseStats: getDesiredValues(baseLims),
    modifiedStats: getDesiredValues(modLims)
  };
}


// defines a function to separate out the desired input value
function getDesiredValues(limits){
  var lowerLimit = limits[0];
  var upperLimit[];
  
  // if only 1 value is put into the function, correct for the for loop
  if(limits[1] === undefined) {
    upperLimit = lowerLimit + 1;
  } else {
    upperLimit = limits[1];
  }
  
  // get all values
  var allValues = getInputFieldValues(); 
  var desiredValues = [];
  // get only the desired values
  for (var index = lowerLimit; index < upperLimit; ++index) {
    if(inputEmpty(allValues[index])){
      writeErrorMsg(this.buildName + " is missing an input value.");
      desiredValues[index] = 0;
    } else {
      desiredValues[index] = allValues[index];
    }
  }
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

**/
// defines a function to calculate the results of the battle simulation
function calculateOutput() {
  
  // clear any errors
  writeErrorMsg("");
  
  // create the players
  if(inputEmpty("attackerId") || inputEmpty("defenderId")){
    writeErrorMsg("You must enter values for the attacker and defender");
  } else {
    generatePlayer("attacker");
    generatePlayer("defender");
  }
  
  // do the analytics
  //writeErrorMsg(attacker.buildName);
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
