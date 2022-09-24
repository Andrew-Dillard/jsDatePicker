// Date Picker
// Fully functional calendar date picker given some starting HTML and CSS using a library called  date-fns

/// BUGS: none!
/// ISSUES: none!
/// CONCERNS: There is unnecessary/repeated code. I suspect there are extra steps when it comes to applying and removing the 'selected' class
// The event listener code for the dates has a forEach then a for loop I'd like to combine into one loop for simplicity. I think I am looping too much. 

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

// Use The current date to declare and define variables to hold the current year, month, and day. The values of these will change as the user changes the date and will be used to render the calendar.
const today = new Date();
let currentYear = today.getFullYear() 
let currentMonth = today.getMonth()
let currentDay = today.getDate()

// These variables preserve the date values in the calendar button
let calendarButtonYear = currentYear
let calendarButtonMonth = currentMonth
let calendarButtonDay = currentDay

// Empty array for storing all date objects in the calendar grid at hand
let allDays = []
let areDaysPartOfMonth = []

// Display the current date in the proper format to the calendar date button
setCalendarButtonDate()


// FUNCTIONS //


// Displays the calendar of the appropriate month. The function runs when the user clicks one of the change month buttons, or when the date button is clicked to display the calendar
function renderCalendar() {
  
  // Display the correctly formatted month and year in the header
  setHeader()

  // Remove any previous applications of the hide class to row six elements, then hide the sixth row if appropriate
  hideOrDisplayRowSix()

  // Find and store all the days in the grid at hand
  findAllGridDays()

  // Apply correct date numbers
  setGridNumbers()

  // Locate days not in the current month to gray out
  findDaysInAdjacentMonths()

  // Add gray styling to days not in the current month
  grayOutDaysInAdjacentMonths()

  // Blue highlight the date chosen by the user
  highlightSelectedDate()
}


// renderCalendar() TASKS:


function setHeader() {
  let currentMonthYear = format(new Date(currentYear, currentMonth), "MMMM - yyyy")
  monthYearHeader.textContent = currentMonthYear
}

function hideOrDisplayRowSix() {
  removeHideClass()
  let weeksInCurrentMonth = getWeeksInMonth(new Date(currentYear, currentMonth))
  if (weeksInCurrentMonth !== 6) {
    datesRowSix.forEach((day) => {
      day.classList.add('hide')
    })
  }
}

function findAllGridDays() {
  // Locate first and last day in the grid 
  let numberOfDaysInCurrentMonth = getDaysInMonth(new Date(currentYear, currentMonth, currentDay))
  let firstDayOfFirstWeek = startOfWeek(new Date(currentYear, currentMonth))
  let lastDayOfLastWeek = endOfWeek(new Date(currentYear, currentMonth, numberOfDaysInCurrentMonth))

  // Create an array of all the days (Date objects) in the current month's calendar grid (35 or 42 items depending on if the month spans 6 weeks) using these beginning and ending dates. Begin by clearing the array of previous values
  allDays = []
  allDays = eachDayOfInterval({
    start: firstDayOfFirstWeek,
    end: lastDayOfLastWeek
  })
}

function setGridNumbers() {
  // Extract and store the literal date numbers from the 35 or 42 days in the month grid
  let allDaysNumbers = []
  allDays.forEach((day) => {
    allDaysNumbers.push(day.getDate())
  })
  // Apply the correct date numbers to the calendar buttons
  for (i = 0; i < allDaysNumbers.length; i++) {
    dates[i].textContent = allDaysNumbers[i]
  }
}

function findDaysInAdjacentMonths() {
  // Create an array of booleans indicating each day's membership in current month or not
  areDaysPartOfMonth = []
  allDays.forEach((day) => {
    if (day.getMonth() === currentMonth) {
      areDaysPartOfMonth.push(true)
    } else  {
      areDaysPartOfMonth.push(false)
    }
  })
}

function grayOutDaysInAdjacentMonths() {
  // Clear any old gray styling from prior function calls, then loop through the booleans, adding gray styling for dates not in the current month
  removeGrayedOutStyling()
  for (i = 0; i < areDaysPartOfMonth.length; i++) {
    // For true values,  continue  means start the loop again on the next item
    if (areDaysPartOfMonth[i] === true) continue
    dates[i].classList.add('date-picker-other-month-date')
  }
}

