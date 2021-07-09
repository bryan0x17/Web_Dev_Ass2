README for SAIT Web Development (CPRG256) Homework Assignment 2.

A landscaping company builds custom planters from clients. Create a customized page with appropriate background colours or images. Include a header that lists the company name and contact information. Your page will contain a form that prompts the user for the following:

Customer Name (This can be one input to include the full name or separate inputs for first and last name)
Address
Postal Code
Phone number
E-mail

Control the user input as follows:

Use HTML 5 inputs
All the fields must be entered
Validate the data (except address) using patterns or regular expressions. 
‘Autofocus’ must be set to the Customer Name


The planters are in the following shapes:

	Square/Rectangular Cubes
	Flat bottomed cylinders
	½ Spherical
	Truncated cone

The volume formulas for each of these shapes are:

Square/Rectangular Cubes 	V= length*width*height

Flat bottomed cylinders		 V= π*radius*radius*height

½ Spherical			V=1/2 * (4/3*π*radius*radius*radius)

Truncated cone			V=1/3*π*(radius1*radius1+radius1*radius2+radius2*radius2)*height

The dimensions entered will be in cm and the volume in cm3. The costs for each type of planter are as follows:

Square/Rectangular Cubes: 	.001 cents per cm3

Flat bottomed cylinders: 		.0012 cents per cm3

½ Spherical: 				.0015 cents per cm3

Truncated cone: 	 		.002 cents per cm3

Example:
 A rectangular planter with dimensions 30 x 40 x 20 = 24 000cm3 volume
Cost: 24 000 x .001 = $24.00

Requirements:

Your application must use AJAX to control the data entry for the planter type. 

You will need to create for separate HTML page for each of the individual plantar types. Each page will contain a form that will list the appropriate dimensions required for that type of plantar. 

Example: If the user selects a square/rectangular planter, a form will appear showing input fields for length, width and height. The application will calculate the volume and cost and display all of the information on the page:

Customer Name
Address
Postal Code

Type of Planter
Dimensions and Volume
Total cost

Your pages must use CSS to create an interesting, well formatted and pleasing interface.
