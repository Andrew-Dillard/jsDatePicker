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
    if (date !== selectedDate) {
      date.classList.remove('selected')
    }
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
import { getDefaultOptions, format, startOfWeek, startOfMonth } from 'date-fns'

const formattedDate = format(new Date(), 'MMMM do, yyyy') // August 29th, 2022
console.log(formattedDate)

// Assign the current date in the proper format to our calendar date button
dateButton.textContent = formattedDate;

// Task 5 - Complete
// Display the correct month and year in the header
const currentMonthYear = format(new Date(), "MMMM - yyyy")

monthYearHeader.textContent = currentMonthYear



// Built-in JS functions
const currentDate = new Date();
// console.log(currentDate) // Mon Aug 29 2022 13:50:13 GMT-0500 (Central Daylight Time)
const currentYearValue = currentDate.getFullYear() // 2022
const currentMonthValue = currentDate.getMonth() // 7
const currentDayOfWeekValue = currentDate.getDay() // 1 (Monday)
const currentDayOfMonthValue = currentDate.getDate() // 29

const firstDayOfCurrentMonth = startOfMonth(new Date())
// console.log(firstDayOfCurrentMonth) // Mon Aug 01 2022 00:00:00 GMT-0500 (Central Daylight Time)

const firstDayOfCurrentWeek = startOfWeek(new Date())
// console.log(firstDayOfCurrentWeek) // Sun Aug 28 2022 00:00:00 GMT-0500 (Central Daylight Time)