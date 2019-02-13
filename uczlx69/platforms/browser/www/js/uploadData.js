function startDataUpload(){
	alert ('start data upload');
	var name=document.getElementById('name').value;
	var surname=document.getElementById('surname').value;
	var module=document.getElementById('module').value;
	var postString='name='+name+'&surname='+surname+'&module='+module;
	
	//now get the checkbox values - separate them with a l so that they can be split later on if necessary
	var checkString='';
	for (var i=1;i<5;i++){
		if (document.getElementById('check'+i).checked===true){
			checkString=checkString+document.getElementById('check'+i).value+'||'
		}
	}
	postString=postString+'&modulelist='+checkString;
	//now get the raido button values
	if (document.getElementById('morning').checked){
		postString=postString+'&lecturetime=morning';
	}
	if (document.getElementById('afternoon').checked){
		postString=postString+'&lecturetime=afternoon';
	}
	//now get the select box values
	var language=document.getElementById('languageselectbox').value;
	postString=postString+'&language'+language;
	
	//now get the geometry values
	var latitude=document.getElementById('latitude').value;
	var longitude=document.getElementById('longitude').value;
	postString=postString+'&latitude='+latitude+'&longitude='+longitude;
	
	alert (postString);
	processData(postString);
}

var client;

function processData(postString){
	client=new XMLHttpRequest();
	client.open('POST','https://developer.cege.ucl.ac.uk:30281/reflectData',true);
	client.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	client.onreadystatechange=dataUpload;
    client.send(postString);
}

//create the code to wait for the response from the data server, and process the response once it is received
function dataUpload(){
	//this function listens out for the server to say that the data is ready i.e.has state 4
	if(client.readyState=4){      
	//change the div to show the response
	document.getElementById('dataUploadResult').innerHTML=client.responseText;
	}
}


