// City Tab
document.getElementById("cityTabBtn").addEventListener("click", function() {
    document.getElementById("cityTab").style.display = "block";
    document.getElementById("pincodeTab").style.display = "none";
});

document.getElementById("searchCityBtn").addEventListener("click", function() {
    var location = document.getElementById("city").value;
    fetch('assets/AllPostOfficiesDetails.json')  // PostOffices JSON file path
        .then(response => response.json())
        .then(data => { 
            if (data["PostOffices"][location]) {
                var resultData = {
                    "Pincode": data["PostOffices"][location]["Pincode"],
                    "District": data["PostOffices"][location]["District"],
                    "State": data["PostOffices"][location]["StateName"]
                };

                var resultTable = createResultTable(resultData);
                document.getElementById("cityResult").innerHTML = '';
                var div = document.createElement("div");
                div.style.textAlign = "left";
                div.appendChild(resultTable);
                document.getElementById("cityResult").appendChild(div);
            } else {
                document.getElementById("cityResult").textContent = "City not found";
            }
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
});

function createResultTable(data) {
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");

    for (var key in data) {
        var row = document.createElement("tr");
        var cell1 = document.createElement("td");
        var cell2 = document.createElement("td");

        cell1.textContent = key + "  :";
        cell2.textContent = data[key];

        row.appendChild(cell1);
        row.appendChild(cell2);
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    return table;
}


// Pincode Tab
document.getElementById("pincodeTabBtn").addEventListener("click", function() {
    document.getElementById("cityTab").style.display = "none";
    document.getElementById("pincodeTab").style.display = "block";
});

document.getElementById("searchPincodeBtn").addEventListener("click", function() {
    var pincode = document.getElementById("pincode").value;
    fetch('assets/AllPinCodesDetails.json')  // Pincodes JSON file path
        .then(response => response.json())
        .then(data => {
            if (data["PinCodes"][pincode]) {
                var pincodeData = data["PinCodes"][pincode];
                var cityList = [];
                for (var i = 0; i < pincodeData.length; i++) {
                    var city = pincodeData[i]["City"];
                    cityList.push(city); 
                }
                var district = pincodeData[0]["District"];
                var statename = pincodeData[0]["State"];
                
                var resultData = {
                    "City Names": cityList.join(', '),
                    "District": district,
                    "State": statename
                };

                var resultTable = createResultTable(resultData);
                document.getElementById("pincodeResult").innerHTML = '';
                var div = document.createElement("div");
                div.style.textAlign = "left";
                div.appendChild(resultTable);
                document.getElementById("pincodeResult").appendChild(div);
            } else {
                document.getElementById("pincodeResult").textContent = "Pincode not found";
            }
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
});

function createResultTable(data) {
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");

    for (var key in data) {
        var row = document.createElement("tr");
        var cell1 = document.createElement("td");
        var cell2 = document.createElement("td");

        cell1.textContent = key + "  :";
        cell2.textContent = data[key];

        row.appendChild(cell1);
        row.appendChild(cell2);
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    return table;
}

// Autocomplete 
fetch('assets/AllPostOfficesList.json')  // PostOfficesList JSON file path
    .then(response => response.json())
    .then(data => {
        var citiesList = data["offices"];
        var datalist = document.getElementById('cities');
        citiesList.forEach(city => {
            var option = document.createElement('option');
            option.value = city;
            datalist.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });

fetch('assets/AllPinCodesList.json')  // PincodesList JSON file path
    .then(response => response.json())
    .then(data => {
        var pincodesList = data["Pincodes"];
        var datalist = document.getElementById('pincodes');
        pincodesList.forEach(pincode => {
            var option = document.createElement('option');
            option.value = pincode;
            datalist.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });

