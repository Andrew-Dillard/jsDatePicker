// Date Picker
// Fully functional calendar date picker given some starting HTML and CSS using a library called  date-fns

/// BUGS: 

// BUG #1: When scrolling back to the month that has the selected date, the blue styling needs to return

// BUG #2: Blue styling is lost when clicking between dates though the date remains in the calendar button


// Import necessary modules from the date-fns library
// NOTE: This Node module syntax is possible with Parcel
import { format, startOfWeek, endOfWeek, getDaysInMonth, getWeeksInMonth, eachDayOfInterval } from 'date-fns'

// Declare and define variables to hold the appropriate HTML elements
const container = document.querySelector('.date-picker-container')
const dateButton = container.querySelector('.date-picker-button');
const calendar = container.querySelector('.date-picker')
const grid = calendar.querySelector('.date-picker-grid-dates')
const dates = grid.querySelectorAll('.date')
const datesRowSix = grid.querySelectorAll('.rowSix')
const monthYearHeader = calendar.querySelector('.current-month')
const previousMonthButton = calendar.querySelector('.prev-month-button')
const nextMonthButton = calendar.querySelector('.next-month-button')

// Use The current date to declare and define variables to hold the current year, month, day, and number of days in the current month. The values of these will change as the user changes the date
const today = new Date();
let currentYear = today.getFullYear() 
let currentMonth = today.getMonth()
let currentDay = today.getDate()
let numberOfDaysInCurrentMonth = getDaysInMonth(today)

// Display the current date in the proper format to the calendar date button
const formattedDate = format(new Date(currentYear, currentMonth, currentDay), 'MMMM do, yyyy')
dateButton.textContent = formattedDate;


let allDays = []
let allDaysNumbers = []
let weeksInCurrentMonth = getWeeksInMonth(new Date(currentYear, currentMonth, currentDay))
let areDaysPartOfMonth = []


// FUNCTIONS //


function renderCalendar(currentYear, currentMonth, currentDay, numberOfDaysInCurrentMonth) {

  // Update number of days in current month
  numberOfDaysInCurrentMonth = getDaysInMonth(new Date(currentYear, currentMonth, currentDay))


  // Update number of weeks in the month
  weeksInCurrentMonth = getWeeksInMonth(new Date(currentYear, currentMonth, currentDay))

  // Before applying dates, hide the sixth row if its not needed
  // Remove any previous applications of hide class first
  removeHideClass()

  if (weeksInCurrentMonth !== 6) {
    datesRowSix.forEach((day) => {
      day.classList.add('hide')
    })
  }

  // Begin each function call with fresh empty arrays
  allDaysNumbers = []
  allDays = []

  // Display the correctly formatted month and year in the header
  let currentMonthYear = format(new Date(currentYear, currentMonth), "MMMM - yyyy")
  monthYearHeader.textContent = currentMonthYear

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

  // Loop through the booleans, changing styling for dates not in the current month
  for (i = 0; i < areDaysPartOfMonth.length; i++) {
    // For true values,  continue  means start the loop again on the next item
    if (areDaysPartOfMonth[i] === true) continue
    dates[i].classList.add('date-picker-other-month-date')
  }

  // Blue highlight the current date

  // Begin by clearing any previously selected dates
  removeSelectedStyling()

  // Loop through all of the days looking for the current date, and give it the blue selected style
  for (i = 0; i < allDays.length; i++) {
    if (
      allDays[i].getDate() === currentDay &&
      allDays[i].getMonth() === currentMonth &&
      allDays[i].getFullYear() === currentYear
    ) {
      dates[i].classList.add('selected')
    }
  }
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


// EVENT LISTENERS //


previousMonthButton.addEventListener('click', () => {
  if (currentMonth === 0) {
    currentMonth = 11
    currentYear = currentYear - 1
  } else {
    currentMonth = currentMonth - 1
    // Set the currentDay to a safe middle of the month date 
    currentDay = 15
  }
  weeksInCurrentMonth = getWeeksInMonth(new Date(currentYear, currentMonth, currentDay))
  renderCalendar(currentYear, currentMonth, currentDay, numberOfDaysInCurrentMonth)
  removeSelectedStyling()
})

nextMonthButton.addEventListener('click', () => {
  if (currentMonth === 11) {
    currentMonth = 0
    currentYear = currentYear + 1
  } else {
    currentMonth = currentMonth + 1
    currentDay = 15
  }
  weeksInCurrentMonth = getWeeksInMonth(new Date(currentYear, currentMonth, currentDay))
  renderCalendar(currentYear, currentMonth, currentDay, numberOfDaysInCurrentMonth)
  removeSelectedStyling()
})

// Allow the user to toggle the visibility of the calendar with the button
// If the calendar is not visible, then run  renderCalendar()
dateButton.addEventListener('click', () => {
  if (!calendar.classList.contains('show')) {
    renderCalendar(currentYear, currentMonth, currentDay, numberOfDaysInCurrentMonth)
    
  }
  calendar.classList.toggle('show')
})

// Cause calendar to disappear when the user picks a date
dates.forEach((date) => {
  date.addEventListener('click', () => {
    calendar.classList.toggle('show')
  })
})

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
    // Don't remove the styling that was just set for the newly selected date! 
    if (date === selectedDate) return
    date.classList.remove('selected')
  })
})

// Make sure the calendar date button updates with the new date when the user picks a different date. 
// When the user selects a date on the calendar..
grid.addEventListener('click', () => {
  // ..loop through the date buttons..
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
      // Use these three pieces to format the date..
      let formattedDate = format(new Date(year, month, day), 'MMMM do, yyyy')
      // ..and update the calendar button
      dateButton.textContent = formattedDate;
    }
  }
})

