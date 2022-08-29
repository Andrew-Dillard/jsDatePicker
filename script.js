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

// Task 1 - Complete 
// Allow the user to toggle the visibility of the calendar with the button
dateButton.addEventListener('click', () => {
  calendar.classList.toggle('show')
})

// Task 2 - Complete
// Make the calendar hidden upon page load (done in the HTML by removing show class to begin with)

// Task 3 
// Change the blue highlight styling to the new date the user picks
// and remove the styling from the previously selected date

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