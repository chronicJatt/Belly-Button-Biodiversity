// Build Gauge Function
function buildGauge(wfreq) {
    var gauge = d3.select('#gauge');
    gauge.html('');

    var ggData = [{
        domain: {x: [0, 1], y: [0, 1]},
        value: wfreq,
        title: '<b>Belly Button Washing Frequency</b><br>Scrubs per Week',
        type: 'indicator',
        mode: 'gauge+number',
        gauge: {
            axis: {range: [null, 9]},
            steps: [
                {range: [0, 1], color: '#f9f2ec'},
                {range: [1, 2], color: '#f5f0e4'},
                {range: [2, 3], color: '#e9e7c8'},
                {range: [3, 4], color: '#e4e9b0'},
                {range: [4, 5], color: '#d5e599'},
                {range: [5, 6], color: '#b7cc8e'},
                {range: [6, 7], color: '#8ac187'},
                {range: [7, 8], color: '#89bc8d'},
                {range: [8, 9], color: '#85b588'}
            ],
            threshold: {
                line: {color: 'red', width: 4},
                thickness: 0.75,
                value: wfreq
            }
        }
    }];

    var layout = {
        width: 600,
        height: 450,
        margin: {
            t: 0,
            b: 0
        }
    };
    Plotly.newPlot('gauge', ggData, layout);
};