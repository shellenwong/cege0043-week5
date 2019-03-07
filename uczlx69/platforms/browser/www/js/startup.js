var userMarker;
var userCircle;
var userPolygon;
var earthquakes;

function trackAndCircle(){
	if (navigator.geolocation){
		navigator.geolocation.watchPosition(showposition);
		} else{
			document.getElementById('showLocation').innerHTML='Geolocation is not supported by this browser';}
			loadW3HTML();
			}

function showposition(position){
	if (userMarker){mymap.removeLayer(userMarker);}
	userMarker=L.marker([position.coords.latitude,position.coords.longitude],{icon:testMarkerRed}).addTo(mymap).bindPopup('<b>I am here!</b>'+
	[position.coords.latitude,position.coords.longitude]);
	userCircle=L.circle([position.coords.latitude,position.coords.longitude],500,{
	   color:'red',
	   fillColor:'#f03',
	   fillOpacity:0.05
	   }).addTo(mymap).bindPopup('I am a circle.');
	userPolygon=L.polygon([[position.coords.latitude,position.coords.longitude],[position.coords.latitude+0.0005,position.coords.longitude+0.0005],[position.coords.latitude-0.0005,position.coords.longitude-0.0005]],
	{color:'red',fillColor:"#f03",fillOpacity:0.05}).addTo(mymap).bindPopup('I am a polygon');
	getEarthquakes();
  }
	
	   var testMarkerRed=L.AwesomeMarkers.icon({
	   icon:'play',
	   markerColor:'red'});
	   
	   
function loadW3HTML(){
	w3.includeHTML();
}	   
	   
	   
function startup(){
	document.addEventListener('DOMContentLoaded',function(){
		trackAndCircle();getPort();loadW3HTML();getFormdata();
	},false);
}	   






