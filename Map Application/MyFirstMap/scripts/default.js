/*
 *  Name:           Rebecca Harris
 *  Project:        Mapping Application 3
 *  Date:           April 1, 2014
 *  File name:      default.js
 *  Browser:        Google Chrome
 *  Description:    Generates the map for the user to interact with. The user can use the overlay on the map to 
 *                  go to their Geo Location (current position in person) on the map, and also to get the
 *                  surrounding places in the current position of the map.
 *
 *                  Uses Bootstrap to make the website responsive.
 *
 * Refactors:
 * 1. Edited previous code where I used document.getElementById to the $gel function to prevent unnecessary large lengths of code
 * 2. Resizing of the map is now handled by the default.css file, deleted the old resizeWin function
 * 3. Fixed the layout of the default.aspx file, more divs to properly separate and clean up code
 * 4. Implementation of Bootstrap and fixing up the UI of the website. This now means the website no longer overlaps the map and the banner 
 *      is eliminated (to prevent problems with cutting off)
 */

var map; // map object
var allPins; // array to hold all of the info of places to create 
var pinNum; // variable to hold pin number as it escalates
var isCoffee;
var isBakery;
var isBagel;
var isIntCafe;

function boot() {
    Microsoft.Maps.loadModule('Microsoft.Maps.Overlays.Style', { callback: getMap });
}

// Generates the Bing Map for the user to interact with
function getMap() {
    map = new Microsoft.Maps.Map($gel("bingMap"), {
        credentials: getKey(),
        customizeOverlays: true,
        enableClickableLogo: false,
        enableSearchLogo: false,
        showDashboard: true,
        showBreadcrumb: true,
        showCopyright: false,
        zoom: 10,
        labelOverlay: Microsoft.Maps.LabelOverlay.hidden
    });

    // My Factual key and secret
    MY_KEY = "/";
    MY_SECRET = "/";

    // Sets the map to be at the user's current Geo Location
    setGeoLocation();

    // Set default to true for all checkbox checked variables
    isCoffee = true;
    isBakery = true;
    isBagel = true;
    isIntCafe = true;
}

// Set or reset the map position based on the user's Geolocation
function setGeoLocation() {
    // Check for geolocation support
    if (navigator.geolocation) {
        // Use method getCurrentPosition to get coordinates
        navigator.geolocation.getCurrentPosition(function (position) {
            // Access them accordingly
            map.setView({ zoom: 15, center: new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude) });
        });
    }
    else {
        // set to center of North America
        map.setView({ zoom: 4, center: new Microsoft.Maps.Location(47.23591995239258, -93.52752685546875) });
    }
}

// Event handler sets the current Geo Location for the user
function manualLocation() {
    var geoLocationProvider = new Microsoft.Maps.GeoLocationProvider(map);
    geoLocationProvider.getCurrentPosition();
}

// Remove all pushpins currently on the map
function clearMap() {
    for (var i = map.entities.getLength() - 1; i >= 0; i--) {
        var pushpin = map.entities.get(i);
        if (pushpin instanceof Microsoft.Maps.Pushpin)
            map.entities.removeAt(i);
    }
}

// Support function wraps the document.getElementById property to reduce the code size
function $gel(docElem) {
    return document.getElementById(docElem);
}

// Call AJAX function, passing in the GetFactual method and latitude & longitude
// of the current location on the map
function getFactual() {
    latLong = map.getCenter();
    callAJAX("GetFactual", latLong.latitude, latLong.longitude);
}

// Checkbox click event
// Determines what checkboxes are checked as a filter for our map's data
// If they check
function cbClicked(e) {
    // Cafe, Coffee and Tea Houses check box was clicked
    if (e.id == "cbCoffee") {
        if (e.checked == true) {
            isCoffee = true;

            if (allPins.length > 0) {
                addAllPins();
            }
        }
        else {
            isCoffee = false;

            clearPin();
        }
    } // Bakeries check box was clicked
    else if (e.id == "cbBakeries") {
        if (e.checked == true) {
            isBakery = true;

            if (allPins.length > 0) {
                addAllPins();
            }
        }
        else {
            isBakery = false;

            clearPin();
        }
    } // Bagels and Donuts check box was clicked
    else if (e.id == "cbBagels") {
        if (e.checked == true) {
            isBagel = true;

            if (allPins.length > 0) {
                addAllPins();
            }
        }
        else {
            isBagel = false;

            clearPin();
        }
    } // Internet Cafes check box was clicked
    else if (e.id == "cbInternetCafe") {
        if (e.checked == true) {
            isIntCafe = true;

            if (allPins.length > 0) {
                addAllPins();
            }
        }
        else {
            isIntCafe = false;

            clearPin();
        }
    }
}

