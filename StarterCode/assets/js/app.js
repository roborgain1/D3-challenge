// set svg dimensions
var svgWidth = 960;
var svgHeight = 700;

// set borders for the svg
var margin = {
    top: 20,
    right: 40,
    bottom: 100,
    left: 60
};

// create the width and height with svg dimensions and margins
var width = svgWidth - margin.right - margin.left;
var height = svgHeight - margin.top -margin.bottom;

// append a div classed chart to scatter element
var chart = d3.select("#scatter").append("div").classed("chart", true);

// append an svg element to chart with svg height and width
var svg = chart.append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// append an svg group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// initial parameters for X and Y Axis
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

