// Get the modal
const modal = document.getElementById("loginModal");

// Get the button that opens the modal
const btn = document.getElementById("adminLoginBtn");

// Get the <span> element that closes the modal
const closeBtn = document.querySelector(".close-btn");

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "flex"; // Display the modal as flex to center content
  modal.setAttribute("aria-hidden", "false"); // Accessibility: announce modal is visible
  modal.focus(); // Accessibility: Set focus on the modal for keyboard users
};

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function () {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true"); // Accessibility: modal is hidden
  btn.focus(); // Return focus to the button
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    btn.focus(); // Return focus to the button
  }
};

// Optional: Add a keypress event for accessibility
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modal.style.display === "flex") {
    closeBtn.onclick(); // Close modal when Escape is pressed
  }
});

// Login form logic
document
  .querySelector(".login-form")
  .addEventListener("submit", function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check the credentials
    if (username === "Rashmi_2024" && password === "MUMBAI_PLOG11") {
      // Open the admin dashboard
      window.location.href = "public/html/admin-dashboard.html"; // Ensure the path is correct
    } else {
      // Show error message
      alert("Invalid username or password");
    }
  });

// Function to create and display event cards
function displayUpcomingEvents() {
  // Fetch events from the backend
  fetch("http://localhost:5000/events")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((events) => {
      const eventsContainer = document.getElementById("eventsContainer");
      eventsContainer.innerHTML = ""; // Clear the container

      // Loop through the events and create event cards
      events.forEach((event) => {
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card");

        const eventDate = new Date(event.date_time);
        const formattedDate = `${String(eventDate.getDate()).padStart(
          2,
          "0"
        )}/${String(eventDate.getMonth() + 1).padStart(
          2,
          "0"
        )}/${eventDate.getFullYear()}`;
        const formattedTime = eventDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }); // This will handle AM/PM format

        eventCard.innerHTML = `
           <h1 class="event-title">${event.name}</h1>
        <p class="event-details">Date: ${formattedDate}</p>
      <p class="event-details" >  Time: ${formattedTime}</p>
        <p class="event-details">Location: ${event.location}</p>
        <a href="${event.join_link}" class="join-now-btn">Join Now</a>
        `;

        // Add the event card to the container
        eventsContainer.appendChild(eventCard);
      });
    })
    .catch((err) => {
      console.error("Error fetching events:", err);
    });
}

// Call the function to display events when the page loads
document.addEventListener("DOMContentLoaded", displayUpcomingEvents);

/* FAQ */
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;

    faqQuestions.forEach((q) => {
      if (q !== question) {
        q.nextElementSibling.style.maxHeight = null;
      }
    });

    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});
