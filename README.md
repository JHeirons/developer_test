# developer_test

Assumtions:

Returned value for the Manhattan distance absolute so no way of telling whether the distance is a positive or negative vector.

Multiple events at same loaction?

Query the seed data and check whether the X,Y coordinates of the two objects are the same. 
Create an array of objects for each set of coordiantes with multiple events.  
When running the program it could return the distance and state whether multiple events are at the same location.

Changes if working with a larger world size?

In the confines of the current program it would be possible to scale up the world size and the rest of the program would follow. 
The number of events generated is static but it would be possible to generate events based on a percentage of the array size that holds all the coordinate variations.
For performance it would be worth writing the event data to a hosted JSON file to be searchable. Limit the search radius of the user based on the location so that it only looks for and returns events in a subsection of the world.     
