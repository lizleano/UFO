 // Find a <table> element with id="myTable":
var $table = document.querySelector("table")
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $dateInput = document.querySelector("#date");
var $durationInput = document.querySelector("#duration");
var $commentInput = document.querySelector("#comment");
var $addBtn = document.querySelector("#addbtn");


// Add an event listener to the searchButton, call handleAddButtonClick when clicked
$addBtn.addEventListener("click", handleAddButtonClick);

// Set filteredUFO to dataset initially
var $filteredUFO = dataSet;

// Create an empty <thead> element and add it to the table:
var $header = $table.createTHead();
var $tfoot = $table.createTFoot();
var $columnlist = Object.keys($filteredUFO[0])

// Create an empty <tr> element and add it to the first position of <thead>: 
var $rowh = $header.insertRow(0);

// Create an empty <tr> element and add it to the first position of <tfoot>: 
var $rowf = $tfoot.insertRow(0);

// var $searchpanel = document.querySelector("#searchpanel")

// Insert a new cell (<th>) at the first position of the "new" <tr> element:
for (c=0; c<$columnlist.length; c++){
  // Insert a new cell (<td>) at the first position of the "new" <tr> element:
  var $th = document.createElement("th");
  var $newString = $columnlist[c].replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase();});
  $th.innerHTML = $newString;
  $rowh.appendChild($th);

  // Insert a new cell (<td>) at the first position of the "new" <tr> element:
  $th = document.createElement("th");
  $th.innerHTML = $newString;
  $rowf.appendChild($th)

}

// Create an empty <tbody> element and add it to the table:
var $tbody = document.createElement("tbody");
$table.appendChild($tbody);

$tbody.innerHTML = "";

renderTable();

function validateDate(){
  var $validDate = true;
  var $errmsg = "";
  // check to see if the date is a valid format
    if (moment($('#date').val(), 'M/D/YYYY',true).isValid()){
      // check to see if it is a valid date
      // ISO string with invalid values
      try{
        var $ufodate = Date($('#date').val()).isISOString();
        console.log($ufodate);
      } catch (e) {
        if (e instanceof RangeError){       
          $validDate = false;
          $errmsg = "Invalid date. " + e.message;
        }
      }
    } else {
      $validDate = false;
      alert("Invalid date.  Enter date in m/d/yyyy format.")
    }

    return $errmsg;
}


function renderTable() {
  $tbody.innerHTML = "";
  console.log($filteredUFO.length);

  // renderTable renders the filteredUFOs to the tbody
  for (r=1; r<$filteredUFO.length; r++){
  // for (r=1; r<50; r++){
    // Get the current UFO object and its fields
    try {
      var $ufo = $filteredUFO[r];
      var $rowfields = Object.keys($ufo);


      var $row = $tbody.insertRow();

      for (c=0; c<$rowfields.length; c++){      
        // For every field in the ufo object, create a new cell at set its inner text to be the current value at the current address's field
        var $field = $rowfields[c];
        var $cell = $row.insertCell(c);


        $cell.innerText = $ufo[$field];
      }
    } catch(err) {
        console.log("Error in render Table:" + err)
    }
  }    
}


function handleAddButtonClick(){
  // alert("in add handle");
  var msg = validateDate();
  if (msg !== ''){
    alert(msg);
    return;
  }

  $dateInput.value = $('#date').val(),
  $cityInput.value = $('#city').val().trim(),
  $stateInput.value = $('#state').val(),
  $countryInput.value = $('#country').val().trim(),
  $shapeInput.value = $('#shape').val().trim(),
  $durationInput.value = $('#duration').val().trim(),
  $commentInput.value = $('#date').val().trim()

  var newdata = {
      datetime: $dateInput.value,
      city: $cityInput.value,
      state: $stateInput.value,
      country: $countryInput.value,
      shape: $shapeInput.value,
      durationMinutes: $durationInput.value,
      comments: $commentInput.value
    };
  
  // append new data to copy of dataset
  $filteredUFO.push(newdata);

  clearData();


  renderTable();

  alert("Successfully added a new UFO sighting.")
}

function clearData(){
  $dateInput.value="";
  $cityInput.value="";
  $stateInput.value="";
  $countryInput.value="";
  $shapeInput.value="";  
  $durationInput.value="";
  $commentInput.value="";
}