// Clears the pin info in the sidebar if a pin was previously selected when the user changes the filter
function clearPin() {
    if (allPins.length > 0) {
        $gel("pinInfo").innerText = "Please select a pin.";
        $gel("pinName").innerText = "";
        $gel("pinAddr").innerText = "";
        $gel("pinLat").innerText = "";
        $gel("pinLon").innerText = "";

        addAllPins();
    }
}

// Main AJAX call, calls the GetFactual method and passes in the latitude & longitude
// of the current location on the map
function callAJAX(requestMethod, lat, lon) {
    var pageMethod = "default.aspx/" + requestMethod;

    var test = JSON.stringify({ dLat: lat, dLon: lon });

    $.ajax({
        url: pageMethod,
        data: JSON.stringify({ dLat: lat, dLon: lon }),
        type: "POST",
        contentType: "application/json",
        dataType: "JSON",
        timeout: 600000,
        success: function (result) {
            ajaxCallback(result.d);
        },
        error: function (xhr, status) {
            alert(status + " - " + xhr.responseText);
        }
    });
}

// AJAX callback function, populates pin array with surronding places (max 50)
function ajaxCallback(response) {
    allPins = response;
    addAllPins();
}

// Adds all of the pins for each place found to the map
function addAllPins() {
    // Clear any exisiting pins
    map.entities.clear();

    // Set custom pin image
    var pinImg = "images/BeckysCustomPin2.png";
    var cat = "";
    var locArray = [];
    var valid = false;

    pinNum = 0;

    if (allPins.length == 0) {
        display

        $gel("numPins").innerText = "No pins found";
    }
    else {
        // Loop through array containing the info of places and create a pin for each place
        for (var i = 0; i < allPins.length; i++) {
            var loc = new Microsoft.Maps.Location(allPins[i].latitude, allPins[i].longitude);

            // Filters the results to Cafe, Coffee and Tea Houses, Bakeries, Bagel and Donuts, and Internet Cafes
            // Filters dependent on the checkbox options selected by the user in the UI
            for (var k = 0; k < allPins[i].category_ids.length; k++) {
                if (isCoffee == true && allPins[i].category_ids[k] == 342) {
                    valid = true;
                    pinImg = "images/BeckysCoffee.png";
                }
                else if (isBakery == true && allPins[i].category_ids[k] == 340) {
                    valid = true;
                    pinImg = "images/BeckysBakery.png";
                }
                else if (isIntCafe == true && allPins[i].category_ids[k] == 345) {
                    valid = true;

                    // Bonus! There is only one internet cafe in London (look around Dundas & Clarence downtown)
                    pinImg = "images/BeckysIntCafe.png";
                }
                else if (isBagel == true && allPins[i].category_ids[k] == 339) {
                    valid = true;
                    pinImg = "images/BeckysBagel.png";
                }
                else {
                    valid = false;
                }
            }

            var pin = new Microsoft.Maps.Pushpin(loc, {
                icon: pinImg,
                anchor: new Microsoft.Maps.Point(8, 8),
                draggable: false,
                width: 48,
                height: 48
            });

            // Set the title, latitude, and longitude of the pin to match the detail of the place
            // Used to populate the overlay with details when the user selects a pin
            pin.title = allPins[i].name;
            pin.latitude = allPins[i].latitude;
            pin.longitude = allPins[i].longitude;
            pin.address = allPins[i].address;
            pin.region = allPins[i].region;
            pin.country = allPins[i].country;

            // If the pin is a valid category
            if (valid == true) {
                pinNum += 1;

                // Event handler - when user clicks on a pin, call displayPinInfo
                Microsoft.Maps.Events.addHandler(pin, 'click', displayPinInfo);

                // Add the pin to the entities array
                map.entities.push(pin);

                // Add location object to the local array (to optimize zoom)
                locArray.push(loc);
            }
        }

        if (pinNum > 0) {
            // Optimize zoom so the user can see all the pins populated on the map
            var bestview = Microsoft.Maps.LocationRect.fromLocations(locArray);
            map.setView({ bounds: bestview });

            // Display total number of pins on the overlay
            $gel("numPins").innerText = "Number of Pins: " + pinNum;
        }
        else {
            $gel("numPins").innerText = "No pins found";
        }
    }
}

// Called by pin click event handler - populates info of the selected pin onto the overlay
function displayPinInfo(e) {
    $gel("pinInfo").innerText = "Pin Info:";
    $gel("pinName").innerText = "Name: " + e.target.title;
    $gel("pinAddr").innerText = "Address: " + e.target.address + ", " + e.target.region;
    $gel("pinLat").innerText = "Latitude: " + e.target.latitude;
    $gel("pinLon").innerText = "Longitude: " + e.target.longitude;
}
