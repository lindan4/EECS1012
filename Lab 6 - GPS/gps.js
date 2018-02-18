/* jslint browser:true */

//Basis:

//York blvd and James Gillies 43.774419 -79.497868
//Shoreham Dr. & The Pond Rd. 43.772463 -79.511318


var id = null;
var firstTime = -1;

var x1 = parseFloat(895);
var x2 = parseFloat(107);

var long1 = parseFloat(-79.497868);
var long2 = parseFloat(-79.511318);

var y1 = parseFloat(281);
var y2 = parseFloat(30);

var lat1 = parseFloat(43.774419);
var lat2 = parseFloat(42.772463);



var loc1 = {
  lat:43.775556, lon:-79.502222, desc: "loc1"
}


var loc2 = {
  lat:43.773051, lon:-79.508043, desc: "loc2"
}


var loc3 = {
  lat:43.773306, lon:-79.502406, desc: "loc3"
}

var caches = new Array();

caches.push(loc1);
caches.push(loc2);
caches.push(loc3);

var currentCache = 0;

function updateCache()
{
  currentCache = (currentCache + 1) % caches.length;
  showCache();
}

function showCache()
{
  var nowCache = caches[currentCache];
  var target = document.getElementById("target");


  var setTargetX = interpolate(x1, x2, long1, long2, nowCache.lon);
  var setTargetY = interpolate(y1, y2, lat1, lat2, nowCache.lat);

  target.style.top = setTargetY;
  target.style.left = setTargetX;
}

function togglegps()
{
    var button = document.getElementById("togglegps");
    if (navigator.geolocation)
    {
        if (id === null)
        {
            id = navigator.geolocation.watchPosition(showPosition, handleError, {enableHighAccuracy : true, timeout: 1000});
            button.innerHTML = "STOP GPS";
            firstTime = -1;
        }
        else
        {
            navigator.geolocation.clearWatch(id);
            id = null;
            button.innerHTML = "START GPS";
        }
    }
    else
    {
        alert("NO GPS AVAILABLE");
    }
}

function handleError(error)
{
    var errorstr = "Really unknown error";
    switch (error.code)
    {
      case error.PERMISSION_DENIED:
          errorstr = "Permission deined";
          break;
      case error.POSITION_UNAVAILABLE:
          errorstr = "Permission unavailable";
          break;
      case error.TIMEOUT:
          errorstr = "Timeout";
          break;
      case error.UNKNOWN_ERROR:
          error = "Unknown error";
          break;
    }
    alert("GPS error " + error);
}

function interpolate(u1, u2, gps1, gps2, gpsi)
{
  var inter = u1 + (u2 - u1) * (gpsi - gps1) / (gps2 - gps1);
  return inter;
}

//object position error
function showPosition(position)
{
    var latitude = document.getElementById("latitude");
    var longitude = document.getElementById("longitude");

    var now = document.getElementById("now");

    var map = document.getElementById("map");



    var me = document.getElementById("me");


    //document.writeln(x);
    latitude.innerHTML = position.coords.latitude;
    longitude.innerHTML = position.coords.longitude;

    if (firstTime < 0)
    {
      firstTime = position.timestamp;
    }
    now.innerHTML = position.timestamp - firstTime;


    var x = interpolate(x1, x2, long1, long2, position.coords.longitude);
    var y = interpolate(y1, y2, lat1, lat2, position.coords.latitude);

    document.getElementById("debug").innerHTML = "x: " + x + " y: " + y;

    //document.writeln(x);
    me.style.top = y;
    me.style.left = x;

}
