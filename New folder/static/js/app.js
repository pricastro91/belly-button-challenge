console.log("app.js")

var selector = d3.select("#selDataset");

d3.json("samples.json").then((data) => {
    console.log("data")
    console.log(data)

    let names = data.names;

    for (let i = 0; i < names.length; i++) {
        selector
            .append("option")
            .text(names[i])
            .property("value", names[i]);
    };

    buildMetadata(names[0]);
    buildCharts(names[0]);


})

function buildMetadata(id) {
    d3.json("samples.json").then((data) => {

        let keys = data.metadata;
        let resultArray = keys.filter(sampleObj => sampleObj.id == id);
        console.log("resultArray")
        console.log(resultArray)
        let result = resultArray[0];

        let PANEL = d3.select("#sample-metadata");
        PANEL.html("");

        for (key in result) {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
        };
    })
}

function optionChanged(id) {
    buildMetadata(id);
    buildCharts(id);
}



function buildCharts(id) {
    d3.json("samples.json").then((data) => {

        let keys = data.samples;
        let resultArray = keys.filter(sampleObj => sampleObj.id == id);
        console.log("resultArray")
        console.log(resultArray)
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        let barData = [
            {
                y: yticks,
                x: sample_values.slice(0, 10).reverse(),
                text: otu_labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h",
            }
        ];

        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", barData, barLayout);

        let bubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Earth"
                }
            }
        ];

        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t: 30 }
        };


        Plotly.newPlot("bubble", bubbleData, bubbleLayout);


    })

}
