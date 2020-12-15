# GroupProject_Team8
Group Project INST377

# GroupProject_Team8: Course Connector
 
Course Connector is a web application that will allow undergraduate students at the University of Maryland find courses that will not only fulfill their major requirements, but align with their interests as well. 
 
This application will provide students with random course recommendations based on their selected major. By displaying a single course at a time, users will be able to discover courses that align with their interests in a more consumable fashion and save them to reference later.  
 
 
## Link to Heroku:  https://blooming-temple-21487.herokuapp.com/#
 
 
### Target browser:

While developing Course Connector we aimed to consider our audience (University of Maryland (UMD) undergraduate students) when deciding what browsers would be compatible with the majority of our users. By considering what softwares our target audience is most familiar with, we concluded that it would be best to target our web app to Android Operating Systems and the Google Chrome browser. 


## Link to User Manual: [User Manual Link](#user-manual)
 
## Link to Developer Manual:[Developer Manual Link](#developer-manual)
 
 
 
 
# User Manual 
 
Begin by selecting the department associated with your declared major or major of interest in the dropdown menu. 
Once you find your major confirm your choice by clicking the “Choose” button next to the dropdown bar
After hitting the “Choose” button you should see a new course recommendation that aligns with your selected department
Review the Details of the course in the tiles presented below 
If you are not interested in the displayed course click the “X” button on the bottom left hand side of the window to view a new course recommendation
If you like the course and would consider enrolling it, click the heart button in the bottom right hand corner to save it to your bookmarked courses.
After clicking this button you will also see a new course recommendation 
To view your saved courses, click the bookmarks icon at the navigation bar on the bottom of the page. 
To view more details about your saved courses such as the full description, average grade and sections, click the “Learn More” button on the saved course tile 
**If you know courses that you are interested in, navigate to the search page to type in courses that you are interested in.




# Developer Manual


### How to install your application and all dependencies

To download our actual project, just select the clone repository button for this repository to clone it to your computer. Using Github desktop will be the easiest way to clone the repository. You can find information about Github Desktop here: https://desktop.github.com/


#### Bulma
Our project harnesses Bulma, a CSS framework for stylizing HTML in an easy manner. You can find the instructions on how to install Bulma here: *https://bulma.io/documentation/overview/start/*. The simplest way to do this is by using npm to install it. Open a new terminal and enter *“npm install bulma”*. For Bulma to work correctly a few things need to added. These are already included in our project, but if you are trying to recreate our work, make sure you include the following:
* A HTML doctype like so: *<!DOCTYPE html>*
* Code in the HTML to make the viewport responsive: *<meta name="viewport" content="width=device-width, initial-scale=1">* 
* The following code in your "head" element: *<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css"/>*


#### Font Awesome
Font Awesome is an icons library. It can be found here: *https://fontawesome.com/*. To see their entire library of icons, go here, *https://fontawesome.com/icons?d=gallery*. When you find one you like, you can hit "start using this icon" on that icons page to get the HTML tag for adding it to your HTML.
We use this for all of the icons on our site. We have added the script for this library already to our HTML. 
* In case you are curious, here is the code to add it: *<script defer src="https://use.fontawesome.com/releases/v5.14.0/js/all.js"></script>*


#### jQuery
Our project uses jQuery, primarily to display the courses on the home page. You can install the library by opening terminal and running the following: npm install jquery
Here is the link to their website which has more in depth downloading instructions: *https://jquery.com/download/*. To ensure that jQuery is added to your website, if you’re trying to recreate our work, add the following to your HTML head:
* <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs="crossorigin="anonymous"></script>
    
    

### How to run our application on a server

* To run our application you will first need to install Node.JS. The place to download it can be found here: https://nodejs.org/en/
* You will also need NPM, which you can install here, in addition to Node.JS: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
* You can also see how changes you make to your code impact the website without having to push those changes by using Live Server for Visual Studio Code. Visual Studio Code is our preferred text editor. Here is the link to further information about Live Server: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer



### How to run any tests you have written for your software

While we do not have formalized tests for our application, we have implemented a thorough series of console logs to track whether the code is retrieving the correct content and performing tasks correctly. These can be accessed through inspecting our page as you run it in your browser. 



### The API's for our application

We use the PlanetTerp API and the UMD.io API. They are as follows:
* PlanetTerp: https://api.planetterp.com/
* UMD.io: https://umd.io/



#### Here is how we use them:

* Concatenated String API with UMD.io to get departments for our dropdown. Example of the concatenation *"https://api.umd.io/v1/courses?dept_id=" + "INST"* to get *"https://api.umd.io/v1/courses?dept_id=INST"* data
* GET: Utilizing Express to get the UMD.io's API call. This gets the department for the dropdown. 
* POST/PUT: They do not apply to our application because our application does not help users to create new or insert items



### Known Bugs

* While we worked diligently to implement the code for our search page, the short development window led our team to make the difficult decision of prioritizing the success of fewer features over the unstable implementation of a wider array of features. As a result, our search page code is not implemented on the site.
* We were not able to create a proper if statement to ensure that the popup on the bookmarks page only appears if there are *no* courses saved to that page yet. While it does not reappear once you close it, it does appear whether there are or are not courses on the page. The position of this box is also contingent on the size of this window. Were there more time we are certain we could correct this formatting and the if statement.
* Our main function is an async that takes two clicks to populate courses on the page. One to initialize. The second click to actually begin showing courses. This is a byproduct of how we wrote the code to get the app to work, but it can lead to the presumption that the app doesn't work if one doesn't proceed to click for a second time.
* If our user decides to click "Heart" or the "X" button before they have populated a course to the home page, the undefined values will be pushed to bookmarks. It also cannot be removed becuase the value is undefined.



### Future Development

* Rectifying all of the current bugs.
* Building out to add in our search page, a syllabi repository, professor information, and even more features beyond these.
* The ability to save courses even if you navigate away from our site entirely.
* Better design choices. Sticking with the UMD color scheme, but with a less aggressive series of hues.

