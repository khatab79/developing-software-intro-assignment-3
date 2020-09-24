# Focus College ACSD Assignment 3

This respository is intended for the use of Focus College Students enrolled in the 
Advanced Certificate of Software Development located in Kelowna, BC and Surrey, BC.

---

# Gerald's Contracting Application

![Gerald_Img]

# Summary

---



## Running the Application
**_Do not use ~~node dist/index.js~~_**

To **build** the application
```
tsc
```
To **run** the application using node
```
node dist/index.js calc-wood-needed --width 8 --length 8 --inches
```
To **build & run** the application using npm
```
npm start -- calc-wood-needed --width 8 --length 8 --inches
```
you can chose feet or inches

*_By default the calculation in feet_*

---



## Scenario

Gerald is enjoying the application we've written for him, but he's running into a few issues:

He can't see the results of prior houses without knowing the dimensions

He can only calculate houses that have exact feet in length (i.e. He can calculate an 8 foot x 8 foot house, but not an 8 foot 3 inch x 8 foot 3 inch house).

To tackle these requirements, a Sr. Developer (Steve) and Product Manager (Rosa) have been brought onto the project, and you will be assisting the them. This repo has code changes from the Sr. Developer and user stories from the Product Manager on how to use his new features, plus his list of tasks for you to do.

Read the letter from the Rosa to the development team

Read the letter from Steve to you

## Letter from Rosa

Hello development team!

We've talked with Gerald and identified the user stories required to complete his software needs. They are attached!

Thanks,

Rosa,

Product Manager



## Geralds Contracting Application (Assignment 3)

**_As Gerald, I need to enter inches into the required measurements on the command line._**

1. The current application assumes --width 8 and --length 8 are feet, but Gerald would like to be able to set the units. In discussion, we came up with severald ideas that would accomplish the goal:

2. Allowing --width 8ft 3in as an entry
Allowing --width 8'3" as an entry
Adding a flag to determine the units (i.e. --width 99 --units inches)
Only one method is required, but decimal values are NOT acceptable. (Gerald doesn't want 8.3 to be confused with 8'3").

**_As Gerald, I need to be able to recall prior house builds without knowing their dimensions_**

The current application requires that I put in a width and length to make a calculation. Gerald would like to be able to assign set of parameters to a customer by name, and then recall the results by that same name.

**_As Gerald, I need the application to seperate between studs and plates_**

Currently, we return the total number of studs required for the building. Gerald need to know the different between the top/bottom boards (called "plates") and the vertical boards (called "studs"). We also need to calculate two rows of top plates. The bottom plates will still only have one row.

**_As Gerald, I need "beams" to be called "posts"._**
We call the extra 4x4's "beams", and they need to be called "posts".

## Letter from Steve
Hello Jr. Developer.

I've read the letter from the Product Manager. I've started a repository with the old application, a couple new libraries to help us accomplish this assignment, and I refactored how we include the commands, in anticiptation of at least on more. There's a readme in the src/house folder to help you understand the new tools.

I need you to create a new epic for this upgrade on the project board, and create the user stories Rosa provided in that epic. Once you've created the stories, add sub-tasks that identify how we're going to accomplish the stories.

After creating your tasks, complete them.

A few additional notes for you:

* Make sure that you update the root readme.md with instructions on how to run the new program.

* Don't change any code in the src/house folder. I haven't finished the tests for it yet and I don't want unexpected outcomes

* Remember to keep your board up to date as you work on the application!

* I've seperated the old calculation into the src/commands folder. Please follow suit if you add any more commands.

Thanks,

Steve,

Sr. Developer

---
## Test log 

| House Measurement | Studs Required | Aplication Returns |   Last Test Run by   |
| ----------------- | -------------- | ------------------ | -------------------- |
|       -       |       -      |       -          | **Khatab AL DAGHISTANI** |
|      -      |       -      |       -          | **Khatab AL DAGHISTANI** |

---

### Note to Other developers

I used the [yargs package] for the processing of command line paramters. For more information on that package go to the [yargs package] website.

[yargs package]: https://www.npmjs.com/package/yargs

[Gerald_Img]: https://www.safetyandhealthmagazine.com/ext/resources/images/2016/04-april/construction-safety.jpg?1458739490