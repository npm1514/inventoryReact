<img src="http://montanacodeschool.com/wp-content/uploads/2016/08/MCS_LOGO_v1-1.png" width="200" align="right"/>

##Inventory App

##Purpose
The purpose of this day project is to introduce students to creating Full Stack applications using React by creating an inventory application.

##Directions

###Setup

* Fork and clone this repository. Complete all of the following steps. When you have finished, push your code into GitHub.

* Create the files necessary to build your React app. Be sure to include your server files as well. Remember to call in all of the CDN's for each of the following libraries (React, React-DOM, Babel-Browser, React-Router, and jQuery).

* Call in your JavaScript files in script tags. Include an empty div within your body with an ID.

* In your app.js file, go ahead and create a Component for the Page Itself and for the Inventory List. You may also want to create a component for adding and removing parts from inventory as well as adding and removing part numbers from your inventory list.

###Get the Data

* The first thing we should do is setup our API GET request and the necessary functions needed to pull your entire list of inventory.

* You will need to create a method called 'componentDidMount'. This method will run once as soon as the page loads. Inside the method call another method where we will run the API request.

* Go ahead and create that new method. In the function description, you will need to set up an AJAX GET request. Use the corresponding url that you have set up on your server. On success, we need to set the value of a component state variable to the array that is received in the API request. Before we can do that, we need to set an initial state.

* Create the method 'getInitialState'. This will set the initial state of any component variables. Inside the function description, just have it return an object with data as a key and an empty array as it's value.

* Now that we have a variable set, we can set the value equal to the response on a successful API request. Using the following syntax, set the state of the variable 'data' to be equal to the results key of the response object. ``this.setState({data: response.results});`` After this is set, log the value of this.state.data to verify that you are getting appropriate data. If you are, let's keep going. If you are not, make the adjustments necessary to get an appropriate value.

###Display the Data

* Now that we have the data, let's display the data. In order to pass on the data into the list component, we will have to set it as a property variable. In the List tag in the render method, set the variable data equal to the state variable that we just set up.

* In the same way as we mapped data in the past, we will do so again. Inside the List component render method, set a variable equal to ``this.props.data.map(function(item){})``. Inside the map function return a new component tag called 'Item'. Inside that component tag set any new variables you would like to use when defining the Item component.

* Finish off the List component by returning the variable that you set equal to the map function.

* The last thing that needs to be completed is to set up the Item component. Create a new component named 'Item' and render the JSX that you would like to display for each item. If you want to use any of the set variables, use the following syntax ``{this.props.varname}``. When you are done, run live-server to verify that everything is displaying accordingly. Before setting up any of your CRUD functions, you will have to populate this list using Postman.

###Creating the Data

* In order to create a new item, you will have to set up the inputs and an event listener. If you created an add remove component, let's set these up there. You will want to create input tags for each property of your item. You can use things like part number, description, quantity, unit of issue, cost per Unit, and so on. Inside each input tag, you will want to set it up so that if someone types in the box, it recognizes it. So go ahead and add the event listener onChange and set it equal to a new method. For example, if you have a part number input tag, inside of it, you will have a property ``onChange={this.handlePartNumberChange}``.

* Inside the handlePartNumberChange method, you will need to set the state of the part number value. This means you will also have to set up a getInitialState method. If you have set this up correctly, it should look something like this. Make sure you do this for each input value that you have in your form.

```
handlePartNumberChange: function(e) {
  this.setState({newPartNumber: e.target.value});
},
getInitialState: function(){
  return {
    newPartNumber: ""
  };
}
```

* Next, you will need a submit button and a submit method. Once the user fills out your new part number form, you will want to use the updated values to create a new part number. Set up a button or a submit input tag. Inside the form or button create a onSubmit or a onClick property that prompts the associated method to be called. Inside the method, you will want to invoke a method that runs another API request, a POST method this time. Make sure your data matches your server side model. If you have time, create a redirect that changes view to your inventory list.

###Updating The Data

* In the same manner as the post, in which you have to set up an event listener, you will want to set up the same type of event listener when you are updating things. The only major difference is when you go to do your API request, it will need to be a PUT method with the ID and data.

* When doing a delete, you will need to collect the id only and run the DELETE method.

* If you have done everything correctly, you should be able to GET all of the inventory data, POST new inventory items, PUT changes to specific items, and DELETE specific items. Also, it wouldn't be a very good inventory app, if you couldn't easily change the quantity values.

###Final Touches

* If your app seems functional enough, go ahead and add some styles. If you have further time, set it up so that you can see a history of each inventory transaction or make it update your list in real time.

##Copyright

(c) Montana Code School, 2016.
