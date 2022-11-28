
function add_nn_points(svg, projection, state) {
    

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
        'city_state': d['city_state'],
        'city_county': d['city_county'],
        'city_st_abbr': d['city_st_abbr'],
        'lat': d['lat'],
        'lng': d['lng'],
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

        console.log(data);
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
            SELECTED_STATE = state;
            current_cities = data.filter(g => g.state == SELECTED_STATE);
            //console.log(current_cities)
            let c = [{'city':'None'}];
            current_cities.forEach(function(d) {
                c.push(d);
            })
            //console.log(c);
            d3.selectAll(current_city_id_).remove();
            let selection = d3.select("#CityDropdown")
                .selectAll("options")
                .data(c);
            
            selection.enter()
                .append("option")
                .attr('id', current_city_id)
                .merge(selection)
                .text(function (d) {
                    return d.city;
                });
            
        }

        //Initialize the city dropdown with cities from the first state (Alabama)
        updateCityDropdown('None');

        function getCity(city, state) {
            return data.filter(g => g.state == state & g.city == city)[0];
        
        }

        function getCityByID(id) {
            return data.filter(g => g.city_id == id)[0];
        }

        function getCitiesByID(ids) {
            let cities = [];
            for( id in ids) {
                let new_city = getCityByID(ids[id]);
                cities.push(new_city);
            }
            // data.forEach(function(d) {
            //     if(d.city_id in ids) {
            //         cities.push(d)
            //     }
            // });
            return cities;
        }

         //When the city selection changes
        d3.select("#CityDropdown").on("change", function(d) {
            SELECTED_CITY = d3.select(this).property("value")
            getNearestCities(SELECTED_CITY);
        })
        
        function getNearestCities(city_name, n = 5) {
            if (n > 10) {
                n = 10;
            }
            if (n < 0) {
                n = 0;
            }
            // let e = document.getElementById("CityDropdown");
            // let city_name = e.value;

            let cty = getCity(city_name, SELECTED_STATE);
            let nn = [];
            // console.log(cty);
            let indexes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
            for(let i = 0; i < n; i++) {
                let v = cty[indexes[i]];
                nn.push(v);
            }
            // console.log("NN");
            // console.log(nn);
            let cities = getCitiesByID(nn);
            // console.log("Cities");
            // console.log(cities);

            updateCityPoints(svg, cities);

            //nn_cities = data.filter(g => g.city_id == 0);
            //console.log(nn_cities);
        }

        //getNearestCities(0);

        const nn_tip = d3.tip()
            .attr("id", "nn_tooltip")
            .attr('class', 'd3-tip')
            .attr('offset', [-1, 0])
            .html(function (d) {
                return `<strong>City: </strong><span class='details'>${d.city_state}<br></span>
                <strong>Similar To: </strong><span class='details'>${SELECTED_CITY}<br/></span>`
    //                    <strong>Number of Users: </strong><span class='details'>${d.users}<br/></span>
    //                    <strong>Avg Rating: </strong><span class='details'>${d.rating}<br/></span>`
            });
        
        let current_cities_plotted = "current_cities_plotted_1234567";
        let current_cities_plotted_ = '#' + current_cities_plotted;

        let nn_mouseOver = function(d) {
            nn_tip.show(d);
        }

        let nn_mouseLeave = function(d) {
            nn_tip.hide(d);
        }



        function updateCityPoints(svg, cities) {
            // console.log("update city points");
            d3.selectAll(current_cities_plotted_).remove();
            // var projection = d3.geoAlbersUsa()
            //     .translate([width / 2, height / 2]) // translate to center of screen
            //     .scale([1000]); // scale things down so see entire US
            svg
                .selectAll("circle")
                .data(cities)
                .enter()
                .append("circle")
                .attr('id', current_cities_plotted)
                .attr("cx", function(d) {
                    let p = projection([d.lng, d.lat])[0];
                    //console.log("x: " + p);
                    return p;
                })
                .attr("cy", function(d) {
                    let p = projection([d.lng, d.lat])[1];
                    //console.log("y: " + p);
                    return p;
                })
                .attr("r", 3)
                .style("fill", "#FEDE00")
                .style("stroke", "#FEDE00")
                .style("opacity", 0.8)
                .on('mouseover', nn_mouseOver)
                .on('mouseleave', nn_mouseLeave)
                .call(nn_tip);
        }
    



    }).catch(function (error) {
        console.log(error);
    });

}
