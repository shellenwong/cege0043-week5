var xhrFormData 

function startFormDataLoad(){
	xhrFormData=new XMLHttpRequest();
	var url='http://developer.cege.ucl.ac.uk:'+httpPortNumber;
	url=url+'/getGeoJSON/formdata/geom/';
	xhrFormData.open('GET',url,true);
	xhrFormData.onreadystatechange=processFormData;
	xhrFormData.send();
}

function FormDataResponse(){
	if (xhrFormData.readyState===4){
		 //4=Response from server has been completely loaded
		 var formData=xhrFormData.responseText;
		 loadFormData(formData);
	}
}

//keep the layer global so that we can automatically pop up a pop-up menu on a point if necessary
//we can also use this to determine distance for the proximity alert
var formLayer;
function loadFormData(formData){
	//convert the text received from the server to JSON
	var formJSON=JSON.parse(formData);
	//load the geoJSON layer
	formLayer=L.geoJson(formJSON,
	{
		//use point to layer create the points
		pointToLayer:function (feature,laglng)
		{
			//in this case, we build an HTML DIV string
			//using the values in the data
			var htmlString="<DIV id='popup'"+feature.properties.id+"><h2>"+feature.properties.name+"</h2><br>";
			htmlString=htmlString+"<h3>"+feature.properties.surname+"</h3><br>";
			htmlString=htmlString+"<input type='radio' name='answer' id='"+feature.properties.id+"_1'/>"+feature.properties.module+"<br>";
			htmlString=htmlString+"<input type='radio' name='answer' id='"+feature.properties.id+"_2'/>"+feature.properties.module+"<br>";
			htmlString=htmlString+"<input type='radio' name='answer' id='"+feature.properties.id+"_3'/>"+feature.properties.module+"<br>";
			htmlString=htmlString+"<input type='radio' name='answer' id='"+feature.properties.id+"_4'/>"+feature.properties.module+"<br>";
			htmlString=htmlString+"<button onclick='checkAnswer("+feature.properties.id+");return false;'>Submit Answer</button>";
			
			//now include a hidden element with the answer
			//in this case the answer is always the first choice
			//for the assignment this will vary that you can use feature.properties.correct_answer
			htmlString=htmlString+"<div id=answer"+feature.properties.id+"hidden>1</div>";
			htmlString=htmlString+"</div>";
			return L.marker(latlng).bindPopup(htmlString);			
		},
	}).addTo(mymap);
	mymap.fitBounds(formLayer.getBounds());
}

function checkAnswer(questionID){
	//get the answer from the hidden div
	//NB do this before you close the pop-up as when you close the pop-up the DIV is destroyed
	var answer=document.getElementById("answer"+questionID).innerHTML;
	//now check the question radio buttons
	var correctAnswer=false;
	var answerSelected=0;
	for (var i=1;i<5;i++){
		if (document.getElementById(questionID+"_"+i).checked){
			answerSelected=i;
		}
		if ((document.getElementById(questionID+"_"+i).checked)&&(i==answer)){
			alert('Well Done!');
			correctAnswer=true;
		}
	}
	if (correctAnswer===false){
		//they didn't get it right
		alert('Better luck next time');
	}
	//now close the popup
	mymap.closePopup();
	//the code to upload the answer to the server would go here
	//call an AJAX routine using the data
	//the answerSelected variable holds the number of the answer
	//that the user picked
}






























