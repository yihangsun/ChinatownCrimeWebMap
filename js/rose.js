function drawChart(count, sum){
  //console.log(sum)
  var data = [{Month:'January',crimes:count[0]},
                  {Month:'Feburary',crimes:count[1]},
                  {Month:'March',crimes:count[2]},
                  {Month:'April',crimes:count[3]},
                  {Month:'May',crimes:count[4]}];
  //console.log(document.getElementById('map'))
  var chart = new G2.Chart({
    id: 'map',
    width: Math.round(sum*2/5) > 250 ? Math.round(sum*2/5) : 250,
    height: Math.round(sum*2/5) > 250 ? Math.round(sum*2/5) : 250,
    plotCfg: {
      margin: [45, 20, 90]
   }
  });
  chart.source(data, {
    'crimes': {
      min: 0
    }
  });
  chart.coord('polar', {
    startAngle: Math.PI, // 起始角度
    endAngle: Math.PI * (3) // 结束角度
  });
  chart.axis('cost', {
        labels: null
  });
  chart.axis('country', {
    gridAlign: 'middle',
    labels: {
      label: {
        textAlign: 'right' // 设置坐标轴 label 的文本对齐方向
      }
    }
  });
  chart.legend(false);
  var colorRange = "";
  if(sum > 800 & sum <= 1000) {
    colorRange = 'rgb(255,25,25)-rgb(255, 153, 153)'
  } else if(sum > 500 & sum <= 800) {
    colorRange = 'rgb(230, 115, 0)-rgb(255, 179, 102)'
  } else {
    colorRange = 'rgb(240, 191, 143)-rgb(252, 242, 233)'
  }

  chart.interval().position('Month*crimes')
    .color('Month',colorRange)
    .label('crimes',{offset: -15,label: {textAlign: 'center', fill: '#000'}})
    .style({
    lineWidth: 1,
    stroke: '#fff'
  });
  chart.animate(true);
  animation = 'grow-in-xy';
  //chart.annotation().text('Seattle')
  chart.render();
}
// setTimeout, 500 = break 0.5 seconds
// function relocateChart(srcArr, chartIdArr){
//   setTimeout(function(){
//     var pics = document.getElementsByClassName('leaflet-tile-loaded')
//     for (var j=0; j<srcArr.length; j++){ //j = chart's data
//       for (var i=0; i<pics.length; i++){ //i = tile's data
//         if(pics[i].src == srcArr[j]){
//           console.log(pics[i].style.transform)
//           document.getElementById(chartIdArr[j]).style.position = 'absolute'
//           document.getElementById(chartIdArr[j]).style.pointerEvents = 'none'
//           document.getElementById(chartIdArr[j]).style.transform = pics[i].style.transform //tile's position data
//           document.getElementById(chartIdArr[j]).style.zIndex = "999" //in the front
//           break;//if found, break current loop
//         }
//       }
//     }
//   }, 500 )
// }

function relocateChart(srcArr, chartIdArr){
  setTimeout(function(){
    var pics = document.getElementsByClassName('leaflet-tile-loaded')
    for (var j=0; j<srcArr.length; j++){ //j = chart's data
      for (var i=0; i<pics.length; i++){ //i = tile's data
        if(pics[i].src == srcArr[j]){
          document.getElementById(chartIdArr[j]).style.position = 'absolute'
          document.getElementById(chartIdArr[j]).style.pointerEvents = 'none'
          document.getElementById(chartIdArr[j]).style.transform = pics[i].style.transform //tile's position data
          document.getElementById(chartIdArr[j]).style.zIndex = "999" //in the front
          break;//if found, break current loop
        }
      }
    }
  }, 500 )
  // setTimeout(function(){
  //   for (var i=0; i<chartIdArr.length; i++){ //j = chart's data
  //         document.getElementById(chartIdArr[i]).style.position = 'absolute'
  //         document.getElementById(chartIdArr[i]).style.pointerEvents = 'none'
  //         document.getElementById(chartIdArr[i]).style.transform = "translate3d(" + arr[i][0] + "px," + arr[i][1] + "px, 0px)"; //tile's position data
  //         document.getElementById(chartIdArr[i]).style.zIndex = "999" //in the front
  //       }
  // }, 500 )
}

function addMarker(coordinate, name) {
  var myMarker = L.marker(coordinate,{icon:L.divIcon({
    html: '<i class = "fa fa-map-marker fa-4x"></i>' + name,
    className: 'myDivIcon'
  })}).addTo(mymap);
}

