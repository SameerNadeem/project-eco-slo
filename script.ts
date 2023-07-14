import vegaEmbed, { VisualizationSpec } from "vega-embed";

// TODO: Change this line to read the dataset of your choice.
const dataString: string = await (await fetch('data/eco-slo.json')).text();

// TODO: Define an interface to describe the dataset, and set that interface as the type of this dataset array.

interface Beach {
  date: string, // also change it here
  location: string,
  eventName: string,
  adultVolunteers: number,
  childVolunteers: number,
  distanceCovered: number,
  trashBags: number,
  weightTrash: number,
  weightRecycle: number,
  totalItems: number,
  public: boolean
}

const dataset: Beach[] = JSON.parse(dataString);

// How many events are being held each year? --- Trey
interface events {
  date: string,
  location: number
}

function eventsOverTime(year: string, data: Beach[]) {
  const event: number = data.filter(c => c['date'].split('-')[0] === year).length;

  const result = {
    date: year,
    location: event
  }
  return result;
}

const yearsEvent: string[] = ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];
const eventsData: events[] = [];

for (const events of yearsEvent) {
  eventsData.push(eventsOverTime(events, dataset));
}

const eventChart: VisualizationSpec = {
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
}

vegaEmbed('#event-chart', eventChart);

// // How has the amount of trash and recycling changed over the years? Are more recent cleanup events removing more or less trash? --- Mae

// // ignore this :) const yearlySorted: Beach[] = dataset.sort((year1, year2) => {return year1['date']['year'] - year2['date']['year'];})

interface trashRecyling {
  year: string,
  trash: number,
  recycling: number
}

function getTotalWeightYearly(year: string, data: Beach[]) {
  const trashNum: number = data.filter(c => c['date'].split('-')[0] === year).map(c => c['weightTrash']).reduce((resultSoFar, current) => resultSoFar + current, 0);
  const recyclingNum: number = data.filter(c => c['date'].split('-')[0] === year).map(c => c['weightRecycle']).reduce((resultSoFar, current) => resultSoFar + current, 0);

  const result = {
    year: year,
    trash: trashNum,
    recycling: recyclingNum
  }

  return result;
}

const years: string[] = ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];
const weightOrganized: trashRecyling[] = [];

for (const current of years) {
  weightOrganized.push(getTotalWeightYearly(current, dataset));
}


const trashRecyclingWeightOverYearsChart: VisualizationSpec = {
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
        "field": {"repeat": "layer"},
        "type": "quantitative",
        "title": "Weight of Trash and Recycling"
      },
      "color": {
        "datum": {"repeat": "layer"},
        "type": "nominal"
      }
    }
  }
}

vegaEmbed('#trashrecycling-chart', trashRecyclingWeightOverYearsChart);

// // How has the number of volunteers changed over time? The number of events?
// // add no of adult and child volunteers

interface volunteersovertime {
  date: string,
  adultVolunteers: number,
  childVolunteers: number
}


function getTotalvolunteersYearly(years: string , data: Beach[]) {

  const adultVolunteers: number = (data.filter(c => c['date'].split('-')[0]=== years).map(c => c['adultVolunteers']).reduce((resultSoFar, current) => resultSoFar + current,0))/(data.filter(c => c['date'].split('-')[0]=== years).map(c => c['adultVolunteers']).length);

  const childVolunteers: number = (data.filter(c => c['date'].split('-')[0]=== years).map(c => c['childVolunteers']).reduce((resultSoFar, current,) => resultSoFar + current,0))/(data.filter(c => c['date'].split('-')[0]=== years).map(c => c['childVolunteers']).length);

  const result2 = {
    date:years,
  adultVolunteers: adultVolunteers,
  childVolunteers: childVolunteers
  }
  return result2 ;
}

const years2: string[] = ["2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];
const VolunteersOrganized: volunteersovertime[] = [];

for (const current of years2) {
  VolunteersOrganized.push(getTotalvolunteersYearly(current, dataset));
}

const volunteerChart: VisualizationSpec = {
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
        "field": {"repeat": "layer"},
        "type": "quantitative",
        "title": "Adult And Child Volunteers"
      },
      "color": {
        "datum": {"repeat": "layer"},
        "type": "nominal"
      }
    }
  }
}

vegaEmbed('#overall-chart', volunteerChart);

