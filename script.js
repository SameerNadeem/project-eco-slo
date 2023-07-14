import vegaEmbed from "vega-embed";
// TODO: Change this line to read the dataset of your choice.
const dataString = await (await fetch('data/eco-slo.json')).text();
const dataset = JSON.parse(dataString);
function eventsOverTime(year, data) {
    const event = data.filter(c => c['date'].split('-')[0] === year).length;
    const result = {
        date: year,
        location: event
    };
    return result;
}
const yearsEvent = ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];
const eventsData = [];
for (const events of yearsEvent) {
    eventsData.push(eventsOverTime(events, dataset));
}
const eventChart = {
    title: "The Amount of Events Over Time",
    data: {
        values: eventsData
    },
    "mark": {
        "type": "area",
        "color": "green"
    },
    "encoding": {
        "x": {
            "field": "date",
            "title": "Year",
            "type": "temporal"
        },
        "y": {
            "field": "location",
            "title": "Number of Events",
            "type": "quantitative"
        }
    }
};
vegaEmbed('#event-chart', eventChart);
function getTotalWeightYearly(year, data) {
    const trashNum = data.filter(c => c['date'].split('-')[0] === year).map(c => c['weightTrash']).reduce((resultSoFar, current) => resultSoFar + current, 0);
    const recyclingNum = data.filter(c => c['date'].split('-')[0] === year).map(c => c['weightRecycle']).reduce((resultSoFar, current) => resultSoFar + current, 0);
    const result = {
        year: year,
        trash: trashNum,
        recycling: recyclingNum
    };
    return result;
}
const years = ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];
const weightOrganized = [];
for (const current of years) {
    weightOrganized.push(getTotalWeightYearly(current, dataset));
}
const trashRecyclingWeightOverYearsChart = {
    title: "The Weight of Trash and Recycling Over the Years",
    data: {
        values: weightOrganized
    },
    "repeat": {
        "layer": ["trash", "recycling"]
    },
    "spec": {
        "mark": "bar",
        "encoding": {
            "x": {
                "field": "year",
                "type": "temporal"
            },
            "y": {
                "field": { "repeat": "layer" },
                "type": "quantitative",
                "title": "Weight of Trash and Recycling"
            },
            "color": {
                "datum": { "repeat": "layer" },
                "type": "nominal"
            }
        }
    }
};
vegaEmbed('#trashrecycling-chart', trashRecyclingWeightOverYearsChart);
function getTotalvolunteersYearly(years, data) {
    const adultVolunteers = (data.filter(c => c['date'].split('-')[0] === years).map(c => c['adultVolunteers']).reduce((resultSoFar, current) => resultSoFar + current, 0)) / (data.filter(c => c['date'].split('-')[0] === years).map(c => c['adultVolunteers']).length);
    const childVolunteers = (data.filter(c => c['date'].split('-')[0] === years).map(c => c['childVolunteers']).reduce((resultSoFar, current) => resultSoFar + current, 0)) / (data.filter(c => c['date'].split('-')[0] === years).map(c => c['childVolunteers']).length);
    const result2 = {
        date: years,
        adultVolunteers: adultVolunteers,
        childVolunteers: childVolunteers
    };
    return result2;
}
const years2 = ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];
const VolunteersOrganized = [];
for (const current of years2) {
    VolunteersOrganized.push(getTotalvolunteersYearly(current, dataset));
}
const volunteerChart = {
    title: "The Number Of Volunteers Over Time",
    data: {
        values: VolunteersOrganized
    },
    "repeat": {
        "layer": ["adultVolunteers", "childVolunteers"]
    },
    "spec": {
        "mark": "line",
        "encoding": {
            "x": {
                "field": "date",
                "type": "temporal"
            },
            "y": {
                "field": { "repeat": "layer" },
                "type": "quantitative",
                "title": "Adult And Child Volunteers"
            },
            "color": {
                "datum": { "repeat": "layer" },
                "type": "nominal"
            }
        }
    }
};
vegaEmbed('#overall-chart', volunteerChart);
//# sourceMappingURL=script.js.map