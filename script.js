// Lesson 73 - Date Picker

// We will be building a fully functional date picker given some starting HTML and CSS using a library called  date-fns

// Specifications:
// Upon entering, the user only sees a button with the current date. When the user clicks the button, a calendar beneath the button appears highlighting the current date. 

// When the user uses the calendar to select a different date, the calendar disappears and the button's date changes to the user's selection. 

// When the user selects the button again, the calendar appears once again, this time highlighting the most recent user selection. 

// The user has left and right month buttons at the top corners of the calendar to change the month

// The Month and Year will be displayed at the top center of the calendar and will change as needed as the user interacts with the month buttons. 


const dateButton = document.querySelector('.date-picker-button');
const calendar = document.querySelector('.date-picker')

// Task 1 - Complete 
// Allow the user to toggle the visibility of the calendar with the button
dateButton.addEventListener('click', () => {
  calendar.classList.toggle('show')
})

// Task 2 
// Make the calendar hidden upon page load
