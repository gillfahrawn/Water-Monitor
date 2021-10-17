let map, heatmap;
    var heatMapData = [];
    var heatMapData_lat = [];
    var heatMapData_long = [];
    var heatMapData_flow = [];
    var heatMapData_stage = [];
    var heatMapData_percentile = [];
    var heatMapData_huc_cd = [];

function initMap() {

  $.getJSON('https://data2.gldw.org/vdab/v2api/retrieveLatestEvents', function(data) {
  // console.log(Object.keys(data["Events"]).length);


    var event_count = Object.keys(data["Events"]).length;


    for (let i = 0; i < event_count; i++) {
      try {
        var curr_event = "Event_" + i.toString()

          if (data["Events"][curr_event].hasOwnProperty("USGSData")) {
            lat = parseFloat(data["Events"][curr_event]["Latitude"]);
            long = parseFloat(data["Events"][curr_event]["Longitude"]);
            flow = parseFloat(data["Events"][curr_event]["USGSData"]["flow"]);
            stage = parseFloat(data["Events"][curr_event]["USGSData"]["stage"]);
            huc_cd = parseFloat(data["Events"][curr_event]["USGSData"]["huc_cd"]);
            percentile = parseFloat(data["Events"][curr_event]["USGSData"]["percentile"]);

            heatMapData_flow.push(flow);
            heatMapData_stage.push(stage);
            heatMapData_lat.push(lat);
            heatMapData_long.push(long);
            heatMapData_percentile.push(percentile);
            heatMapData_huc_cd.push(huc_cd);
          }

          if(data["Events"][curr_event].hasOwnProperty("USGSData_OH")) {
            lat = parseFloat(data["Events"][curr_event]["Latitude"]);
            long = parseFloat(data["Events"][curr_event]["Longitude"]);
            flow = parseFloat(data["Events"][curr_event]["USGSData_OH"]["flow"]);
            stage = parseFloat(data["Events"][curr_event]["USGSData_OH"]["stage"]);
            huc_cd = parseFloat(data["Events"][curr_event]["USGSData_OH"]["huc_cd"]);
            percentile = parseFloat(data["Events"][curr_event]["USGSData_OH"]["percentile"]);

            heatMapData_flow.push(flow);
            heatMapData_stage.push(stage);
            heatMapData_lat.push(lat);
            heatMapData_long.push(long);
            heatMapData_percentile.push(percentile);
            heatMapData_huc_cd.push(huc_cd);
          }

        }
      catch (error) {
           // expected output: ReferenceError: nonExistentFunction is not defined
      }
    }
//console.log();

   
    /*for (let i = 0; i < heatMapData_flow.length; i++) {
      if (isNaN(heatMapData_flow[i])) {
         console.log("IF STATEMENT: latitude hmap obj type is: " + typeof(heatMapData_flow[i]));
        continue;
      }
      else {
       // console.log("latitude hmap obj type is: " + typeof(heatMapData_flow[i]));
       var loc = { location: new google.maps.LatLng(heatMapData_lat[i], heatMapData_long[i]), weight: heatMapData_flow[i] };
       heatMapData.push(loc);
      } */

    for (let i = 0; i < heatMapData_stage.length; i++) {
      if (isNaN(heatMapData_stage[i])) {
         console.log("IF STATEMENT: latitude hmap obj type is: " + typeof(heatMapData_stage[i]));
        continue;
      }
      else {
       // console.log("latitude hmap obj type is: " + typeof(heatMapData_flow[i]));
       var loc = { location: new google.maps.LatLng(heatMapData_lat[i], heatMapData_long[i]), weight: heatMapData_stage[i] };
       heatMapData.push(loc);
      }
    }




  var centered_loc = new google.maps.LatLng(41.6834, -84.67);
  map = new google.maps.Map(document.getElementById("map"), {
    center: centered_loc,
    zoom: 6,
    mapTypeId: "terrain",
  });

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatMapData,
  });
  heatmap.setMap(map);
  document
    .getElementById("toggle-heatmap")
    .addEventListener("click", toggleHeatmap);
  document
    .getElementById("toggle-stage")
    .addEventListener("click", toggleStage);    
  document
    .getElementById("toggle-flow")
    .addEventListener("click", toggleFlow);
  document
    .getElementById("toggle-percentile")
    .addEventListener("click", togglePercentile);    
  document
    .getElementById("change-gradient")
    .addEventListener("click", changeGradient);
  document
    .getElementById("change-opacity")
    .addEventListener("click", changeOpacity);
  document
    .getElementById("change-radius")
    .addEventListener("click", changeRadius);

  });
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function toggleStage() {
      heatMapData.length = 0
      for (let i = 0; i < heatMapData_stage.length; i++) {
      if (isNaN(heatMapData_stage[i])) {
         console.log("IF STATEMENT: latitude hmap obj type is: " + typeof(heatMapData_stage[i]));
        continue;
      }
      else {
       // console.log("latitude hmap obj type is: " + typeof(heatMapData_flow[i]));
       var loc = { location: new google.maps.LatLng(heatMapData_lat[i], heatMapData_long[i]), weight: heatMapData_stage[i] };
       heatMapData.push(loc);
      }
    }
    var sanFrancisco = new google.maps.LatLng(41.6834, -84.67);
    map = new google.maps.Map(document.getElementById("map"), {
      center: sanFrancisco,
      zoom: 6,
      mapTypeId: "terrain",
    });
    heatmap.setMap(map);
}


