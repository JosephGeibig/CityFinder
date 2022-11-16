 
var width = 960;
var height = 500;

var x = document.createElement("SPAN");
x.setAttribute("id", "variableDropdown");
x;

var svg = d3.select('body')
        .attr("id", "choropleth")
        .append('svg').attr("transform", "translate(50, 50)")
        .attr('height', height)
        .attr('width', width);
 svg = svg.append("g");
    
//    const tip = d3.tip()
//        .attr("id", "tooltip")
//        .attr('class', 'd3-tip')
//        .attr('offset', [-1, 0])
//        .html(function (d) {
//            return `<strong>Country: </strong><span class='details'>${d.properties.name}<br></span>
//                    <strong>Game: </strong><span class='details'>${d.game}<br/></span>
//                    <strong>Number of Users: </strong><span class='details'>${d.users}<br/></span>
//                    <strong>Avg Rating: </strong><span class='details'>${d.rating}<br/></span>`
//        });

//    svg.call(tip);

var projection = d3.geoAlbersUsa()
.translate([width / 2, height / 2]) // translate to center of screen
.scale([1000]); // scale things down so see entire US

// definte the state splitting
var path = d3.geoPath() 
.projection(projection); // uses albersusa


//d3.json("us_states.json", function(data) {
//    console.log(data);
//})
//
//d3.csv("data/State agg - no standard.csv", function(data) {
//    console.log(data);
//})
//
//d3.json("us_states.json", function(data) {console.log(data)})
Promise.all([
            // enter code to read files
        d3.json("us_states.json"),
        d3.csv("data/State agg - no standard.csv")
        ]).then(
            // enter code to call ready() with required arguments
            
        function(files) {
//            var states = files[0]
//            var data = files[1]
//            console.log(statedata)
//            console.log(files[0])
//            console.log(files[1])
            
            
        
    
    
    
    
        console.log(files)
        }
        );
//function ready(states, statedata) {
//    console.log(statedata)
    

//}
        
//        function ready(states, statedata) {
//            
////            console.log(data)
//        }





