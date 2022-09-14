// Date Picker
// Fully functional calendar date picker given some starting HTML and CSS using a library called  date-fns

/// BUGS: 

// BUG #1: When scrolling back to the month that has the selected date, the blue styling needs to return

// BUG #2: Blue styling is lost when clicking between dates though the date remains in the calendar button

// BUG #3: after the user clicks change month buttons, renderCalendar() needs to look to the date in the calendar date button first when rendering the calendar


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


let calendarButtonYear = currentYear
let calendarButtonMonth = currentMonth
let calendarButtonDay = currentDay

// Empty array for accumulating all date objects in the calendar grid at hand
let allDays = []

// Display the current date in the proper format to the calendar date button
let formattedDate = format(new Date(currentYear, currentMonth, currentDay), 'MMMM do, yyyy')
dateButton.textContent = formattedDate;


// FUNCTIONS //


// This function runs when the user clicks one of the change month buttons, or when the date button is clicked to display the calendar
function renderCalendar() {
  
  // Display the correctly formatted month and year in the header
  let currentMonthYear = format(new Date(currentYear, currentMonth), "MMMM - yyyy")
  monthYearHeader.textContent = currentMonthYear

  // Remove any previous applications of the hide class, then hide the sixth row if unneeded
  removeHideClass()
  let weeksInCurrentMonth = getWeeksInMonth(new Date(currentYear, currentMonth, currentDay))
  if (weeksInCurrentMonth !== 6) {
    datesRowSix.forEach((day) => {
      day.classList.add('hide')
    })
  }

  // Update number of days in current month and locate first and last day in the grid 
  numberOfDaysInCurrentMonth = getDaysInMonth(new Date(currentYear, currentMonth, currentDay))
  let firstDayOfFirstWeek = startOfWeek(new Date(currentYear, currentMonth))
  let lastDayOfLastWeek = endOfWeek(new Date(currentYear, currentMonth, numberOfDaysInCurrentMonth))

  // Create an array of all the days (Date objects) in the current month's calendar grid (35 or 42 items depending on if the month spans 6 weeks) using these beginning and ending dates. Begin by clearing the array of previous values
  allDays = []
  allDays = eachDayOfInterval({
    start: firstDayOfFirstWeek,
    end: lastDayOfLastWeek
  })

  // Extract and store the literal date numbers from the 35 or 42 days in the month grid
  let allDaysNumbers = []
  allDays.forEach((day) => {
    allDaysNumbers.push(day.getDate())
  })

  // Apply the correct date numbers to the calendar buttons
  for (i = 0; i < allDaysNumbers.length; i++) {
    dates[i].textContent = allDaysNumbers[i]
  }

  // Create an array of booleans indicating each day's membership in current month or not
  let areDaysPartOfMonth = []
  allDays.forEach((day) => {
    if (day.getMonth() === currentMonth) {
      areDaysPartOfMonth.push(true)
    } else  {
      areDaysPartOfMonth.push(false)
    }
  })

  // Clear any old gray styling from prior function calls, then loop through the booleans, adding gray styling for dates not in the current month
  removeGrayedOutStyling()
  for (i = 0; i < areDaysPartOfMonth.length; i++) {
    // For true values,  continue  means start the loop again on the next item
    if (areDaysPartOfMonth[i] === true) continue
    dates[i].classList.add('date-picker-other-month-date')
  }

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

  if (
    !currentMonth === calendarButtonMonth ||
    !currentYear === calendarButtonYear) {
    removeSelectedStyling()
  }

}

// This function removes the 'selected' CSS class from all of the date buttons
function removeSelectedStyling() {
  dates.forEach((date) => {
    date.classList.remove('selected')
  })
}

// This function removes the gray styling class from all of the date buttons
function removeGrayedOutStyling() {
  dates.forEach((date) => {
    date.classList.remove('date-picker-other-month-date')
  })
}

// This function applies the CSS class 'hide' to all the row 6 date buttons
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
    // currentDay = 15
  }


  if (
    currentMonth === calendarButtonMonth &&
    currentYear === calendarButtonYear
  ) {
    console.log('hello world')
    currentDay = calendarButtonDay
    renderCalendar()
  } else {
    currentDay = 15
    renderCalendar()
    removeSelectedStyling()
  }


  // renderCalendar()
  // removeSelectedStyling()
})

nextMonthButton.addEventListener('click', () => {

  if (currentMonth === 11) {
    currentMonth = 0
    currentYear = currentYear + 1
  } else {
    currentMonth = currentMonth + 1
  }
  
  if (
    currentMonth === calendarButtonMonth &&
    currentYear === calendarButtonYear
  ) {
    console.log('hello world')
    currentDay = calendarButtonDay
    renderCalendar()
  } else {
    currentDay = 15
    renderCalendar()
    removeSelectedStyling()
  }
})

// Allow the user to toggle the visibility of the calendar with the button
// If the calendar is not visible, then run  renderCalendar()
dateButton.addEventListener('click', () => {
  if (!calendar.classList.contains('show')) {

  currentYear = calendarButtonYear
  currentMonth = calendarButtonMonth
  currentDay = calendarButtonDay

  renderCalendar()
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
      // and use that index to access the associated Date object, extracting its year, month, and date. Update variables
      currentYear = allDays[i].getFullYear()
      currentMonth = allDays[i].getMonth()
      currentDay = allDays[i].getDate()

      calendarButtonYear = currentYear
      calendarButtonMonth = currentMonth
      calendarButtonDay = currentDay

      numberOfDaysInCurrentMonth = getDaysInMonth(new Date(currentYear, currentMonth, currentDay))
      
      // Display the current date in the proper format to the calendar date button
      formattedDate = format(new Date(currentYear, currentMonth, currentDay), 'MMMM do, yyyy')
      dateButton.textContent = formattedDate;
    }
  }
})

