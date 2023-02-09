//Use the D3 library to read in samples.json from the URL 

// Get the endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Filter the dataset and display the charts and data for a given Subject ID.
function charts(testSubjectID) {
    d3.json(url).then((data) => {
      let datatoPlot = data.samples;
      let target = datatoPlot.filter(
        (sampleItem) => sampleItem.id == testSubjectID
      )[0];
      console.log(target);

      //assign the variables of labels, values and ID's
      let labels = target.otu_labels;
      let values = target.sample_values;
      let ids = target.otu_ids;

      // Define and Plot the Horizontal Bar Chart
      var trace1 = {
        x: values.slice(0, 10).reverse(),
        y: ids
          .slice(0, 10)
          .map((otuID) => `OTU ${otuID}`)
          .reverse(),
        text: labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      };
  
      var data = [trace1];
  
      var layout = {
        title: "Top 10 Microbial Species Found",
        xaxis: { autorange: true },
        yaxis: { autorange: true },
        margin: { t: 80, l: 100 },
        height: 380,
      };
  
      Plotly.newPlot("bar", data, layout);
  
      // Define and Plot the Bubble Chart
      var trace1 = {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
          color: ids,
          size: values,
          colorscale: "Electric",
        },
      };
  
      var data = [trace1];
  
      var layout = {
        margin: { t: 10 },
        xaxis: { title: "OTU ID" },
        hovermode: "closest",
        width: window.width,
      };
  
      Plotly.newPlot("bubble", data, layout);
    });
  }
  
  // Demographic Info
  function demoG(testSubjectID) {
    d3.json(url).then((data) => {
      let MetaData = data.metadata;
      let target = MetaData.filter(
        (sampleItem) => sampleItem.id == testSubjectID
      )[0];

      let demographicData = d3.select("#sample-metadata");
      demographicData.html("");

      Object.entries(target).forEach(([key, value]) => {
        demographicData.append("h5").text(`${key}: ${value}`);
      });
  
    });
  }
  
  // Bring the data into the display 
  function init() {
    d3.json(url).then(function (data) {
      console.log(url, data);
      
      // Define the dropdown selection:
      let dropData = d3.select(`#selDataset`);
  
      data.names.forEach((name) => {
        dropData.append(`option`).text(name).property(`value`, name);
      });
      // Set the first sample data into the display
      const firstId = data.names[0];
      charts(firstId); 
      demoG(firstId);
    });
  }
  // On change, insert data for new target data into the demographic and chart display. 
  function optionChanged(newId) {
    charts(newId);
    demoG(newId);
  }
  
  init();
  
