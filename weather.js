

/* called when new weather arrives */

function callbackFunction(data) {

	var city = data.query.results.channel.location.city;
    var region = data.query.results.channel.location.region;
    var forecastInfo = data.query.results.channel.item.forecast;
    var date;
    var day;
    var high;
    var low;
    var text;
    document.getElementById("location").innerHTML= city + ", " + region;
    for(var i=0;i<forecastInfo.length;i++) {
        forecast = forecastInfo[i];
		document.getElementById("date"+i).innerHTML=forecast.date+ ", " + forecast.day;
		document.getElementById("text"+i).innerHTML= forecast.text;
		document.getElementById("high"+i).innerHTML= forecast.high;
		document.getElementById("low"+i).innerHTML= forecast.low;
        /*date = document.getElementById("date"+i);
		text = document.getElementById("text"+i);
        high = document.getElementById("high"+i);
        low = document.getElementById("low"+i);

        date.textContent = forecast.date+ ", " + forecast.day;
        text.textContent = forecast.text;
        high.textContent = forecast.high;
        low.textContent = forecast.low;
*/
    }

}

var firstForecast=0;
var lastForecast=5;

function stepAction(direction) {

    if(direction == 'right') {
        document.getElementById("forecast"+firstForecast).style.display="none";
        document.getElementById("forecast"+lastForecast).style.display="inline";
        firstForecast++;
        lastForecast++;

    }
    if(direction == 'left') {
        firstForecast--;
        lastForecast--;
        document.getElementById("forecast"+firstForecast).style.display="inline";
        document.getElementById("forecast"+lastForecast).style.display="none";

    }
    if(firstForecast==4){
        document.getElementById("rightButton").style.display = "none";
    }
    else{
        document.getElementById("rightButton").style.display = "inline";
    }
    if(firstForecast!=0){
        document.getElementById("leftButton").style.display = "inline";
    }
    else{
        document.getElementById("leftButton").style.display = "none";
    }
}

function zipAction() {
    var zip = document.getElementById("zipInput").value;
    var weatherUrl = 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast ' +
        'where woeid in (select woeid from geo.places(1) where text="'+zip+'")&format=json';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', encodeURI(weatherUrl));
    xhr.send(null);

    xhr.onreadystatechange = function () {
        var DONE = 4;
        var OK = 200;
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                var data = JSON.parse(xhr.responseText);
                callbackFunction(data);
            }
        } else {
            console.log('Error: ' + xhr.status);
        }
    }
}


