/* This file contains the functions required to calculate the results of the battle simulation
*
*/


// defines a function to calculate the results of the battle simulation
function calculateOutput() {
  
  // clear any errors
  writeErrorMsg("");
  
  // create the players
  if(inputEmpty("attackerId") || inputEmpty("defenderId")){
    writeErrorMsg("You must enter values for the attacker and defender");
  } else {
    var build1 = generatePlayer("build1");
    var build2 = generatePlayer("build2");
  }
  
  // do the analytics
  createTable("outputSection",attackingPlayer.baseStats);
  doAnalytics(build1, build2);

}


// defines a function to do the analytics and print them to the Results section of the HTML
function doAnalytics(player1, player2) {
  // get the number of battles that should performed
  var numBattles = document.getElementById("inputNumBattles").value;

  // perform the battles
  var battleComplete = 0;
  while (!battleComplete) {
    var battleResults = doBattle(player1,player2,numBattles);
    battleComplete = battleResults.complete;
  }
}


// defines a function to do a single battle
function doBattle(player1,player2,numBattles) {
  // define which stats are which in the baseStats array
  
  alert(player1.baseStats);
  
  var stats = {
    speed         : 0;
    strength      : 1;
    meleeAttack   : 2;
    rangedAttack  : 3;
    defense       : 4;
    armor         : 5;
    command       : 6;
    hp            : 7;
  }

  var finalResults = {
    player1NumWins        : [];
    player1DmgPerTurn     : [];
    player1AvgDmgPerTurn  : [];
    player1HitsToDeath    : [];
    player1AvgHitsToDeath : [];
    player1Accuracy       : [];
    player1AvgAccuracy    : [];

    player2NumWins        : [];
    player2DmgPerTurn     : [];
    player2AvgDmgPerTurn  : [];
    player2HitsToDeath    : [];
    player2AvgHitsToDeath : [];
    player2Accuracy       : [];
    player2AvgAccuracy    : [];


    avgNumRounds          : [];
    complete              : 0;
  }

  var player1RunningResults = {
    damageDealt     : [];
    successfulHits  : [];
  };
  var player2RunningResults = {
    damageDealt     : [];
    successfulHits  : [];
  };

  // keep performing turns until one player is dead
  var counter = 0;
  var listNumRounds = [];
  // keep running battles until numBattles is reached
  while (counter < numBattles) {
    
    // do a single battle
    var battleRounds = 0;

    // create attacking and defending players, player 1 attacks first
    var attackingPlayer = {
      player        : player1;
      hp            : player1.baseStats[stats.hp];
      baseRollTable : "baseRollTable1";
      weaponTable   : "weaponTable1";
    }

    var defendingPlayer = {
      player        : player2;
      hp            : player2.baseStats[stats.hp];
      baseRollTable : "baseRollTable2";
      weaponTable   : "weaponTable2";
    }

    // loop for the battle, until a player has no health left
    while (player1.stats.hp > 0 || player2.stats.hp > 0) {
      // get the base roll for attackingPlayer
      var attackRoll = attackingPlayer.baseStats[attackingPlayer.player.attackType] + calculateDieRoll(attackingPlayer.baseRollTable);
      // get the base roll for player 2
      var defenseRoll= defendingPlayer.baseStats[stats.defense]+ calcualteDieRoll(defendingPlayer.baseRollTable);
      // check if player 1 hit player 2
      var hit = 0;
      if (attackRoll > defenseRoll) {
        hit = 1;
        // roll for damage
        var damage = calculateDieRoll(attackingPlayer.weaponTable);

        // deduct the damage from the HP of defendingPlayer
        defendingPlayer.hp = defendingPlayer.baseStats[defensePlayer.player.hp] - damage;
      } 

      // with an attack attempt made, swap the players
      var a = attackingPlayer;
      var b = defendingPlayer;
      a.player = [b.player, b.player=a.player][0];
      a.baseRollTable = [b.baseRollTable, b.baseRollTable=a.baseRollTable][0];
      a.weaponTable = [b.weaponTable, b.weaponTable=a.weaponTable][0];
      a = [b, b=a][0]; 

      // increment the battleRounds
      ++battleRounds;
      listNumRounds.push(battleRounds);

      // get the stats for the round
      // player 1 attacked this round
      if (isOdd(battleRounds)) {
        // if this would be the last round, who would win?
        ++finalResults.player1NumWins;
        // how much damage was dealt?
        player1RunningResults.damageDealt.push(damage);
        // update the hit counter
        player1RunningResults.successfulHits.push(hit);

      // player 2 attacked this round
      } else if (!isOdd(battleRounds)) {
        // if this would be the last round, who would win?
        ++finalResults.player2NumWins;
        // how much damage was dealt?
        player2RunningResults.damageDealt.push(damage);
        // update the hit counter
        player2RunningResults.successfulHits.push(hit);

      } else {
        // throw an error, this should never happen
        alert("error in calculating battle winner");
      }
    }

    // get the battle stats

    player1NumWins        : [];
    player1DmgPerTurn     : [];
    player1AvgDmgPerTurn  : [];
    player1HitsToDeath    : [];
    player1AvgHitsToDeath : [];
    player1Accuracy       : [];
    player1AvgAccuracy    : [];

    // create an array of the damage dealt per turn
    finalResults.player1DmgPerTurn.push(avg(player1RunningResults.damageDealt));
    finalResults.player2DmgPerTurn.push(avg(player2RunningResults.damageDealt));

    // create an array of the number of hits taken until each player died

    

    // get the accuracy of each player

    

    // with a battle performed, update the results stats

 
    // increment the counter for each battle performed
    ++counter;
  }

  // get the average number of hits taken until the player died


  // get the average accuracy of each player
  

  // get the average number of rounds performed for every battle
  finalResults.avgNumRounds = avg(listNumRounds);

  // with the calculation performed, return the results
  finalResults.complete = 1;
  return results;

}


