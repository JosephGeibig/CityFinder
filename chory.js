

//{ 
//"type": "module"
//}

 
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

// formatting for large numbers
var thousandsformat = d3.format(",");

// Create SVG element and append map to the SVG

var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


// variables for later
var clicked = "false"
var selected = undefined



var pathToCsv2 = "data/State agg - no standard.csv"; //please note this csv doesnt have alaska


//Put your hard-coded list in `constants.js` files to clean things up.
//It is reachable by the variable `VARIABLE_NAMES`
var valuelist = VARIABLE_NAMES;
        
d3.dsv(",", pathToCsv2, function (d) {
  return {
      State_abbrev: d["State Abbreviation"],
      StateName: d["State Name"],
      ["Number of Cities"]: d["Number of Cities"],
      ["Average 2020/2021 household income"]: d["Average Household Income 2020/2021"],
      ["Historic Percent Change in Household Income 1984-2019"]: d["Percent Change in Household Income, 1984-2019"],
      ["Average Yearly Historic Percent Change in Income 1984-2019"]: d["Average Yearly Percent Change in Household Income, 1984-2019"],
      ["Minimum Wage"]: d["MinWage"],
      ["Average House Price 2020/2021"]: d["Average House Price 2020/2021"],
      ["Percent Change in Historic House Prices 2000-2019"]: d["Percent Change in Housing Prices, 2000-2019"],
      ["Average Yearly Percent Change in Housing Prices 2000-2019"]: d["Average Yearly Percent Change in Housing Prices, 2000-2019"],
      ["# of Violent Crime"]: d["Violent Crime Total"],
      ["# of Property Crime"]: d["Property Crime Total"],
      ["Property Crime Per Capita"]: d["Property Crime Per Capita"],
      ["Violent Crime Per Capita"]: d["Violent Crime Per Capita"],
      ["Total Crime Per Capita"]: d["Total Crime Per Capita"],
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
      ["Average Income"]: d.Income,
      ["Income Per Capita"]: d.IncomePerCap,
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
            var dataValue = parseInt(data[i]["Number of Cities"]); // This will need to be replaced / reactive
//            console.log(dataValue)
            for (var j = 0; j < json.features.length; j++) { // loop the json to find the states
                var jsonState = json.features[j].properties.name;
                if (dataState == jsonState) {
                    json.features[j].properties.NumCities = dataValue; // Get the coords from the json
                    break; // stop when coords are found
                }
            }
        }

        
        var valuelist = ["Number of Cities",
                         "Average 2020/2021 household income",
                         "Historic Percent Change in Household Income 1984-2019",
                         "Average Yearly Historic Percent Change in Income 1984-2019",
                         "Minimum Wage", 
                         "Average House Price 2020/2021",
                         "Percent Change in Historic House Prices 2000-2019",
                         "Average Yearly Percent Change in Housing Prices 2000-2019",
                         "# of Violent Crime",
                         "# of Property Crime",
                         "Property Crime Per Capita",
                         "Violent Crime Per Capita",
                         "Total Crime Per Capita",
                         "Pop",
                         "Men",
                         "Women",
                         "VotingAge",
                         "Employed",
                         "Hispanic",
                         "White",
                         "Black",
                         "Native",
                         "Asian",
                         "Pacific",
                         "Average Income",
                         "Income Per Capita",
                         "Poverty",
                         "ChildPoverty",
                         "Professional",
                         "Service",
                         "Office",
                         "Construction",
                         "Production",
                         "Drive",
                         "Carpool",
                         "Transit",
                         "OtherTrans",
                         "WorkAtHome",
                         "MeanCommute",
                         "PrivateWork",
                         "SelfEmployed",
                         "FamilyWork"
                         ,"Unemployment",
                         "Population"];
        

        
        
        // If we want to add city dots the code below *should* do it. Major problems with null values that brick live preview somewhere down the line
        
        // If we do this we should add a "show cities" button that shows / hides the cities
        
        // If we include this information we have to provide a link to the city georgaphies dataset somewhere on the page, probably in the data section
        
        
        
//        d3.csv("data/gdata_not_standardized.csv", function(city) {
//						console.log(city)
//						svg.selectAll("circle")
//						   .data(city)
//						   .enter()
//						   .append("circle")
//						   .attr("cx", function(d) {
//                            return (projection([d.lng,d.lat])[0])
////							   
//						   })
////                        console.log(projection([d.lng,d.lat]))
//						   .attr("cy", function(d) {
//							   return projection([d.lng, d.lat])[1];
//						   })
////						   .attr("r", 5)
//						   .style("fill", "yellow")
//						   .style("stroke", "gray")
//						   .style("stroke-width", 0.25)
//						   .style("opacity", 0.75)
//						   .append("title")			//Simple tooltip
//						   .text(function(d) {
//								return d.place + ": Pop. " + formatAsThousands(d.population);
//						   });
        

        
        
        
        
        
        
        var dropvar = data.columns
        var first = dropvar.shift() // ignore these its the only way I could get this to work
        var second = dropvar.shift() // ""
        var third = dropvar.shift() // ""
        
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
        var lowColor = '#91DFDA';
        var highColor = '#00354C';
        var midColor = "#3195BE";
        var pickColor = "#ff8200";
        var maxx1 = d3.max(dataray);
        var midd1 = d3.median(dataray)
        var minn1 = d3.min(dataray);
        var scaler1 = d3.scaleLinear()
                    .domain([minn1,midd1, maxx1])
                    .interpolate(d3.interpolateLab)
                    .range([lowColor,midColor, highColor]);

        
        
        
        
        
    // mouseover code, remove if you dont want mouseover
        
    //tooltip for the mouseover
        
    const tip = d3.tip()
        .attr("id", "tooltip")
        .attr('class', 'd3-tip')
        .attr('offset', [-1, 0])
        .html(function (d) {
            return `<strong>State: </strong><span class='details'>${d.properties.name}<br></span>
            <strong>Number of Cities: </strong><span class='details'>${d.properties.NumCities}<br/></span>
            <strong>${varselect}: </strong><span class='details'>${d.properties.variable}<br/></span>`
//                    <strong>Number of Users: </strong><span class='details'>${d.users}<br/></span>
//                    <strong>Avg Rating: </strong><span class='details'>${d.rating}<br/></span>`
        });
        
    svg.call(tip);

        //mouseover code
                
    let mouseOver = function(d) {
        d3.selectAll(".State")
            .transition()
            .duration(200)
            .style("opacity",.5)
        
        tip.show(d);
        
        
        d3.select(this)
            .transition()
            .duration(200)
            .style("opacity", 1)
            .style("stroke", "#000")
    
        if (clicked === "true" && selected === d.properties.name 
                    ) {
                    
                     d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", pickColor)
                    
                    }

    }
    
    let mouseLeave = function(d) {
        if (d.properties.name != selected) {
                    
                    
                    
                    d3.selectAll(".State")
                    .transition()
                    .duration(200)
                    .style("opacity",.8)



                tip.hide(d);

                 if (clicked === "false" || clicked === "true" && selected != d.properties.name 
                    ) {

                    d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", .8)
                        .style("stroke", "transparent")
                    
                if (clicked === "true" && selected === d.properties.name 
                    ) {
                    
                     d3.select(this)
                        .transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("stroke", pickColor)
//                        .style("fill",pickColor)
                    
                    }
                     
                 }
                }
        
    }
    
    
    // on click code
//        export selected
//        export clicked
        let oneclick = function(d) {
            if (clicked === "false"){
            clicked = "true";
            selected = d.properties.name;
                dashdrop(selected)
//            modules.export = {selected = selected}    
            
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style("opacity", 1)
                    .style("stroke", pickColor)
//            export {clicked, selected}
            
            }
    }
         
        let dubclick = function(d) {
            if (clicked === "true" && selected === d.properties.name){
                
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style("opacity", .8)
                    .style("stroke", "transparent")
//                    .style("fill", )
            selected = undefined;
            dashdrop(selected)
            clicked = "false";
            
//                export {clicked, selected}
                }
    }
        
        
   svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "transparent")
            .style("stroke-width", 2)
            .style("fill",function(d) {
            return scaler1(d.properties.variable)
            
   }) 
         // mouseover code, remove if you dont want mouseovers
            .style("opacity", .8)
            .on("mouseover", mouseOver)
            .on("mouseleave", mouseLeave)
                    
        
        // on click code
            .on("click", oneclick)
//        on double click code –– cancels the click selection
            .on("dblclick",dubclick)
        
        
// legend
        
        // I have genuinely no idea how to fix this, but it would be a good add. Code pulled form choropleth_example.js
        
//        var w = 140, h = 300;
//
//        var key = d3.select("span")
//            .append("svg")
//            .attr("width", width)
//            .attr("height", 1500)
//            .attr("class", "legend");
//
//        var legend = key.append("defs")
//            .append("svg:linearGradient")
//            .attr("id", "gradient")
//            .attr("x1", "100%")
//            .attr("y1", "0%")
//            .attr("x2", "100%")
//            .attr("y2", "100%")
//            .attr("spreadMethod", "pad");
//
//        legend.append("stop")
//            .attr("offset", "0%")
//            .attr("stop-color", highColor)
//            .attr("stop-opacity", 1);
//
//        legend.append("stop")
//            .attr("offset", "100%")
//            .attr("stop-color", lowColor)
//            .attr("stop-opacity", 1);
//
//        key.append("rect")
//            .attr("width", w - 100)
//            .attr("height", h)
//            .style("fill", "url(#gradient)")
//            .attr("transform", "translate(0,10)");
//
//        var y = d3.scaleLinear()
//            .range([h, 0])
//            .domain([minn1, maxx1]);
//
//        var yAxis = d3.axisRight(y);
//
//        key.append("g")
//            .attr("class", "y axis")
//            .attr("transform", "translate(100,-100)")
//            .call(yAxis)
//        
        
        
              // add dashboard  
        
    

    }
    });
