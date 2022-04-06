// Fetch JSON data
url = './static/json/samples.json'

// Define json data as variable
var staticData = d3.json(url)

// Console log to see if data is accessible
staticData.then(function(data) {
    console.log(data)
});

// 
function buildPlots(selection) {
    staticData.then(function(data) {
        var metadata = data.metadata;
        var filteredMetadata = metadata.filter(patient => {
            // Double equals because selection is string but id is integer
            return selection == patient.id
        });
        // Population demographics table
        var demoBox = d3.select('#sample-metadata');
        demoBox.html("");
        Object.entries(filteredMetadata[0]).forEach(([key, value]) => {
            demoBox.append("p").text(`${key}: ${value}`);
        });
    });
}

function optionChanged(subject) {
    buildPlots(subject);
}

function init() {
    var selector = d3.select('#selDataset');
    // Whatever sample is selected
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

init();
