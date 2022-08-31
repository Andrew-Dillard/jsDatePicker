// Lesson 73 - Date Picker

// We will be building a fully functional date picker given some starting HTML and CSS using a library called  date-fns

// Specifications:
// Upon entering, the user only sees a button with the current date. When the user clicks the button, a calendar beneath the button appears highlighting the current date. 

// When the user uses the calendar to select a different date, the calendar disappears and the button's date changes to the user's selection. 

// When the user selects the button again, the calendar appears once again, this time highlighting the most recent user selection. 

// The user has left and right month buttons at the top corners of the calendar to change the month

// The Month and Year will be displayed at the top center of the calendar and will change as needed as the user interacts with the month buttons. 

const container = document.querySelector('.date-picker-container')
const dateButton = container.querySelector('.date-picker-button');
const calendar = container.querySelector('.date-picker')
const grid = calendar.querySelector('.date-picker-grid-dates')
const dates = grid.querySelectorAll('.date')
const monthYearHeader = calendar.querySelector('.current-month')

// Task 1 - Complete 
// Allow the user to toggle the visibility of the calendar with the button
dateButton.addEventListener('click', () => {
  calendar.classList.toggle('show')
})

// Task 2 - Complete
// Make the calendar hidden upon page load (done in the HTML by removing show class to begin with)

// Task 3 - Complete
// Change the blue highlight styling to the new date the user picks and remove the styling from the previously selected date

// Add a click event listener to the grid of dates
grid.addEventListener('click', (event) => {
  console.log('clicked on grid')
  // Grab the button the user selected..
  const selectedDate = event.target
  // ..and toggle the 'selected' class to add blue highlighting
  selectedDate.classList.toggle('selected')
  // Then loop through all the other buttons and remove the class of 'selected'
  dates.forEach((date) => {
    // Don't remove the styling we just set for the newly selected date! 
    if (date === selectedDate) return
    date.classList.remove('selected')
  })
})


// Right now, October 26th, 2020 is hard-coded into the HTML date <button>
// We will use JavaScript to change the textContent of that button and update it when the user picks a new date. 

// While we could use the current October 2020 hard-coded values in the date buttons to update the calendar date button, that would limit the program to one month which is not ideal. We also have to figure out how to format and display the date which is no easy task in JavaScript.

// Recall one of our specifications is to allow the user to change months with left and right buttons. Doing so will change the textContent of the individual buttons themselves. 

// Therefore, we will utilize the  date-fns  library to populate the calendar with the correct values when the user presses the month buttons. We will also use it to format the updated date in the calendar date button.



// Task 4 - Complete
// Display the current date upon page load in the calendar date button

// Import some useful modules from the date-fns library
// This Node module syntax is possible with Parcel
import { getDefaultOptions, format, startOfWeek, endOfWeek, startOfMonth, getDaysInMonth, lastDayOfMonth, getWeeksInMonth, eachDayOfInterval } from 'date-fns'

// Use the imported library to format the current day and store it
const formattedDate = format(new Date(), 'MMMM do, yyyy') // August 29th, 2022

// Assign the current date in the proper format to our calendar date button
dateButton.textContent = formattedDate;


// Task 5 - Complete
// Display the correct month and year in the header

// Create a date format for our calendar header..
const currentMonthYear = format(new Date(), "MMMM - yyyy")

// ..and assign it to the header
monthYearHeader.textContent = currentMonthYear


// Task 6 - Use the current month and year to update the calendar with the correct dates

// Task 7 - Allow the user to toggle the month with left and right month buttons

// Task 8 - Make sure the calendar date button updates with the new date when the user picks a different date. 

/// CURRENT WORKSPACE ///


// console.log(currentDate)
const today = new Date();
const currentYear = today.getFullYear() 
const currentMonth = today.getMonth() 
const currentDayOfMonth = today.getDate() 
const currentDayOfWeek = today.getDay()

const numberOfDaysInCurrentMonth = getDaysInMonth(today)

const firstDayOfFirstWeek = startOfWeek(new Date(currentYear, currentMonth))
console.dir(firstDayOfFirstWeek)

const lastDayOfLastWeek = endOfWeek(new Date(currentYear, currentMonth, numberOfDaysInCurrentMonth))
console.dir(lastDayOfLastWeek)

allDays = eachDayOfInterval({
  start: firstDayOfFirstWeek,
  end: lastDayOfLastWeek
})
console.dir(allDays)

// Creates an array of all the days of August of the form:
// Mon Aug 01 2022 00:00:00 GMT-0500 (Central Daylight Time)
// const allAugustDays = eachDayOfInterval({
  //   start: new Date(2022, 7, 1),
  //   end: new Date(2022, 7, 31)
  // })
  // console.dir(allAugustDays)
  
  // const firstDayOfAugust = allAugustDays[0]
  // console.dir(firstDayOfAugust)
  // console.dir(firstDayOfAugust.getDay())
  
  // const weeksInCurrentMonth = getWeeksInMonth(today)
  // const currentDate = new Date(currentYear, currentMonth, currentDayOfMonth);
  
  


