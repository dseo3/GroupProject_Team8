//Fetching PlanetTerp API
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const urlTerp = "https://api.planetterp.com/v1/grades?course=INST612"; // site that doesn’t send Access-Control-*
let TotalClassGPA = 0.0;

fetch(proxyurl + urlTerp) // https://cors-anywhere.herokuapp.com/https://example.com


  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => { // just do availCourses.forEach
      let total =
        item["A+"] * 4.0 +
        item["A"] * 4.0 +
        item["A-"] * 3.7 +
        item["B+"] * 3.3 +
        item["B"] * 3.0 +
        item["B-"] * 2.7 +
        item["C+"] * 2.3 +
        item["C"] * 2.0 +
        item["C-"] * 1.7 +
        item["D+"] * 1.3 +
        item["D"] * 1.0 +
        item["D-"] * 0.7;

      let numStudents =
        item["A+"] +
        item["A"] +
        item["A-"] +
        item["B+"] +
        item["B"] +
        item["B-"] +
        item["C+"] +
        item["C"] +
        item["C-"] +
        item["D+"] +
        item["D"] +
        item["D-"] +
        item["F"];

      TotalClassGPA += total / numStudents;
    });

    TotalClassGPA /= data.length;
    console.log(TotalClassGPA.toFixed(2));
    document.getElementById("avgGrade").innerHTML =
      "<b>" + "Average Grade: " + "</b>" + TotalClassGPA.toFixed(2);
  });


 