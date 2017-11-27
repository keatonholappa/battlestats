
function newModifiedInputSection(divIdToAppendTo,sectionName,numModifierSections) {
  
  // increment the number of modifier sections
  ++numModifierSections;
  
  // create the accordion
  var accordionDiv = document.createElement("DIV");
  accordionDiv.className = "accordion";
  
  // create the header with the input field
  var divTitle = document.createElement("H3");
  divTitle.className = "divTitle";
  divTitle.innerHTML = "Modified " + divIdToAppendTo + ":";
  
  var nameInput = document.createElement("INPUT");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("name", "input");
  var nameInputId = sectionName + "ModifierId_" + numModifierSections;
  nameInput.setAttribute("id", nameInputId);
  nameInput.setAttribute("placeholder", "Armor, Vehicle, Buff, etc.");
  
  // create the div which is the accordion
  var foldingDiv = document.createElement("DIV");
  
  // create the statsTable
  var statsTable = document.createElement("TABLE");
  statsTable.className = "statsTable";
  var statsTableId = sectionName + "ModifierStatsTable_" + numModifierSections;
  statsTable.setAttribute("id",statsTableId);
  var statsTableHeaderCells = ["Speed","Strength","Melee Attack","Ranged Attack","Defense","Armor","Commadn","Total HP"];
  fillTable(statsTable, statsTableHeaderCells, "stats");
  
  // create the diceTable
  var rollTable = document.createElement("TABLE");
  rollTable.className = "statsTable";
  var rollTableId = sectionName + "ModifierRollTable_" + numModifierSections;
  rollTable.setAttribute("id",rollTableId);
  var rollTableHeaderCells = ["Number of Dice","Type of Dice","Roll Modifier"];
  fillTable(rollTable, rollTableHeaderCells, "roll");
  
  // append the elements in the correct order
  foldingDiv.appendChild(statsTable);
  foldingDiv.appendChild(rollTable);
  divTitle.appendChild(nameInput);
  accordionDiv.appendChild(divTitle);
  accordionDiv.appendChild(foldingDiv);
  var divToAppendTo = document.getElementById(divIdToAppendTo);
  var lastChild = divToAppendTo.childNodes.length;
  divToAppendTo.insertBefore(accordionDiv,divToAppendTo.childNodes[lastChild-2]);
  
  // return the new number of modifier sections
  //return numMOdifierSections;
  
}


// a function to fill a table with TR elements and cells
function fillTable(parentTable, headerElements, tableType) {
  
  var numRows = 2;
  var numCells = headerElements.length
  
  // add new rows
  for (var rowIndex = 0; rowIndex < numRows; ++rowIndex) {
    // add a row elements
    var newRow = parentTable.insertRow(rowIndex);
    
    // add the cells
    switch (rowIndex) {

      // add the headers
      case 0:
        for (var cellIndex = 0; cellIndex < numCells; ++cellIndex) {
          var newCell = newRow.insertCell(cellIndex);
          newCell.innerHTML = headerElements[cellIndex];
        }
        break;

      // add the inputs 
      case 1:

        switch (tableType) {
          case "stats":  
            for (var cellIndex = 0; cellIndex < numCells; ++cellIndex) {
              var newCell = newRow.insertCell(cellIndex);
              var inputField = document.createElement("INPUT");
              inputField.setAttribute("type", "text");
              inputField.setAttribute("name", "input");
              inputField.setAttribute("placeholder","0");
              newCell.appendChild(inputField);
            }
        
            break;

          case "roll":
            for (var cellIndex = 0; cellIndex < numCells; ++cellIndex) {
              var newCell = newRow.insertCell(cellIndex);
              
              switch (cellIndex) {
                case 0:
                case 2:
                  var inputField = document.createElement("INPUT");
                  inputField.setAttribute("type", "text");
                  inputField.setAttribute("name", "input");
                  inputField.setAttribute("value","0");
                  newCell.appendChild(inputField);
                break;

                case 1:
                var selector = document.createElement("select");
                var diceTypes = ["d4","d6","d8","d10","d12","d20"]
                for (var optionIndex = 0; optionIndex < diceTypes.length; ++optionIndex) {
                  var newOption = document.createElement("option");
                  newOption.text = diceTypes[optionIndex];
                  selector.add(newOption);
                }
                break;
              }
            }
            break;
        }
        break;
    }
  }
}

