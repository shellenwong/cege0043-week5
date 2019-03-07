//create a variable that will hold the XMLHttpRequest()
var client;
var GeoJSON;
var GeoJSONlayer;

var london_poi='london_poi'
var london_highway='london_highway'

//run the function when you click the load Data Button
function load_london_poi(){
	alert('loading london_poi');
	getGeoJSON(london_poi);
}

function load_london_highway(){
	alert('loading london_highway');
	getGeoJSON(london_highway);
}

function getGeoJSON(x){
	client=new XMLHttpRequest();
	client.open('GET','http://developer.cege.ucl.ac.uk:' + httpPortNumber + '/getGeoJSON/' + x + '/geom');
	client.onreadystatechange=geoJSONResponse;
	client.send();
}

//wait for the response from the data server
//process the response once it is received
function GeoJSONResponse(){
	//this function listens out for the server to say that
	//the data is ready when =4
	if (client.readyState===4){
		var GeoJSON_text=client.responseText;
		loadGeoJSONlayer(GeoJSON_text);
	}
}

//convert the received data which is text to JSON format and add it to the map
function loadGeoJSONlayer(GeoJSON_text){
	//convert the text to JSON
	var GeoJSON_json=JSON.parse(GeoJSON_text);
	//pass the earthquake data to the global variable we created earlier
	GeoJSON=GeoJSON_json;
	//load the geoJSONlayer by using customer icons
	GeoJSONlayer=L.geoJson(GeoJSON_json).addTo(mymap);
	//change the map zoom so that all the data is shown
	mymap.fitBounds(GeoJSONlayer.getBounds());
}

//run the function when you click the REMOVE DATA Button
function removeFormData(){
	alert('Form Data will be removed');
	mymap.removeLayer(GeoJSONlayer);
}















































