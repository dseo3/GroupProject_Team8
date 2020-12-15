# Course Connector
 
#### Team Members:  Kennedy Whitehead, Isabeau Rea, Dongyeon Seo, Yomi Omogbehin, Nate Pines, and Aaron Archampong
 
### Application link: https://blooming-temple-21487.herokuapp.com/#
 
## Information Problem:
 
Undergraduate students have a difficult time discovering courses that align with their interest and fulfill their major course requirements.
 
Course Connector strives to address undergraduate students' needs to more easily discover courses within their major. Students spend excess amounts of time trying to find classes that fulfill their major requirements and also pique their interests. This can be particularly difficult on the current platform offered to students, Testudo, which provides the courses by department in one giant list. This can often be an overwhelming and an inefficient process for students who have to comb through long lists of courses in one sitting. 
 
## Stakeholders & Target Browsers:
* Stakeholders of Course Connector include the University of Maryland's Office of Registrar, who provided students with the course catalog every term and undergraduate students of the University of Maryland who are yearning for an easier way to discover courses within their major. 
*	By considering what softwares our target audience is most familiar with, we concluded that it would be best to target our web app to Android Operating Systems and the Google Chrome browser. An article from Forbes.com compiled research by Schoold well by explaining that universities that were more engineering focused tended to have a student population that used Androids more while Liberal Arts schools tended to have a student body that used iPhones more (Anders, 2016). If we assume that those trends carry over to other American universities, Androids will likely be the more popular device among UMD’s student body considering that the majority of students declare STEM majors (datausa.io).
 
 
## Data:
* To populate our web page with content we gather data from two API’s, UMD.io and Planet Terp. We utilized UMD.io’s API to give us access to the list of departments at UMD which was used for our users to set their preferences. Additionally, UMD.io gave us access to course data, allowing us to populate data about each course's credits, gen_eds and description. Lastly, we utilized Planet Terp’s API to give us access to data regarding the average grade students received in a presented course. We believed the data was vital to present to our users, since it would give them an idea of the level of difficulty of a course based on the success or failures of students who previously enrolled in that class. 
 
## Strategies & Solutions:
Create a tinder esque course recommendations page that randomly recommended courses one at a time within your selected major and allows you to save them for later. Attempting to make the course registration process more fun and interactive.
Use Figma in order to create a wireframe of how we wanted each page to look on both desktop and mobile views
* Our team decided to use Bulma in order to improve the structure and layout of our application
* Divide work into pairs and tackle different pages -> 
In order to successfully develop our project we decided to divide into pairs and work on different pages. Before proceeding with the coding the pages we built wireframes for each page. We created a wireframe in order to organize the structure and layout of our pages. This allowed us to imagine our design in both mobile and desktop views before coding out our final web application.
 
In order to solve our information problem we decided to create a course recommendations site that randomly recommends courses for students. The recommendations are provided one at a time and based on the students selected major. This allows students to avoid information overload and save time during their search. Furthermore they can save the recommendations in case reference is needed later on when completing their course schedule. The aim with these implementations is to make class registration a less tedious process and perhaps a more fun or interactive process.
 
 
## Technical Rationale: 
 
* Used bulma to style 
* Used Font Awesome to build icon elements 
* Used jQuery to dynamically add elements to the page easily 
* Built pages in separate files and then merged them together to divide work and help with efficiency.
 
 
## Addressing the Problem: 
Our application addresses the needs of both graduates and undergraduates. Students can search for courses they are interested in by the department that offers them. Our application avoids information overload and allows students to filter through classes with a central focus on their major.
 
 
## Challenges:
* The UMD.io API caused some issues when it came to retrieving data. This caused us to divert from the original plan and narrow the scope of our design. The API is paginated, which means that the full corpus of data is broken up into sections. This initially appeared like it would be unfixable, but we discovered that by specifying the department, we could retrieve information for each department at the university as it grouped the pages by department. We used string formatting to concatenate the beginning API endpoint URL with a specific department course code (e.g. INST, ENGR, AMST) to retrieve all of the courses for that department. Both graduate and undergraduate, in the cases where a department offers graduate courses.
* Could not include all the desired features due to API limitations.
* Throughout the project it became clear that our initial scope may have been too large. With our level of experience, many of the features we wanted to implement required us to learn by trial and error, which led to a final product that was not what we had in mind from the start. If we had taken the time to think through the execution of creating our application at the beginning of the project, we may have been able to foresee some of the problems that arose towards the end of the project.
* Each teammate had a different approach to coding our applications particularly with JavaScript. Having different approaches/styles of solving the problem may have contributed to having a more complex code than necessary. Different coding styles made it difficult to marry code together.
* Expanding on the last point, these different approaches also contributed to decreased efficiency in completing group work. While completing this project, we had a few members working on each page, where we should have given these members a specific aspect of the project to work on (such as HTML vs. Javascript). This would have made merging each piece of the project together easier.
* Some team members were better versed in Javascript than others, which made collaborating harder when trying to explain what a person’s code was doing.
* During the course of this project many of our schedules did not line up due to other commitments, making it harder for things to be completed in a timely manner. This also led to more of the workload being shifted onto those members with more time, who had to learn and solve problems without the benefit of collaboration.
 
 
## Future Direction:
* Improve application layout/structure
* Use a better API source
* Include Browsing and search page 
* Adding Interest Based Preferences
* Adding options for student who have multiples majors or minors 
