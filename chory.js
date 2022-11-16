var width = 960;
var height = 500;

var lowColor = '#DEEDCF';
var highColor = '#0A2F51';




// D3 Projection
var projection = d3.geoAlbersUsa()
.translate([width / 2, height / 2]) // translate to center of screen
.scale([1000]); // scale things down so see entire US

// definte the state splitting
var path = d3.geoPath() 
.projection(projection); // uses albersusa

// Create SVG element and append map to the SVG

var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

var pathToCsv2 = "data/State agg - standard.csv"; //please note this csv doesnt have alaska
// path to csv
//
// Promise.all([
//            // enter code to read files
//        d3.json("us_states.json"),
//        d3.csv("data/state_agg_no standard.csv")
//        ]).then(
//            // enter code to call ready() with required arguments
//            data => ready(null, data[0], data[1])
//            
//        );
//        function ready(error, states, data) {
//            console.log(data)
//        }
valuelist = ["NumCities","Avg_recent_hincome","PC_historic_hincome","AYPC_historic_hincome","minwage", "Avg_recent_housep","PC_historic_housep","PC_historic_housep","AYPC_historic_housep","Violent_Crime","Property_Crime","Property_Crime_PC","Violent_Crime_PC","Total_Crime_PC","Pop","Men","Women","VotingAge","Employed","Hispanic","White","Black","Native","Asian","Pacific","Income","Income_PC","Poverty","ChildPoverty","Professional","Service","Office","Construction","Production","Drive","Carpool","Transit","OtherTrans","WorkAtHome","MeanCommute","PrivateWork","SelfEmployed","FamilyWork","Unemployment","Population"];
d3.dsv(",", pathToCsv2, function (d) {
  return {
      State_abbrev: d["State Abbreviation"],
      StateName: d["State Name"],
      NumCities: d["Number of Cities"],
      Avg_recent_hincome: d["Average Household Income 2020/2021"],
      PC_historic_hincome: d["Percent Change in Household Income, 1984-2019"],
      AYPC_historic_hincome: d["Average Yearly Percent Change in Household Income, 1984-2019"],
      minwage: d["MinWage"],
      Avg_recent_housep: d["Average House Price 2020/2021"],
      PC_historic_housep: d["Percent Change in Housing Prices, 2000-2019"],
      AYPC_historic_housep: d["Average Yearly Percent Change in Housing Prices, 2000-2019"],
      Violent_Crime: d["Violent Crime Total"],
      Property_Crime: d["Property Crime Total"],
      Property_Crime_PC: d["Property Crime Per Capita"],
      Violent_Crime_PC: d["Violent Crime Per Capita"],
      Total_Crime_PC: d["Total Crime Per Capita"],
      Pop: d.TotalPop,
      Men: d.Men,
      Women: d.Women,
      VotingAge: d.VotingAgeCitizen,
      Employed: d.Employed,
      Hispanic: d.Hispanic,
      White: d.White,
      Black: d.Black,
      Native: d.Native,
      Asian: d.Asian,
      Pacific: d.Pacific,
      Income: d.Income,
      Income_PC: d.IncomePerCap,
      Poverty: d.Poverty,
      ChildPoverty: d.ChildPoverty,
      Professional: d.Professional,
      Service: d.Service,
      Office: d.Office,
      Construction: d.Construction,
      Production: d.Production,
      Drive: d.Drive,
      Carpool: d.Carpool,
      Transit: d.Transit,
      OtherTrans: d.OtherTransp,
      WorkAtHome: d.WorkAtHome,
      MeanCommute: d.MeanCommute,
      PrivateWork: d.PrivateWork,
      SelfEmployed: d.SelfEmployed,
      FamilyWork: d.FamilyWork,
      Unemployment: d.Unemployment,
      Population: d.Population,

  }
}).then(function (data) {

    console.log(data);
//    console.log(data.columns)

    var dataarray = [];
    
    for (var i = 0; i < data.length; i++) {
//        if data[i].
        dataarray.push(parseFloat(data[i].NumCities))
//        console.log(data[i].NumCities)
    }

    //
//    console.log(dataarray)
    var maxx = d3.max(dataarray);
    var minn = d3.min(dataarray);
    var scaler = d3.scaleLinear()
                    .domain([minn,maxx])
                    .interpolate(d3.interpolateLab)
                    .range([lowColor,highColor]);
//    console.log(maxx, minn)

    d3.json("us_states.json", function(json) {
        for (var i = 0; i < data.length; i++) {
            var dataState = data[i].StateName;
            var dataValue = parseInt(data[i].NumCities); // This will need to be replaced / reactive
            for (var j = 0; j < json.features.length; j++) { // loop the json to find the states
                var jsonState = json.features[j].properties.name;
                if (dataState == jsonState) {
                    json.features[j].properties.NumCities = dataValue; // Get the coords from the json
                    break; // stop when coords are found
                }
            }
        }
        
//        console.log(json)
        
//         The below code is the creation of the choropleth. Include here if you just want a static choropleth. It is included later to do the reactive thing 
//        svg.selectAll("path")
//            .data(json.features)
//            .enter()
//            .append("path")
//            .attr("d", path)
//            .style("stroke", "#000")
//            .style("stroke-width", "1")
//            .style("fill", function(d) { return scaler(d.properties.NumCities) });
        
        var valuelist = ["NumCities","Avg_recent_hincome","PC_historic_hincome","AYPC_historic_hincome","minwage", "Avg_recent_housep","PC_historic_housep","PC_historic_housep","AYPC_historic_housep","Violent_Crime","Property_Crime","Property_Crime_PC","Violent_Crime_PC","Total_Crime_PC","Pop","Men","Women","VotingAge","Employed","Hispanic","White","Black","Native","Asian","Pacific","Income","Income_PC","Poverty","ChildPoverty","Professional","Service","Office","Construction","Production","Drive","Carpool","Transit","OtherTrans","WorkAtHome","MeanCommute","PrivateWork","SelfEmployed","FamilyWork","Unemployment","Population"];
        
//        console.log(valuelist[0])
//        var dictionary = {}
//        for (var i = 0; i < data.length; i++) {}
//        
        
        var dropvar = data.columns
        var first = dropvar.shift() // ignore these its the only way I could get this to work
        var second = dropvar.shift() // ""
        var third = dropvar.shift() // ""

        
// #### NEED TO DO ####
// WE NEED TO CHANGE THE DISPLAY VARIABLES TO DROPVAR WHILE KEEPING THE VALUES AS VALUELIST
//variables: 
//           dropvar = the variable names that are pretty and we want to display
//           valuelist = the variable names actually used in the math
        
        d3.select("#variableDropdown")
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

        
    function createMap(json, data, varselect) {
        
    var datafilter = data.map(function(d){return {State: d.StateName, value:parseFloat(d[varselect])};
                                         })
   
        for (var i = 0; i < data.length; i++) {
            var dataState = datafilter[i].State;
            var dataValue = datafilter[i].value;
            for (var j = 0; j < json.features.length; j++) { // loop the json to find the states
                var jsonState = json.features[j].properties.name;
                if (dataState == jsonState) {
                    json.features[j].properties.variable = dataValue; // Get the coords from the json
                    break; // stop when coords are found
                }
            }
        }
//        
//        console.log(json.features)
        
        var dataray = []
        
        for (var i = 0; i < data.length; i++) {
        dataray.push(parseFloat(datafilter[i].value))
    }
        
//        console.log(dataray)
        var lowColor = '#DEEDCF';
        var highColor = '#0A2F51';
        var maxx1 = d3.max(dataray);
        var minn1 = d3.min(dataray);
        var scaler1 = d3.scaleLinear()
                    .domain([minn1, maxx1])
                    .interpolate(d3.interpolateLab)
                    .range([lowColor, highColor]);

        console.log(dataray, minn1, maxx1)
        
   svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "#fff")
            .style("stroke-width", "1")
            .style("fill",function(d) {
            return scaler1(d.properties.variable)
        }) 
        
//            if (ratings_dict[d.properties.name]["Average Rating"] === 0) return "gray";
//            return color(ratings_dict[d.properties.name]["Average Rating"]);
//        })

               
               // Hover label -- add later
//    .on('mouseover', function (d) {
//        var rating = ratings_dict[d.properties.name]["Average Rating"];
//        d.rating =  rating > 0? rating: "N/A";
//        d.users = ratings_dict[d.properties.name]["Number of Users"] || "N/A";
//        d.game = selectedGame;
//        tip.show(d);
//        d3.select(this)
//            .style('stroke-width', 2);
//    }).on('mouseout', function (d) {
//            tip.hide(d);
//            d3.select(this)
//                .style('stroke-width', 0.3);
//    });
//}
//        
//        
//        
//        
        
        
        

    }
        
    });
   
    
});