function highlightSelectedDate() {
  // Clear any outdated blue styling, then loop through all of the days looking for the current date, and give it the blue selected style
  removeSelectedStyling()
  for (i = 0; i < allDays.length; i++) {
    if (
      allDays[i].getDate() === currentDay &&
      allDays[i].getMonth() === currentMonth &&
      allDays[i].getFullYear() === currentYear
    ) {
      dates[i].classList.add('selected')
    }
  }
  // If the month being rendered doesn't match the date in the calendar button, then remove any blue highlighting
  if (
    !currentMonth === calendarButtonMonth ||
    !currentYear === calendarButtonYear) {
    removeSelectedStyling()
  }
}


// OTHER FUNCTIONS:


function setCalendarButtonDate() {
  let formattedDate = format(new Date(currentYear, currentMonth, currentDay), 'MMMM do, yyyy')
  dateButton.textContent = formattedDate;
}

// Removes the 'selected' CSS class from all of the date buttons
function removeSelectedStyling() {
  dates.forEach((date) => {
    date.classList.remove('selected')
  })
}

// Removes the gray styling class from all of the date buttons
function removeGrayedOutStyling() {
  dates.forEach((date) => {
    date.classList.remove('date-picker-other-month-date')
  })
}

// Applies the CSS class 'hide' to all the row 6 date buttons
function removeHideClass() {
  datesRowSix.forEach((day) => {
    day.classList.remove('hide')
  })
}


// If the month and year being rendered matches the calendar button date...
//// a. use the day value from the calendar button to update the currentDay variable 
//// b. run renderCalendar(). 
// Otherwise...
//// a. run renderCalendar()
//// b. remove blue styling as the month being displayed is NOT the month in the calendar button. 
function checkCalendarButtonDate() {
  if (
    currentMonth === calendarButtonMonth &&
    currentYear === calendarButtonYear
  ) {
    currentDay = calendarButtonDay
    renderCalendar()
  } else {
    renderCalendar()
    removeSelectedStyling()
  }
}


// EVENT LISTENERS //


// When the user clicks the previous month button..
// 1. If it is January, set the month to December and go back one year. Otherwise, just decrement the month
// 2. Check the month the user is trying to display against the date in the calendar button before rending the calendar. 
previousMonthButton.addEventListener('click', () => {
  
  if (currentMonth === 0) {
    currentMonth = 11
    currentYear = currentYear - 1
  } else {
    currentMonth = currentMonth - 1
  }
  checkCalendarButtonDate()
})


// When the user clicks the next month button..
// (see previousMonthButton event listener for details as it mirrors this handler)
nextMonthButton.addEventListener('click', () => {
  if (currentMonth === 11) {
    currentMonth = 0
    currentYear = currentYear + 1
  } else {
    currentMonth = currentMonth + 1
  }
  checkCalendarButtonDate()
})


// When the user clicks the calendar button...
// 1. If the calendar is not visible, then: 
//// a. update variables
//// b. run  renderCalendar()
// 2. Toggle the visibility of the calendar. 
dateButton.addEventListener('click', () => {
  if (!calendar.classList.contains('show')) {
  currentYear = calendarButtonYear
  currentMonth = calendarButtonMonth
  currentDay = calendarButtonDay
  renderCalendar()
  }
  calendar.classList.toggle('show')
})


// When the user clicks a date..
// 1. Hide the calendar 
// 2. Apply 'selected' class to the chosen date
// 3. Remove 'selected' class from all other dates
// 4. Update date variables with selected date
// 5. Update date in calendar button with the new date
dates.forEach((date) => {
  date.addEventListener('click', (event) => {
    calendar.classList.toggle('show')
    const selectedDate = event.target
    selectedDate.classList.toggle('selected')
    dates.forEach((date) => {
      if (date === selectedDate) return
      date.classList.remove('selected')
    })
    updateVariablesWithDateSelectedByUser()
    setCalendarButtonDate()
  })
})

function updateVariablesWithDateSelectedByUser() {
  for (i = 0; i < dates.length; i++) {
    if (dates[i].classList.contains('selected')) {
      calendarButtonYear = currentYear = allDays[i].getFullYear()
      calendarButtonMonth = currentMonth = allDays[i].getMonth()
      calendarButtonDay = currentDay = allDays[i].getDate()
    }
  }
}