// Flow Map 
anychart.onDocumentReady(function () {
  anychart.data.loadJsonFile('json/flowMapData.json', function (data) {

        // сreate a connector map chart instance
        var map = anychart.connector();

        // include the world map geodata
        map.geoData('anychart.maps.world');

        // darken all regions
        map
          .unboundRegions()
          .enabled(true)
          .fill('#E1E1E1')
          .stroke('#B5B2B2');

        // display all labels even if there is an overlap
        map.overlapMode("allow-overlap");

        // a helper function to create the series
        // that will form the connector lines
        var createSeries = function (name, data, color) {

          // create and customize the connector series
          var connectorSeries = map
            .connector(data)
            .name(name)
            .fill(color)
            .stroke({
              color: color,
              thickness: 2
            });
            
          // change the coloring of the connector line in the hovered state
          connectorSeries
            .hovered()
            .stroke('1.5 #212121')
            .fill('#212121');
          
          // configure the arrow marker
          connectorSeries
            .markers()
            .position('100%')
            .fill(color)
            .stroke({
              color: color
            })
            .size(17);
          
          // configure the arrow marker in the hovered state
          connectorSeries
            .hovered()
            .markers()
            .position('100%')
            .size(17)
            .fill('#212121')
            .stroke('2 #455a64');
          
          // set the labels for the source countries
          connectorSeries
            .labels()
            .enabled(true)
            .format(function () {
              return this.getData('from');
            })
            .fontColor('#212121');

          // set the thickness of the connector line based on the series
          if (name === 'More than 25%') {
            connectorSeries.startSize(14).endSize(0);
          } else if (name === '15% to 25%') {
            connectorSeries.startSize(7.5).endSize(1.5);
          } else if (name === '5% to 15%') {
            connectorSeries.startSize(4.5).endSize(2);
          } else if (name === '1% to 5%') {
            connectorSeries.startSize(2.5).endSize(2);
          } else {
            connectorSeries.startSize(0.5).endSize(0.5);
          }
        
          // configure the settings for the legend items
        connectorSeries
          .legendItem()
          .iconType('square')
          .iconFill(color)
          .iconStroke(false);
        
        // sets tooltip setting for the series
        connectorSeries
        .tooltip()
        .useHtml(true)
        .format(function () {
          return (
            '<h4 style="font-size:14px; font-weight:400; margin: 0.25rem 0;">From: &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<b> ' + this.getData('from') +  '</b></h4>' +
            '<h4 style="font-size:14px; font-weight:400; margin: 0.25rem 0;">Visitor Percentage (%): <b> ' +        this.getData('total').toLocaleString() + '</b></h4>'
          );
        });
        
        };

        // Helper function to bind the data field to the local var.
        function filterFunction(val1, val2) {
          if (val2) {
            return function (fieldVal) {
              return val1 <= fieldVal && fieldVal < val2;
            };
          }
          return function (fieldVal) {
            return val1 <= fieldVal;
          };
        }

        // create a dataset from the data
        var dataSet = anychart.data.set(data).mapAs();

        // create five series filtering the data
        // by the absolute values of the migration numbers
        createSeries(
          'Less than 1%',
          dataSet.filter('total', filterFunction(0, 1)),
          '#FFB36F'
        );
        createSeries(
          '1% to 5%',
          dataSet.filter('total', filterFunction(1, 5)),
          '#FF7903'
        );
        createSeries(
          '5% to 15%',
          dataSet.filter('total', filterFunction(5, 15)),
          '#3fb8c5'
        );
        createSeries(
          '15% to 25%',
          dataSet.filter('total', filterFunction(15, 25)),
          '#1792c0'
        );
        createSeries(
          'More than 25%',
          dataSet.filter('total', filterFunction(25, 100)),
          '#1c5eaa'
        );
        
        // Turns on the legend for the sample
        map
          .legend()
          .enabled(true)
          .position('top')
          .padding([20, 0, 20, 0])
          .fontSize(12)
          .fontColor('#212121');

        map
          .legend()
          .title()
          .enabled(true)
          .fontSize(14.5)
          .padding([0, 0, 5, 0])
          .text('Percentage of visitors (in the year of 2022)')
          .fontColor('#212121');

        // set the container
        map.container('flowmap');

        // draw the map
        map.draw();
  });
});

// Choropleth map
var choroplethMap = "json/choroplethMap.vg.json";
vegaEmbed("#choropleth_map", choroplethMap, {"actions": false}).then(function(result) {}).catch(console.error);

// Bump Chart
var bumpChart = "json/bumpChart.vg.json";
vegaEmbed("#bump_chart", bumpChart, {"actions": false}).then(function(result) {}).catch(console.error);

// Line Chart
var lineChart = "json/lineChart.vg.json";
vegaEmbed("#line_chart", lineChart, {"actions": false}).then(function(result) {}).catch(console.error);

// Overview Chart
var overviewChart = "json/overviewChart.vg.json";
vegaEmbed("#overview_chart", overviewChart, {"actions": false}).then(function(result) {}).catch(console.error);


// Author details accordion
var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

// Scroll Event
window.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
})