function toggleFlow() {
      heatMapData.length = 0
      for (let i = 0; i < heatMapData_flow.length; i++) {
        if (isNaN(heatMapData_flow[i])) {
           console.log("IF STATEMENT: latitude hmap obj type is: " + typeof(heatMapData_flow[i]));
          continue;
        }
        else {
         // console.log("latitude hmap obj type is: " + typeof(heatMapData_flow[i]));
         var loc = { location: new google.maps.LatLng(heatMapData_lat[i], heatMapData_long[i]), weight: heatMapData_flow[i] };
         heatMapData.push(loc);
        }
      }
      var centered_loc = new google.maps.LatLng(41.6834, -84.67);
      map = new google.maps.Map(document.getElementById("map"), {
        center: centered_loc,
        zoom: 6,
        mapTypeId: "terrain",
      });
      heatmap.setMap(map);
}

function togglePercentile() {
      heatMapData.length = 0
      for (let i = 0; i < heatMapData_stage.length; i++) {
        if (isNaN(heatMapData_stage[i])) {
           console.log("IF STATEMENT: latitude hmap obj type is: " + typeof(heatMapData_stage[i]));
          continue;
        }
        else {
         // console.log("latitude hmap obj type is: " + typeof(heatMapData_flow[i]));
         var loc = { location: new google.maps.LatLng(heatMapData_lat[i], heatMapData_long[i]), weight: heatMapData_stage[i] };
         heatMapData.push(loc);
        }
      }
      var centered_loc = new google.maps.LatLng(41.6834, -84.67);
      map = new google.maps.Map(document.getElementById("map"), {
        center: centered_loc,
        zoom: 6,
        mapTypeId: "terrain",
      });
      heatmap.setMap(map);
}

function changeGradient() {
  const gradient = [
    "rgba(0, 255, 255, 0)",
    "rgba(0, 255, 255, 1)",
    "rgba(0, 191, 255, 1)",
    "rgba(0, 127, 255, 1)",
    "rgba(0, 63, 255, 1)",
    "rgba(0, 0, 255, 1)",
    "rgba(0, 0, 223, 1)",
    "rgba(0, 0, 191, 1)",
    "rgba(0, 0, 159, 1)",
    "rgba(0, 0, 127, 1)",
    "rgba(63, 0, 91, 1)",
    "rgba(127, 0, 63, 1)",
    "rgba(191, 0, 31, 1)",
    "rgba(255, 0, 0, 1)",
  ];

  heatmap.set("gradient", heatmap.get("gradient") ? null : gradient);
}

function changeRadius() {
  heatmap.set("radius", heatmap.get("radius") ? null : 20);
}

function changeOpacity() {
  heatmap.set("opacity", heatmap.get("opacity") ? null : 0.2);
}