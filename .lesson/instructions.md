# Final project

For your final project in this course, you'll work in groups of 2–3 to create a data-driven website containing analyses, visualisations, and reflections based on a real-world dataset.

You can choose from one of the following datasets. Information about them is at the bottom of this write-up.

* CS Education in California high schools
* Beach cleanups in San Luis Obispo county
* Cats sheltered at the Cal Poly Cat Program

Alternatively, if you can find an appropriate publicly accessible dataset to work with, you may use it **after obtaining my approval**.
What's important is that the dataset is meaningful to you and your teammates, or your community.

## Task overview

Your task in this lab is to produce a data-driven web-based report based on the dataset you choose to work with.
Think about it like writing a paper, but instead of just words, you're also presenting your data analysis.

You will put together everything you've learned so far to produce this document. Namely:
* HTML and CSS
* Vega-lite
* TypeScript

Put simply, I'd like for you to "tell me something interesting" from the data.
For example, if you choose to work with the CS Education dataset, dig deeper into equity issues related to who takes CS courses in California schools.

If you work with the Cat Program data, some questions you can try to answer are:
* Are older cats more or less likely to end up at the shelter permanently?
* Are older cats more likely to have health issues?
* Do most cats get their health shots before or after reaching the shelter?
* Are cats of certain colours likely to be at the shelter for longer periods of time than others?

If you work with the Eco SLO data, you might address questions like:
* On average, how many bags of trash and recycling are recovered?
* How has the amount of trash and recycling changed over the years? Are more recent cleanup events removing more or less trash?
* How has the number of volunteers changed over time? The number of events?

**The questions are just examples.** You're encouraged to pursue questions that you find interesting. _There is no requirement that you come up with "significant" or "surprising" responses_.

### Requirements

This is a fairly open-ended project. But there are a few minimum requirements I'd like each project to meet.

* You should produce 1–3 HTML pages. If you produce only 1, then it should be substantial. If you produce more than 1, then you should have a good reason for breaking it up into multiple pages.
* The "front page" (`index.html`) of your report should include a meaningful title as well as the names of all group members.
 
* You must produce at least 3 Vega-lite figures.
  * Each figure should have a meaningful chart title and axis titles.
  * Each figure should be accompanied by a `<p>` tag describing the main insights drawn from the figure.
  * There should be at least 2 types of figures (e.g., don't produce _only_ bar charts or _only_ scatterplots).
  * At least one figure should use the `color` visual encoding.

* You must use TypeScript to transform the data into suitable formats for your charts.
  * This involves using functions, interfaces, map/filter/reduce, etc.
  * In the `<p>` tag describing a given figure's insights, also describe in plain English any transformations you applied to the data to make the chart possible.

* You must use CSS to style your HTML page(s). The page(s) should be aesthetically pleasing, but should not distract from the key points in your report.

## Submission and final presentation

Submit your project using Replit by the project deadline.

On the last day of class, your group will give a brief (5–7 minute) demonstration of your report in front of the rest of the class.

## Available datasets

Choose from one of the following datasets. Alternatively, choose another publicly accessible dataset and bring it to me for approval before beginning work on your project.

### CS Education in California

This dataset is in the file `data/cs-in-ca.json`. The data comes from [csforca.org](https://csforca.org), a non-profit organisation that tracks and advocates for K-12 CS education in California.

I won't go into too much detail about this dataset, since it's the same one you're using in Lab 6.

### Eco SLO: Beach cleanups


The dataset for this project gives details about a number of cleanup events at various locations in SLO. The dataset is in the file `data/eco-slo.json`.

The data comes from [Eco SLO](https://www.ecoslo.org/) (Environmental Center of San Luis Obispo), a non-profit organisation that protects and preserves San Luis Obispo's natural resources.

Each record has the following fields. (Field names are fairly self-explanatory but descriptions are below).

* `date`: The data of the event (in a format that Vega-lite's `temporal` data type will understand)
* `location`: The cleanup site
* `eventName`: The name of the cleanup event
* `adultVolunteers` and `childVolunteers`: The number of adults and children that volunteered at the cleanup event
* `distanceCovered`: In miles
* `trashBags`: The number of bags of trash that were removed from the site
* `weightTrash` and `weightRecycling`: The weight (in pounds) of trash and recycling that were removed from the site
* `totalItems`: The total number of removed items
* `public`: Was the event open to the public?

### Cal Poly Cat Program

The dataset is in `data/cat-program.json`.

This dataset comes from the [Cal Poly Cat Program](https://catprogram.calpoly.edu/). This data should be familiar to you, but some field names have changed, so I am describing the dataset below.

Each record represents a single Cat. Unlike in Lab 1, this is the **full** dataset, containing info about 264 cats.

* `name`: The cat's name
* `sex`: Is the cat male or female?
* `description`: The cat's primary color
* `upForAdoption`: Whether or not the cat is up for adoption
* `arrivalDate`: The date on which the cat arrived at the shelter
* `birthday`: The cat's birthday
* `dewormingDate`, `fivFelvDate`, `fleaControl`: The dates on which various health procedures were carried out. "Fiv" is shorthand for the Feline Immunodeficiency Virus. FeLV is shorthand for the Feline Leukemia Virus. All cats should receive these vaccines.
* `arrivalDetails`: A string describing the circumstances around the cat's arrival. You probably can't use this in a Vega-lite figure, but this field is there to provided added context to this data.
* `isMicrochipped`: Whether or not the cat is microchipped
* `healthIssues`: A string describing any health issues the cat has. If there are no issues, this is `null`.