const API_URL = 'https://api.umd.io/v0/courses/departments?semester=202008';

 asyc function getCourses() {
    const response = await fetch(API_URL);
    const json = await response.json();
    console.log(json);
}
getCourses();