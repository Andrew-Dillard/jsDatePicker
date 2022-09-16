// Date Picker
// Fully functional calendar date picker given some starting HTML and CSS using a library called  date-fns

/// BUGS: none!
/// ISSUES:
// Issue1: renderCalendar() has 10 tasks!!! Unacceptable. Helper functions need to be created for clarity and ease of future understanding and updates to the code
// Issue2: We are manually setting the currentDay to the 15th to avoid issues with the imported  getWeeksInMonth()  function. Though it works, I despise this approach. 
// Issue3: The change month event listeners have repeated code that needs to be encapsulated in a function

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

// These variables contain the date values in the calendar button
let calendarButtonYear = currentYear
let calendarButtonMonth = currentMonth
let calendarButtonDay = currentDay

// Empty array for storing all date objects in the calendar grid at hand
let allDays = []

// Display the current date in the proper format to the calendar date button
let formattedDate = format(new Date(currentYear, currentMonth, currentDay), 'MMMM do, yyyy')
dateButton.textContent = formattedDate;


// FUNCTIONS //


// Displays the calendar of the appropriate month. The function runs when the user clicks one of the change month buttons, or when the date button is clicked to display the calendar
function renderCalendar() {
  
  // Display the correctly formatted month and year in the header
  let currentMonthYear = format(new Date(currentYear, currentMonth), "MMMM - yyyy")
  monthYearHeader.textContent = currentMonthYear

  // Remove any previous applications of the hide class, then hide the sixth row if unneeded
  removeHideClass()
  let weeksInCurrentMonth = getWeeksInMonth(new Date(currentYear, currentMonth))
  if (weeksInCurrentMonth !== 6) {
    datesRowSix.forEach((day) => {
      day.classList.add('hide')
    })
  }

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

  // If the month being rendered doesn't match the date in the calendar button, then remove any blue highlighting
  if (
    !currentMonth === calendarButtonMonth ||
    !currentYear === calendarButtonYear) {
    removeSelectedStyling()
  }
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


// EVENT LISTENERS //

// 1. When the user clicks the back button, set and display the previous month
previousMonthButton.addEventListener('click', () => {
  // If it is January, set the month to December and go back one year. Otherwise, just decrement the month
  if (currentMonth === 0) {
    currentMonth = 11
    currentYear = currentYear - 1
  } else {
    currentMonth = currentMonth - 1
  }
  // If the month the user is going back to matches the date in the calendar button, use the day value from the calendar button to update the currentDay and render the month. Otherwise, set the day to the 15th to not cause an issue with  getWeeksInMonth() , render the calendar, and remove the blue styling since we are not displaying the month that matches the calendar date button
  if (
    currentMonth === calendarButtonMonth &&
    currentYear === calendarButtonYear
  ) {
    currentDay = calendarButtonDay
    renderCalendar()
  } else {
    // currentDay = 15
    renderCalendar()
    removeSelectedStyling()
  }
})

// 2. See previousMonthButton event listener for details as it mirrors this handler
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
    currentDay = calendarButtonDay
    renderCalendar()
  } else {
    // currentDay = 15
    renderCalendar()
    removeSelectedStyling()
  }
})

// 3. When the user clicks the calendar button, if the calendar is not visible, then run  renderCalendar()  with the date set in the calendar button by updating the variables first with the calendar button date values. Then toggle the visibility of the calendar. 
dateButton.addEventListener('click', () => {
  if (!calendar.classList.contains('show')) {
  currentYear = calendarButtonYear
  currentMonth = calendarButtonMonth
  currentDay = calendarButtonDay
  renderCalendar()
  }
  calendar.classList.toggle('show')
})

// 4. Calendar disappears when the user picks a date
dates.forEach((date) => {
  date.addEventListener('click', () => {
    calendar.classList.toggle('show')
  })
})

// 5. When the user clicks a date, switch the blue highlighting from the old date to the new date. Grab the button the user selected and toggle the 'selected' class to add blue highlighting. Then loop through all the other buttons and remove the class of 'selected' without removing the styling that was just set for the new chosen date. 
dates.forEach((date) => {
  date.addEventListener('click', (event) => {
    const selectedDate = event.target
    selectedDate.classList.toggle('selected')
    dates.forEach((date) => {
      if (date === selectedDate) return
      date.classList.remove('selected')
    })
  })
})

// 6. The calendar date button updates with the new date when the user picks a different date. When the user selects a date on the calendar, loop through the date buttons, find the index of the button with the class of 'selected', and use that index to access the associated Date object, extracting its year, month, and date. Update variables used for renderCalendar() and calendar button variables as well. Finally, update the date displayed in the calendar button. 
grid.addEventListener('click', () => {  
  for (i = 0; i < dates.length; i++) {
    if (dates[i].classList.contains('selected')) {
      currentYear = allDays[i].getFullYear()
      currentMonth = allDays[i].getMonth()
      currentDay = allDays[i].getDate()
      calendarButtonYear = currentYear
      calendarButtonMonth = currentMonth
      calendarButtonDay = currentDay
      formattedDate = format(new Date(currentYear, currentMonth, currentDay), 'MMMM do, yyyy')
      dateButton.textContent = formattedDate;
    }
  }
})

