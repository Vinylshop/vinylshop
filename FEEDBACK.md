# REVIEW

## Feature completeness

* Great spread of features - I'm really impressed! Great job to work in `stripe` as well!

## Code quality and general best practices in front-end and back-end

* Good consistency and quality overall. Make sure that you trim away un-needed code and comments - they can clutter things up and make it harder to figure out what's going on down the line

## Project management and effective use of Git

* As we learned near the end, it's important to deploy frequently! In the real world, this allows us to get new features out to our clients as quickly as possible (so that we can start generating feedback about those features). For our purposes, it will help us identify and address problems in our deployment pipeline early on and in closer proximity to the introduction of the problem

## Quality of unit tests

* There's still a ways to go with the tests, as we discussed before. Remember that you should only the code you write: testing that an instance of a Sequelize model has the appropriate key-value pairs after creation isn't testing your code - it's testing Sequelize's code. An ideal test of a function allows us to treat that function like a black box: for some input, we get some output. Once we can make assertions about that behavior, we can change the implementation of that function, and still confirm that it works the same way using that test.
* I would have liked to have seen a few front-end tests as well: be sure to review the discussion we had on this last week: https://youtu.be/xaL6TqIeeg0

## Schema design

* Great job to use `scope` :)
* For Product categories, you stored them as a string and then hardcoded the options on the front-end. This wouldn't be very extensible. The ideal solution in this case would be to make a `belongsToMany` relationship between Products and a Category table (joined by a ProductCategory join table).

## RESTfulness of routes

* Well done to use the `router.param` convention to handle route params. However, make sure that clients can only make changes to items that they're allowed to (see "Security" below)!

## DRY / Separation of concerns

* Well done with the `ImageWithStatusText` component - write more components like this!

## Security

* It looks like you wrote the functions to check if someone is logged in or is an admin, but only implemented them in a few places! This means that strangers are still able to get more information than they should from your server. Be sure to review the talk that we had last Wednsday: https://youtu.be/1wIfeqgiHss

## Design/UI/Usability

* Great design! I love the sleek, modern look!
* Consider adding some feedback when adding an item to the cart, or navigating the user to a new view.
