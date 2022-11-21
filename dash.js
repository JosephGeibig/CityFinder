// Creating the SVG for the dashboard
var svg2 = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

//Write a function to make the dashboard 
//Other things to do: read in data from different file--not state aggregated. Link each city to the state so that only cities in that state appear in when a state is selected. 
function DashBoard(state){
    
    d3.select("#cityDropdown")
        .selectAll("options")
        .data(valuelist).enter()
        .append("option")
        .text(function (d) {
            return d;
        })
//        .data(valuelist).enter()
        .attr("value", function (d) {
            return d;
        });
       
            // event listener for the dropdown. Update choropleth and legend when selection changes. Call createMapAndLegend() with required arguments.
        d3.select("#variableDropdown").on("change", function (d) {
            svg.html("")
            createMap(json, data, d3.select(this).property("value"));
    });
        // run creation function on NumCities
        createMap(json, data, valuelist[0])
}