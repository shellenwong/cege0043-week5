//create a variable that will hold the XMLHttpRequest()
var client;
var formdata;

//add a variable that will hold the layer itself
var formdatalayer;

//run the function when you click the LOAD DATA BUTTON
function loadFormdata(){
	alert(loading FORM DATA);
	getFormdata();
}

function getFormdata(){
	client=new XMLHttpRequest();
	client.open('GET','http://developer.cege.ucl.ac.uk:' + httpPortNumber + '/getFormData/' + httpPortNumber);
	client.onreadystatechange=formdataResponse;
	client.send();
}

function formdataResponse(){
	if (client.readyState==4){
		var formdata_text=client.responseText;
		loadFormdatalayer(formdata_text);
	}
}

//convert the received data which is text to JSON format and add it to the map
function loadFormdatalayer(formdata_text){
	//convert the text to JSON
	var formdatajson=JSON.parse(formdata_text);
	//pass the earthquake data to the global variable we created earlier
	formdata=formdatajson;
	//load the geoJson layer by using customer icons
	formdatalayer=L.geoJson(formdatajson).addTo(mymap);
	//change the map zoom so that all the data is shown
	mymap.fitBounds(formdatalayer.getBounds());
}

//run the function when you click the REMOVE DATA BUTTON 
function removeFormdata(){
	alert("FORM DATA will be removed");
	mymap.removeLayer(formdatalayer);
}



















