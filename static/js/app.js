// Fetch JSON data
url = './static/json/samples.json'

// Define json data as variable
var staticData = d3.json(url)

// Console log to see if data is accessible
staticData.then(function(data) {
    console.log(data)
});

// Build Plots Functon
function buildPlots(selection) {
    staticData.then(function(data) {
        // Filter through metadata for object with matching id
        var metadata = data.metadata;
        var filteredMetadata = metadata.filter(subject => {
            // Double equals because selection is string but id is integer
            return selection == subject.id
        });
        // Populate demographics table with subject metadata
        var demoBox = d3.select('#sample-metadata');
        demoBox.html('');
        Object.entries(filteredMetadata[0]).forEach(([key, value]) => {
            demoBox.append('p').text(`${key}: ${value}`);
        });

        // Filter through samples for object with matching id
        var samples = data.samples;
        var filteredSamples = samples.filter(subject => {
            return selection == subject.id
        });
        // Populate Horizontal Bar Chart with filtered sample data
        var barChart = d3.select('#bar');
        barChart.html('');
        // Slice top 10 
        var sampleValues = filteredSamples[0].sample_values;
        var otuIDs = filteredSamples[0].otu_ids;
        var otuLabels = filteredSamples[0].otu_labels;
        var hbData = [{
            type: 'bar',
            x: sampleValues.slice(0,10).reverse(),
            y: otuIDs.map(otu => 'OTU' + ' ' + otu).slice(0,10).reverse(),
            text: otuLabels.slice(0,10).reverse(),
            orientation: 'h'
        }];
        Plotly.newPlot('bar', hbData);
        
        // Bubble Chart
        var bubbleChart = d3.select('#bubble');
        bubbleChart.html('');
        var trace1 = {
            x: otuIDs,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
                color: otuIDs,
                size: sampleValues,
                colorscale: 'Earth'
            }
        };
        var bbData = [trace1];
        Plotly.newPlot('bubble', bbData);
    });
}

// Define optionChange function being called in HTML file
function optionChanged(subject) {
    buildPlots(subject);
}

// Define init function
function init() {
    var selector = d3.select('#selDataset');
    // Populate dropdown list with subject id's
    staticData.then((data) => {
        var names = data.names;
        names.forEach((name) => {
            selector
            .append('option')
            .text(name)
            .property('value', name);
        });
        // Use first sample to build initial plots
        buildPlots(names[0]);
    });
}

// Call init function on pageload
init();