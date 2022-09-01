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
const datesRowSix = grid.querySelectorAll('.rowSix')
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


// Task 6 - Complete
// Use the current month and year to update the calendar with the correct dates

// Get the current day by creating a new instance of the Date class
const today = new Date();
// Store the current year, month and last day of the current month
const currentYear = today.getFullYear() 
const currentMonth = today.getMonth()
const currentDay = today.getDate()
const numberOfDaysInCurrentMonth = getDaysInMonth(today)
// Using these three pieces, find and store the first and last day in the grid
const firstDayOfFirstWeek = startOfWeek(new Date(currentYear, currentMonth))
const lastDayOfLastWeek = endOfWeek(new Date(currentYear, currentMonth, numberOfDaysInCurrentMonth))
// Using these beginning and ending dates, create an array of all the days (Date objects) in the current month's calendar grid (35 or 42 items depending on if the month spans 6 weeks)
allDays = eachDayOfInterval({
  start: firstDayOfFirstWeek,
  end: lastDayOfLastWeek
})
// Extract and store the literal date numbers from the 35 or 42 days in the month grid
const allDaysNumbers = []
allDays.forEach((day) => {
  // Get the date from the current day and add it to the array
  allDaysNumbers.push(day.getDate())
})
// Before applying dates, hide the sixth row if its not needed
const weeksInCurrentMonth = getWeeksInMonth(today)
if (weeksInCurrentMonth < 6) {
  datesRowSix.forEach((day) => {
    day.classList.add('hide')
  })
}

// Apply the correct dates to the calendar buttons
for (i = 0; i < allDaysNumbers.length; i++) {
  dates[i].textContent = allDaysNumbers[i]
}


// Task 7 - Complete
// Add grayed out styling to dates that are not part of the current month

// Create an array of booleans indicating each day's membership in current month or not
const areDaysPartOfMonth = []
allDays.forEach((day) => {
  if (day.getMonth() === currentMonth) {
    areDaysPartOfMonth.push(true)
  } else  {
    areDaysPartOfMonth.push(false)
  }
})
// console.dir(areDaysPartOfMonth)

// Loop through our booleans, changing styling for dates not in the current month
for (i = 0; i < areDaysPartOfMonth.length; i++) {
  // For true values,  continue  means start the loop again on the next item
  if (areDaysPartOfMonth[i] === true) continue
  dates[i].classList.add('date-picker-other-month-date')
}


// Task 8 - Complete
// The current date should start off with the selected blue styling

// loop through all of our days looking for the current date, and give it the blue selected style
for (i = 0; i < allDays.length; i++) {
  if (
    allDays[i].getDate() === currentDay &&
    allDays[i].getMonth() === currentMonth
  ) {
    dates[i].classList.add('selected')
  }
}
  

// Task 9 - Make sure the calendar date button updates with the new date when the user picks a different date. 

/// CURRENT WORKSPACE ///







// Task 10 - Allow the user to toggle the month with left and right month buttons