function dashdrop(state){
var pathToCsv3 = "data/dns4.csv";
d3.dsv(",", pathToCsv3, function (d) {
        return {
            State_abbrev: d["State Abbreviation"],
            StateName: d["State Name"],
            CityName: d.City,
            CountyName: d["County Name"],
            ["Average 2020/2021 household income"]: d["Average Household Income 2020/2021"],
            ["Historic Percent Change in Household Income 1984-2019"]: d["Percent Change in Household Income, 1984-2019"],
            ["Average Yearly Historic Percent Change in Income 1984-2019"]: d["Average Yearly Percent Change in Household Income, 1984-2019"],
            ["Minimum Wage"]: d["MinWage"],
            ["Average House Price 2020/2021"]: d["Average House Price 2020/2021"],
            ["Percent Change in Historic House Prices 2000-2019"]: d["Percent Change in Housing Prices, 2000-2019"],
            ["Average Yearly Percent Change in Housing Prices 2000-2019"]: d["Average Yearly Percent Change in Housing Prices, 2000-2019"],
            ["# of Violent Crime"]: d["Violent Crime Total"],
            ["# of Property Crime"]: d["Property Crime Total"],
            ["Property Crime Per Capita"]: d["Property Crime Per Capita"],
            ["Violent Crime Per Capita"]: d["Violent Crime Per Capita"],
            ["Total Crime Per Capita"]: d["Total Crime Per Capita"],
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
            ["Average Income"]: d.Income,
            ["Income Per Capita"]: d.IncomePerCap,
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

//        console.log(data);
        
        
       // d3.select("#cityDropdown").on("change", function (d) {
    let current_citiess = [];
    let current_city_ids = 'current_cities_selection';
    let current_city_idss = '#' + current_city_ids;
            
    if (state != undefined){
        current_citiess = data.filter(function(d){ return d.StateName == state});
        console.log(current_citiess)

        d3.selectAll(current_city_ids).remove();
        let selection = d3.select("#cDropdown")
            .selectAll("options")
            .data(current_citiess);
        
        selection.enter()
            .append("option")
            .attr('id', current_city_ids)
            .merge(selection)
            .text(function (d) {
              return d.CityName;
            });
    }
    if (state == undefined){
        current_citiess = data.filter(function(d){ return d.StateName == state});
        console.log(state)
        d3.select("#cDropdown").html("")

        
            
        
}
    });
};
});
 