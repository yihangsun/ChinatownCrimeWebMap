// 1. Create a map object.
var chartIdArr = null
var srcArr = null
var mymap = L.map('map', {
    center: [39.044570, -101.051311],
    zoom: 5,
    maxZoom: 15,
    minZoom: 3,
    dragging: false,
    zoomControl: false,
    detectRetina: true})

// var zoomHome = L.Control.zoomHome({position: 'topright'});
// zoomHome.addTo(mymap);

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mymap)

// Calculate tool to calculate each crime report's crime events in each month, and same the counts in an array
 // var CurrCount = [0,0,0,0,0,0]
 // L.geoJSON.ajax("data/SFChinatownCrime.geojson", {
 //  onEachFeature: function(feature){
 //    if(feature.properties.IncidentDatetime.split('\/')[2].slice(0,2)==20){
 //      CurrCount[feature.properties.IncidentDatetime.split('\/')[0]-1]++;
 //    }
 //    console.log(CurrCount)
 //  }
 // })

// Record the counts from Inspect.
var LaCount = [170, 169, 141, 145, 121, 4]
var SeaCount = [178, 184, 201, 142, 116, 12]
var ChicCount = [223, 219, 170, 174, 146, 4]
var PhilCount = [227, 218, 181, 165, 10, 9]
var BosCount = [65, 60, 36, 31, 42, 9]
var SFCount = [200, 175, 132, 118, 125, 26]

var locationMap = new Map();
locationMap.set("Boston",[42.34799879459422, -71.06802463531494])
locationMap.set("Chicago",[41.85779934552825, -87.63025760650635])
locationMap.set("Los Angeles",[34.067911728178736, -118.217010498046889])
locationMap.set("Philadelphia",[39.95625892298895,-75.1513659954071])
locationMap.set("Seattle",[47.601764813442529, -122.328944206237793])
locationMap.set("San Fransico",[37.79735662149236, -122.41039752960206])

//Draw chart on the map with each month count and sum
drawChart(LaCount,LaCount.reduce((a, b) => a + b, 0))
drawChart(SeaCount,SeaCount.reduce((a, b) => a + b, 0))
drawChart(ChicCount,ChicCount.reduce((a, b) => a + b, 0))
drawChart(PhilCount,PhilCount.reduce((a, b) => a + b, 0))
drawChart(BosCount,BosCount.reduce((a, b) => a + b, 0))
drawChart(SFCount,SFCount.reduce((a, b) => a + b, 0))

// add icon and city name on the map
addMarker([42.34799879459422, -71.06802463531494], "Boston")
addMarker([41.85779934552825, -87.63025760650635], "Chicago")
addMarker([34.067911728178736, -118.217010498046889], "Los Angeles")
addMarker([39.95625892298895,-75.1513659954071], "Philadelphia")
addMarker([47.601764813442529, -122.328944206237793], "Seattle")
addMarker([37.79735662149236, -122.41039752960206], "San Fransico")

//Locate and relocate based on the tile found in the Inspect.
window.onload=function(){
    console.log('load')
    var zoomHome = L.Control.zoomHome();
    zoomHome.addTo(mymap);
    // tool as template and relocate the chart by fiinding coordinates from inspect
    // srcArr = ["http://b.basemaps.cartocdn.com/light_all/5/5/11.png",
    //               "http://c.basemaps.cartocdn.com/light_all/5/5/12.png",
    //               "http://a.basemaps.cartocdn.com/light_all/5/7/11.png",
    //               "http://a.basemaps.cartocdn.com/light_all/5/9/12.png",
    //               "http://c.basemaps.cartocdn.com/light_all/5/9/11.png",
    //               "http://b.basemaps.cartocdn.com/light_all/5/4/12.png"]
    coordArr = [[443, 187], [553, 615], [955, 160], [1246, 475], [1467, 240], [220, 431]] //from inspect
    chartIdArr = ["g-chart1", "g-chart2", "g-chart3", "g-chart4", "g-chart5", "g-chart6"]

    relocateChart(coordArr, chartIdArr)
    bindOnClickEvents(chartIdArr, locationMap, mymap)
}


//add Chinatowns' geojson on the map
$.getJSON("data/BostonChinatownArea.geojson", function(data) {
  L.geoJson(data).addTo(mymap)
});
$.getJSON("data/ChicChinatownArea.geojson", function(data) {
  L.geoJson(data).addTo(mymap)
});
$.getJSON("data/LAChinatownArea.geojson", function(data) {
  L.geoJson(data).addTo(mymap)
});
$.getJSON("data/philChinatownArea.geojson", function(data) {
  L.geoJson(data).addTo(mymap)
});
$.getJSON("data/SeaChinatownArea.geojson", function(data) {
  L.geoJson(data).addTo(mymap)
});
$.getJSON("data/SFChinatownArea.geojson", function(data) {
  L.geoJson(data).addTo(mymap)
});

// change style when mouse hovers popup window
addPopup("data/BostonChinatownArea.geojson", "data/BostonChinatownCrime.geojson", 'Boston', BosCount)
addPopup("data/ChicChinatownArea.geojson", "data/ChicChinatownCrime.geojson", 'Chicago', ChicCount)
addPopup("data/LAChinatownArea.geojson", "data/LAChinatownCrime.geojson", 'Los Angeles', LaCount)
addPopup("data/philChinatownArea.geojson", "data/philChinatownCrime.geojson", 'Philadelphia', PhilCount)
addPopup("data/SeaChinatownArea.geojson", "data/SeaChinatownCrime.geojson", 'Seattle', SeaCount)
addPopup("data/SFChinatownArea.geojson", "data/SFChinatownCrime.geojson", 'San Fransico', SFCount)


var legend = L.control({position: 'topright'});
// Function that runs when legend is added to map
legend.onAdd = function () {

    // Create Div Element and Populate it with HTML
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<b># Total Crime Reports Rank</b><br />';
    div.innerHTML += '<i style="background: ' + chroma('#e60000') + '; opacity: 0.5"></i><p>800 - 1000</p>';
    div.innerHTML += '<i style="background: ' + chroma('#ff8000') + '; opacity: 0.5"></i><p>500 - 800</p>';
    div.innerHTML += '<i style="background: ' + chroma('#f6d7bc') + '; opacity: 0.5"></i><p>< 500</p>';
    // Return the Legend div containing the HTML content
    return div;
};
// Add a legend to map
legend.addTo(mymap);

L.control.scale({position: 'bottomleft'}).addTo(mymap);
