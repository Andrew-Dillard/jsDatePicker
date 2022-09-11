// Lesson 73 - Date Picker

// We will be building a fully functional date picker given some starting HTML and CSS using a library called  date-fns

// STEP1
// Import necessary modules from the date-fns library
// NOTE: This Node module syntax is possible with Parcel
import { getDefaultOptions, format, startOfWeek, endOfWeek, startOfMonth, getDaysInMonth, lastDayOfMonth, getWeeksInMonth, eachDayOfInterval } from 'date-fns'


// STEP2
// Declare and define variables to hold the HTML elements that will be modified
const container = document.querySelector('.date-picker-container')
const dateButton = container.querySelector('.date-picker-button');
const calendar = container.querySelector('.date-picker')
const grid = calendar.querySelector('.date-picker-grid-dates')
const dates = grid.querySelectorAll('.date')
const datesRowSix = grid.querySelectorAll('.rowSix')
const monthYearHeader = calendar.querySelector('.current-month')
const previousMonthButton = calendar.querySelector('.prev-month-button')
const nextMonthButton = calendar.querySelector('.next-month-button')


// STEP3
// Use The current date to declare and define variables to hold the current year, month, day, and number of days in the current month.

// Get the current day by creating a new instance of the Date class
const today = new Date();
let currentYear = today.getFullYear() 
let currentMonth = today.getMonth()
let currentDay = today.getDate()
let numberOfDaysInCurrentMonth = getDaysInMonth(today)


// STEP4
// Display the current date in the proper format to our calendar date button
const formattedDate = format(new Date(currentYear, currentMonth, currentDay), 'MMMM do, yyyy') // August 29th, 2022
dateButton.textContent = formattedDate;


// Allow the user to toggle the month with left and right month buttons

// BUG: Clicking in the gap between dates deselects the selected date

// FUNCTIONS

// When the user clicks the calendar button, look to the date in that button to render the calendar first 
// The other time this function runs is when the user clicks a change month button


// let currentMonthYear = format(new Date(currentYear, currentMonth), "MMMM - yyyy")
// let firstDayOfFirstWeek = startOfWeek(new Date(currentYear, currentMonth))
// let lastDayOfLastWeek = endOfWeek(new Date(currentYear, currentMonth, numberOfDaysInCurrentMonth))
let allDays = []
let allDaysNumbers = []
let weeksInCurrentMonth = getWeeksInMonth(new Date(currentYear, currentMonth, currentDay))
let areDaysPartOfMonth = []



function renderCalendar(currentYear, currentMonth, currentDay, numberOfDaysInCurrentMonth) {

  console.log('renderCalendar() has started running')

  // Begin each function call with fresh empty arrays
  allDaysNumbers = []
  allDays = []

  // Display the correctly formatted month and year in the header
  let currentMonthYear = format(new Date(currentYear, currentMonth), "MMMM - yyyy")
  monthYearHeader.textContent = currentMonthYear


  console.log(`numberOfDaysInCurrentMonth: ${numberOfDaysInCurrentMonth}`)

  // Locate first and last day in the grid
  let firstDayOfFirstWeek = startOfWeek(new Date(currentYear, currentMonth))
  let lastDayOfLastWeek = endOfWeek(new Date(currentYear, currentMonth, numberOfDaysInCurrentMonth))

  // Create an array of all the days (Date objects) in the current month's calendar grid (35 or 42 items depending on if the month spans 6 weeks) using these beginning and ending dates.
  allDays = eachDayOfInterval({
    start: firstDayOfFirstWeek,
    end: lastDayOfLastWeek
  })

  
  // Extract and store the literal date numbers from the 35 or 42 days in the month grid
  allDays.forEach((day) => {
    allDaysNumbers.push(day.getDate())
  })
  
  console.log(allDaysNumbers)
  

  // Apply the correct dates to the calendar buttons
  for (i = 0; i < allDaysNumbers.length; i++) {
    dates[i].textContent = allDaysNumbers[i]
  }

  // Add grayed out styling to dates that are not part of the current month

  // Create an array of booleans indicating each day's membership in current month or not

  // Begin with a fresh empty array
  areDaysPartOfMonth = []
  allDays.forEach((day) => {
    if (day.getMonth() === currentMonth) {
      areDaysPartOfMonth.push(true)
    } else  {
      areDaysPartOfMonth.push(false)
    }
  })

  // First, clear any old gray styling
  removeGrayedOutStyling()

  // Loop through our booleans, changing styling for dates not in the current month
  for (i = 0; i < areDaysPartOfMonth.length; i++) {
    // For true values,  continue  means start the loop again on the next item
    if (areDaysPartOfMonth[i] === true) continue
    dates[i].classList.add('date-picker-other-month-date')
  }

  // Blue highlight the current date

  // Begin by clearing any previously selected dates
  removeSelectedStyling()

  // Loop through all of our days looking for the current date, and give it the blue selected style
  for (i = 0; i < allDays.length; i++) {
    if (
      allDays[i].getDate() === currentDay &&
      allDays[i].getMonth() === currentMonth &&
      allDays[i].getFullYear() === currentYear
    ) {
      dates[i].classList.add('selected')
    }
  }

   // Before applying dates, hide the sixth row if its not needed
  // Remove any previous applications of hide class first
  removeHideClass()
  console.log(weeksInCurrentMonth)
  if (weeksInCurrentMonth !== 6) {
    console.log(true)
    datesRowSix.forEach((day) => {
      day.classList.add('hide')
    })
  }

  console.log('renderCalendar() is done running')
}


