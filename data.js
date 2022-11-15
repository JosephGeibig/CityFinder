// potential way to load data, will have to eventually pair the data with the us_states json (might not go well)


//Promise.all([
//            // enter code to read files
//        d3.json("us_states"),
//        d3.csv("data/Stat agg - standard2.csv")
//        ]).then(
//            // enter code to call ready() with required arguments
//            data => ready(null, data[0], data[1])
//        );




// Data loading code (might need to go into the choropleth file due to the cross pathing, but idk)

// Will need to adjust the listed csv file for the correct csv

// THIS IS THE AGGREGATED STANDARDIZED DATA 

var pathToCsv1 = "data/State agg - standard2.csv";		// path to csv
	
    d3.dsv(",", pathToCsv1, function (d) {
      return {
          State_abbrev: d["State Abbreviation"],
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
        
        // have to find a way to link this data to the us_states json to be able to map it to choropleth
        
        // in order to do this we might need to add another column of "state name" based on the state_abbrev or change the name in us_states to the abbreviated version (Might need to find a way to standardize hte number of cities value but unsure about how important that might be)
        
        // Not sure how the above will work from between files but we'll make it happen
        
        // OTHER FUNCTIONALITY
        // need to do the following
        // - make a formulation that averages every one of these metrics into one value for the choropleth
        // - need to have a way to adjust each (or most of these) of these with a variable / slider combination (might require being in one file with the choropleth)
    
    })

// Need to duplicate this file with the non-aggregated data. This will require more rows as all of the character values were removed from the agg data 



// THE NON-STANDARDIZED AGG DATA 

// This data needs to be updated as the agg - standard data was 
var pathToCsv2 = "data/State agg - no standard.csv";		// path to csv
	
    d3.dsv(",", pathToCsv2, function (d) {
      return {
          State_abbrev: d["State Abbreviation"],
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
        
        // have to find a way to link this data to the us_states json to be able to map it to choropleth
        
        // in order to do this we might need to add another column of "state name" based on the state_abbrev or change the name in us_states to the abbreviated version (Might need to find a way to standardize hte number of cities value but unsure about how important that might be)
        
        // Not sure how the above will work from between files but we'll make it happen
        
        // OTHER FUNCTIONALITY
        // need to do the following
        // - make a formulation that averages every one of these metrics into one value for the choropleth
        // - need to have a way to adjust each (or most of these) of these with a variable / slider combination (might require being in one file with the choropleth)
    
    })