function addPopup (file, fileCrime, city, count){
  var geojsonLayer=L.geoJSON.ajax(file, {
      style:styleFunction,
      onEachFeature: happenHover}).addTo(mymap);
  function styleFunction() {return {color: "purple"}; }
  function newStyle(){geojsonLayer, geojsonLayer.setStyle({color:"blue"});}
  function oldStyle(){geojsonLayer.setStyle({color:"green"});}
  function happenHover(feature,layer){
    if(city == 'Boston') {
      layer.bindPopup(city + ' has a total <b>' +  count.reduce((a, b) => a + b, 0) + "</b> crime reports happened within its Chinatown area in 2020." +
        "<img src= 'https://www.trolleytours.com/wp-content/uploads/2016/05/boston-chinatown.jpg' width = '200px'>", {closeButton: false})
    } else if(city == 'Chicago'){
      layer.bindPopup(city + ' has a total ' + "<b>" + count.reduce((a, b) => a + b, 0)+ "</b>" + " crime reports happened within its Chinatown area in 2020." +
        "<img src = 'https://media-cdn.tripadvisor.com/media/photo-s/13/15/30/b4/pui-tak-center-entry.jpg' width = '200px'>", {closeButton: false})
    } else if (city == 'Los Angeles') {
      layer.bindPopup(city + ' has a total ' + "<b>"+count.reduce((a, b) => a + b, 0)+"</b>"+ " crime reports happened within its Chinatown area in 2020." +
      "<img src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Chinatown_gate%2C_Los_Angeles.jpg/234px-Chinatown_gate%2C_Los_Angeles.jpg' width = '200px'>", {closeButton: false})
    } else if (city == 'San Fransico') {
      layer.bindPopup(city + ' has a total ' + "<b>"+count.reduce((a, b) => a + b, 0)+"</b>" + " crime reports happened within its Chinatown area in 2020." +
      "<img src = 'https://specials-images.forbesimg.com/imageserve/692948973/960x0.jpg?fit=scale' width = '200px'>", {closeButton: false})
    } else if (city == 'Seattle') {
      layer.bindPopup(city + ' has a total ' + "<b>"+count.reduce((a, b) => a + b, 0)+"</b>" + " crime reports happened within its Chinatown area in 2020." +
      "<img src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT7APY-Wiwi5rcVfaB_Fv2fvrRA1GByiyi8S2HtqmM2y6mPCSRq&usqp=CAU' width = '200px'>", {closeButton: false})
    } else {
      layer.bindPopup(city + ' has a total ' + "<b>"+count.reduce((a, b) => a + b, 0)+"</b>" + " crime reports happened within its Chinatown area in 2020." +
      "<img src = 'https://thephiladelphiacitizen.org/wp-content/uploads/2020/04/Chinatown-Philadelphia-1.jpg' width = '200px'>", {closeButton: false})
    };
      layer.on('mouseover', function(){layer.openPopup();});
      layer.on('mouseover', newStyle);
      layer.on('mouseout', oldStyle);
      layer.on('mouseout', function() {layer.closePopup();});}
      var crimes = L.geoJson.ajax(fileCrime, {
          pointToLayer: function(feature, latlng) {
            if(feature.properties.Date.split('\/')[2].slice(0,2)==20) {
               var crime = L.marker(latlng, {icon: L.divIcon({
                 html: '<i class="fa fa-map-marker"></i>',
                 className: 'myDivIcon'})
               });
               return crime;
            }
          },
          onEachFeature: function (feature, layer) {
            layer.bindPopup("This location is located within " + city + "'s Chinatown. There is/are " + feature.properties.Type + " happened at this location on " + feature.properties.Date)
         }
       }).addTo(mymap)
}

function bindOnClickEvents (IdArr, locationMap, map){
  var cityMarker = document.getElementsByClassName("fa fa-map-marker fa-4x")
  for(let i=0; i<cityMarker.length; i++){
    cityMarker[i].style.pointerEvents = 'auto'
    cityMarker[i].style.zIndex="9999"
    cityMarker[i].onclick = function(){
      var newCenter = locationMap.get(cityMarker[i].parentNode.innerHTML.split('>')[2])
      map.setView(newCenter, 24);
      for(let j=0; j<IdArr.length; j++){
        document.getElementById(IdArr[j]).style.zIndex = "-1"
      }
    }
  }
  var homeButton = document.getElementsByClassName("fa fa-home")[0]
  homeButton.onclick = function(){
    for(var j=0; j<IdArr.length; j++){
      document.getElementById(IdArr[j]).style.zIndex = "999"
    }
  }
}