// Event listeners


// Month selector handlers

previousMonthButton.addEventListener('click', () => {
  // renderCalendar()
})

nextMonthButton.addEventListener('click', () => {
  // renderCalendar()
})



// When the user clicks the calendar button, 
// 1. Toggle the visibility of the calendar
// 2. Display correct month/year header
// 3. Display correct date numbers
// 4. Gray out days not in the current month
// 5. Blue highlight the current date




// HANDLER1
// Allow the user to toggle the visibility of the calendar with the button
// If the calendar is not visible, then run  renderCalendar()
dateButton.addEventListener('click', () => {
  if (!calendar.classList.contains('show')) {
    renderCalendar(currentYear, currentMonth, currentDay, numberOfDaysInCurrentMonth)
    
  }
  calendar.classList.toggle('show')
})

// HANDLER2
// Cause calendar to disappear when the user picks a date
// dates.forEach((date) => {
//   date.addEventListener('click', () => {
//     calendar.classList.toggle('show')
//   })
// })

// HANDLER3
// Change the blue highlight styling to the new date the user picks and remove the styling from the previously selected date
// Add a click event listener to the grid of dates
grid.addEventListener('click', (event) => {

  // Begin with no blue highlighting?


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


// HANDLER4
// Make sure the calendar date button updates with the new date when the user picks a different date. 
// When the user selects a date on the calendar..
grid.addEventListener('click', () => {
  // ..loop through our date buttons..
  for (i = 0; i < dates.length; i++) {
    // ..find the index of the button with the class of 'selected'..
    if (dates[i].classList.contains('selected')) {
      // and use that index to access the associated Date object, extracting its year, month, and date
      let year = allDays[i].getFullYear()
      let month = allDays[i].getMonth()
      let day = allDays[i].getDate()

      // Update variables
      currentYear = year
      currentMonth = month
      currentDay = day
      numberOfDaysInCurrentMonth = getDaysInMonth(new Date(currentYear, currentMonth, currentDay))
      weeksInCurrentMonth = getWeeksInMonth(new Date(currentYear, currentMonth, currentDay))



      // Use these three pieces to format the date..
      let formattedDate = format(new Date(year, month, day), 'MMMM do, yyyy')
      // ..and update the calendar button
      dateButton.textContent = formattedDate;
    }
  }
})


function hideCalendar() {
  calendar.classList.remove('show')
}

function removeSelectedStyling() {
  dates.forEach((date) => {
    date.classList.remove('selected')
  })
}

function removeGrayedOutStyling() {
  dates.forEach((date) => {
    date.classList.remove('date-picker-other-month-date')
  })
}

function removeHideClass() {
  datesRowSix.forEach((day) => {
    day.classList.remove('hide')
  })
}