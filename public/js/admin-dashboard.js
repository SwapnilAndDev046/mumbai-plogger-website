document.addEventListener("DOMContentLoaded", function () {
  // Function to add a new event
  document
    .getElementById("addEventForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Get event details from the form
      const eventName = document.getElementById("eventName").value;
      const eventDate = document.getElementById("eventDate").value;
      const eventHour = document.getElementById("eventHour").value;
      const eventMinute = document.getElementById("eventMinute").value;
      const eventAMPM = document.getElementById("eventAMPM").value;
      const eventLocation = document.getElementById("eventLocation").value;
      const joinLink = document.getElementById("joinLink").value;

      // Check if all fields are filled
      if (
        !eventName ||
        !eventDate ||
        !eventHour ||
        !eventMinute ||
        !eventAMPM ||
        !eventLocation
      ) {
        alert("Please fill in all fields.");
        return;
      }

      // Convert time to 24-hour format
      let hour = parseInt(eventHour);
      if (eventAMPM === "PM" && hour !== 12) {
        hour += 12;
      } else if (eventAMPM === "AM" && hour === 12) {
        hour = 0;
      }

      const formattedTime = `${hour
        .toString()
        .padStart(2, "0")}:${eventMinute}`;
      const dateTime = `${eventDate} ${formattedTime}`;

      // Send a POST request to the server to add the event
      fetch("http://localhost:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: eventName,
          date_time: `${eventDate} ${eventTime}`, // combining date and time into one field for backend
          location: eventLocation,
          join_link: "N/A", // Placeholder if join link is not needed
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Expecting JSON response from the server
        })
        .then((data) => {
          alert(data.message); // Show the server response (e.g., "Event added!")
          document.getElementById("addEventForm").reset(); // Clear the form
        })
        .catch((err) => {
          console.error("Error adding event:", err);
          alert("Failed to add event: " + err.message);
        });
    });

  // Function to delete an event by name
  document
    .getElementById("deleteEventForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Get the name of the event to delete
      const eventNameToDelete =
        document.getElementById("eventNameToDelete").value;

      // Send a DELETE request to the server
      fetch(`http://localhost:5000/events/${eventNameToDelete}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Expecting JSON response
        })
        .then((data) => {
          alert(data.message); // Show the server response (e.g., "Event deleted!")
          document.getElementById("deleteEventForm").reset(); // Clear the form
        })
        .catch((err) => {
          console.error("Error deleting event:", err);
          alert("Failed to delete event: " + err.message);
        });
    });
});

// Handle photo upload
document
  .getElementById("photoForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const photoInput = document.getElementById("photoUpload");
    const formData = new FormData();
    formData.append("image", photoInput.files[0]);

    fetch("http://localhost:5000/upload-image", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        document.getElementById("uploadStatus").textContent =
          data.message || "Photo uploaded successfully!";

        photoInput.value = ""; // Clear the file input after upload

        // Redirect to the gallery page in a new tab after upload
        window.open("http://127.0.0.1:5000/public/html/gallery.html", "_blank");
      })
      .catch((error) => {
        console.error("Error uploading photo:", error);
        document.getElementById("uploadStatus").textContent =
          "Failed to upload photo.";
      });
  });

// Handle photo deletion
document
  .getElementById("deletePhotoForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const filename = document
      .getElementById("deletePhotoFilename")
      .value.trim();

    // Log the filename to see what is being sent
    console.log("Deleting photo:", filename);

    fetch(
      `http://localhost:5000/delete-photo/${encodeURIComponent(filename)}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        document.getElementById("deleteStatus").textContent =
          data.message || "Photo deleted successfully!";
        document.getElementById("deletePhotoFilename").value = ""; // Clear the input after deletion
      })
      .then((data) => {
        // alert(data.message || 'Event added successfully!');
        window.open("/public/html/gallery.html", "_blank");
      })
      .catch((error) => {
        console.error("Error deleting photo:", error);
        document.getElementById("deleteStatus").textContent =
          "Failed to delete photo.";
      });
  });
