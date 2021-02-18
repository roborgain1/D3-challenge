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

//function used for updating x-scale upon click on axis label
function xScale(timesData, chosenXAxis) {
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(timesData, d => d[chosenXAxis]) * 0.8,
            d3.max(timesData, d => d[chosenXAxis]) * 1.2])
        .range([0, width]);
    return xLinearScale;
}

// function used for updating y-scale upon click on axis label
function yScale(timesData, chosenYAxis) {
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(timesData, d => d[chosenYAxis]) * 0.8,
            d3.max(timesData, d => d[chosenYAxis]) * 1.2])
        .range([height, 0]);
    return yLinearScale
}

// retrieve csv data
d3.csv("/assets/data/data.csv").then(function(timesData) {

    console.log(timesData);

    // parse data
    timesData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.income = +data.income;
        data.age = +data.age;
        data.healthcare = +data.healthcare;
        data.smokes = +data.smokes;
        data.obesity = +data.obesity;
    });

    // create first linear scales
    var xLinearScale = xScale(timesData, chosenXAxis);
    var yLinearScale = yScale(timesData, chosenYAxis);

    // create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    // append y axis
    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);
    
    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(timesData)
        .enter()
        .append("circle")
        .classed("stateCircle", true)
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", 13)
        .attr("opacity", ".6");

    // append initial text
    var textGroup = chartGroup.selectAll(".stateText")
        .data(timesData)
        .enter()
        .append("text")
        .classed("stateText", true)
        .attr("x", d => xLinearScale(d[chosenXAxis]))
        .attr("y", d => yLinearScale(d[chosenYAxis]))
        .attr("dy", 3)
        .attr("dy", 3)
        .attr("font-size", "10px")
        .text(function(d) { return d.abbr});

    // create group for 3 x-axis labels
    var xLabelsGroup = chartGroup.append("g")
        .aatr("transform", `translate(${width / 2}, ${height + margin.top + 20})`);

    var povertyLabel = xLabelsGroup.append("text")
        .classed("aText", true)
        .classed("active", true)
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "poverty")
        .text("In Poverty (%)");

    var incomeLabel = xLabelsGroup.append("text")
        .classed("aText", true)
        .classed("inactive", true)
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "income")
        .text("Median Household Income")

    var ageLabel = xLabelsGroup.append("text")
        .classed("aText", true)
        .classed("inactive", true)
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "age")
        .text("Median Age")


})