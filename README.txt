TEAM 029 README
DESCRIPTION: 
	The package contains a few files for tool. The tool is created using the index.html file, which loads our web-based visualization. This file also contains all necessary d3.js libraries needed for our visualization to operate. The code for our visualizations is contained within the javascript.js file. This file has code to create the choropleth, the KNN, as well as functions to load in the data exploration based on selected state and cites. 
	In KNN.ipynb, we have the python code for generating the csv file used for the KNN model. As for the data used, there are several files used for our visualization. State agg - no standard.csv is used for the creation of the choropleth map. dns4.csv is used for the data exploration. This file is similar to State agg - no standard.csv, except it's aggregated by cities instead of states. nearest_neighbors.csv is used for the creation of the KNN model. 
	When the package is opened in a web server, the website appear. The website contains our title, a description of our motivations for creating the website, and some information on how to use the tool and the methods used. Then the visualization is shown, with the data exploration graph below. Beneath the data exploration graph is a description of the KNN, with links to our data sources below. 

INSTALLATION:

	To install our tool, the code file first needs to be downloaded. As our tool is web-based, a web server needs to be created. A web server can be created by opening the terminal and typing the phrase in quotes: 'python -m http.server 8000'. You can then open a web browser by navigating to 'http://localhost:8000/'. The number 8000 is not necessary, and the user can choose another number, such as 6000, and have the same results. For more information on how to create a web server, navigate to https://ryanblunden.com/create-a-http-server-with-one-command-thanks-to-python-29fcfdcd240e.
	Once this web server is created and accessed, navigate to where the package was installed, and open the file. It should display a webpage. 
	Alternatively, should a user not want to have to use a web server, they can navigate to https://josephgeibig.github.io/City-QOL/, our website which has the tool. 

EXECUTION:

	Once the website is open, navigate down the visualization. On the right, under the "Which Variable?", select a variable, such as "% Hispanic". Once the variable is selected, click on state. This allows a user to use the KNN model, where a city in that state and the number of cities can be selected via the slider. Clicking on Texas, and then San Antonio, we can see that Dallas, Phoenix, and Fort Worth are the 3 most similar cities. After that, go down the second Select City dropdown and select Houston and San Antonio. Multiple cities can be selected from the dropdown. Click the "Show me the money!" Button and a graph will appear. Press the reset button to clear the graph, allowing the user to select different cities. Double click on the state on the map in order to clear the KNN and the Data Exploration tabs. This can be repeated for different variables, states, and cities. 


DEMO VIDEO:
https://youtu.be/C7EFUrbmlr8 