// defines a function to determine if a number is odd
function isOdd(num) { return num % 2;}
  

// defines a function to get the average value of an array
function avg(array) {
  var total = 0;
  for (var index = 0; index < array.length; ++index;) {
      total+= arrayu[index];
  }
  var avg = total/array.length;
  return avg;
}

// defines a function to generate a player object, and populate the player with the stats from the input fields
function generatePlayer(playerType) {
  
  // get all of the desired values
  switch(playerType) {
      case("build1"):
        var nameIds = ["build1","build1BaseId","build1WeaponId"];
        var baseStatIds = getInputIdsFromTable("baseStatsTable1",1);
        break;

      case("build2"):
        var nameIds = ["build2","build2BaseId","build2WeaponId"];
        var baseStatIds = getInputIdsFromTable("baseStatsTable2",1);
        break;    
  }

  // get the name values
  var allNames = getValuesFromInputs(nameIds);  
  
  // create a new player object and its properties
  var player = {
    playerType   : playerType,
    buildName    : allNames[0],
    attackType   : getAttackType(playerType),
    charName     : allNames[1],
    baseStats    : getValuesFromInputs(baseStatIds),
    weaponName   : allNames[2],
    numModAttacks: 0, // integer for number of modified stats entered
    modNames     : ["empty"], // array of input fields after modified head
    modStats     : [0] // array of arrays of all modified stats
  };
  
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
function getInputFieldValues() {
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
  for(var index = 0; index < row.cells.length; ++index) {
    allInputIds[index] = row.cells[index].children[0].id;
  }
  return allInputIds; 
}


// defines a function to determine if the attacker is using melee or ranged attacks
function getAttackType(playerType) {
  var meleeAttack, rangedAttack, attackType;
  meleeAttack1 = document.getElementById('meleeAttack1');
  meleeAttack2 = document.getElementById('meleeAttack2');
  rangedAttack1 = document.getElementById('rangedAttack1');
  rangedAttack2 = document.getElementById('rangedAttack2');
  
  // get which one is selected
  if ((meleeAttack1.checked == true && playerType == "build1") || (meleeAttack2.checked == true || playerType == "build2")) {
    attackType = "melee";
  } else if ((rangedAttack1.checked == true && playerType == "build1") || rangedAttack2.checked == true || playerType == "build2")) {
    attackType = "ranged";
  } else {
    writeErrorMsg("Please select and Attack Type");
    attackType = "";
  }
  return attackType;
}


// defines a function to roll a die
function calculateDieRoll(tableId) { 
  var allTableIds = getInputIdsFromTable(tableId,1);
  //get all the values
  var values = [];
  for (var index = 0; index < allTableIds.length; ++index) {
    values = document.getElementById(allTableIds[index]).value;
  }
  
  // ensure values are numbers
  var qty = Number(values[0]);
  var type = Number(values[1].replace('d',''));
  var modifier = Number(values[2]);
  
  // loop for qty and roll die/dice
  var totalRoll = 0;
  for (var index = 0; index < qty; ++index) {
    var roll = Math.floor(Math.random() * type) + 1 + modifier;
    totalRoll = Number(totalRoll + roll);
  }
  return totalRoll;
}


// defines a function to check if a input field is empty
function inputEmpty(inputId) {
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


function createTable(divId,cells) {
  var numCells = cells.length;
  var divSection = document.getElementById(divId);

  var table = document.createElement("TABLE");
  table.setAttribute("id", "myTable");
  document.body.appendChild(table);

  for(var index = 0; index < numCells; ++index) {
    var z = document.createElement("TD");
    var t = document.createTextNode(cells[index]);
    z.appendChild(t);
    divSection.appendChild(z);
  }
}
