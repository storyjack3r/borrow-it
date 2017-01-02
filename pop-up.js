//update with new preference uni library

document.body.onload = function() {

  chrome.storage.sync.get("uni", function(items) {
    if (!chrome.runtime.error) {
    	if(items.uni){
      var uniID = items.uni;
      var uniName = uniList[uniID].ID;
      // console.log(uniName);
      var statement = uniName;
      }
      else {
      	var statement = "no library selected..."
      }
      document.getElementById("current").innerText = statement;
    }
  });
}



function changeSelect() {
 
 // get the value from the selection menu
        var x = document.getElementById("uni").value;

		chrome.storage.sync.set({
			"uni" : x
		}, function() {
          // Notify that we saved.
                var uniName = uniList[x].ID;
    document.getElementById("current").innerHTML = uniName;
        });
      }

// function debuG() {

//   chrome.storage.sync.get("uni", function(items) {
//     if (!chrome.runtime.error) {
//       var uniID = items.uni;
//       var uniName = uniList[uniID].ID;
//       console.log(uniName);
//       // document.getElementById("current").innerText = "stored as: " + uniName + " (" + uniID + ")";
//     }
//   });

// }

function clearData() {
	chrome.storage.sync.clear();
}

     document.getElementById("buttn").addEventListener("click", changeSelect);
	document.getElementById("buttn3").addEventListener("click", clearData); 



