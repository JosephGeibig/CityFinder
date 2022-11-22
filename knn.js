let nn_margin = {top: 60, right: 50, bottom: 50, left: 100},
    nn_width = 800 - nn_margin.left - nn_margin.right,
    nn_height = 400 - nn_margin.top - nn_margin.bottom;

let pathToNNData= "data/nearest_neighbors.csv";

d3.dsv(",", pathToNNData, function (d) {
    return {
    'city_id': +d['city_id'],
    'state_abbreviation': d['State Abbreviation'],
    'city': d['City'],
    'county': d['County'],
    'state': d['State'],
    'city_name': d['city_name'],
    1: +d['1'],
    2: +d['2'],
    3: +d['3'],
    4: +d['4'],
    5: +d['5'],
    6: +d['6'],
    7: +d['7'],
    8: +d['8'],
    9: +d['9'],
    10: +d['10']
    }
    
}).then(function (data) {

    //console.log(data);
    //console.log(UNIQUE_CITIES);

    //Create dropdown to select the state
    d3.select("#StateDropdown")
    .selectAll("options")
    .data(UNIQUE_CITIES).enter()
    .append("option")
    .text(function (d) {
        return d;
    });

    //When the state selection changes, run the method to update the list of cities
    d3.select("#StateDropdown").on("change", function(d) {
        updateCityDropdown(d3.select(this).property("value"));
    })

    //Keeps track of the current selection of cities
    let current_cities = [];
    let current_city_id = 'current_cities_selection';
    let current_city_id_ = '#' + current_city_id;


    //This function clears out the old dropdown and replaces it with the new cities corresponding to the selected state
    function updateCityDropdown(state) {
        current_cities = data.filter(g => g.state == state);
        //console.log(current_cities)

        d3.selectAll(current_city_id_).remove();
        let selection = d3.select("#CityDropdown")
            .selectAll("options")
            .data(current_cities);
        
        selection.enter()
            .append("option")
            .attr('id', current_city_id)
            .merge(selection)
            .text(function (d) {
                return d.city_name;
            });
        
    }

    //Initialize the city dropdown with cities from the first state (Alabama)
    updateCityDropdown('Alabama');
   



}).catch(function (error) {
    console.log(error);
});

