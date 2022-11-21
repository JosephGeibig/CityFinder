// Creating the SVG for the dashboard
var width = 960;
var height = 500;
var svg2 = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

//Write a function to make the dashboard 
//Other things to do: read in data from different file--not state aggregated. Link each city to the state so that only cities in that state appear in when a state is selected. 
//Other things to do: initialize state variable in code for click in chory.js. then run function with that given state as the input. 
// Write a function to make output once the city is selected from the dropdown. Another funciton may be needed to run the KNN as well. 
function DashBoard(state) {
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

    console.log(data);
        
    data.forEach(function (d){
        if (d.StateName === state){
            "cityname" = d.CityName
            }
        
    })
    
    d3.select("#cityDropdown")
        .selectAll("options")
        .data("cityname").enter()
        .append("option")
        .text(function (d) {
            return d;
        })
//        .data(valuelist).enter()
        .attr("value", function (d) {
            return d;
        });
        
     d3.select("#cityDropdown").on("change", function (d) {
           svg2.html("")
//Need to write another function for creating the table. Don't yet know what this table is supposed to look like. Also need to link to knn for the selected city. 
           //createMap(json, data, d3.select(this).property("value"));
    });
        // run creation function on NumCities
  //      createMap(json, data, valuelist[0])
    }
