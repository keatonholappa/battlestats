function clearForm() {

  // clear all of the text input fields
  var inputs, index;
  inputs = document.getElementsByTagName('input');
  for (index = 0; index < inputs.length; ++index) {
    if(inputs[index].id.includes("NumDice")){
       inputs[index].value="0";
    } else {
    inputs[index].value="";
    }
  }
  
  // reset the radio buttons
  var inputs, index;
  inputs = document.getElementsByTagName('radioButton');
  for (index = 0; index < inputs.length; ++index) {
    inputs[index].checked=false;
  }
  
  //set dropdowns to their default values
  var inputs, index;
  inputs = document.getElementsByTagName('dropdown');
  for (index = 0; index < inputs.length; ++index) {
    inputs[index].val('0');
  }
  
  // clear the error message
  document.getElementById("errorMsg").innerHTML="";
}
