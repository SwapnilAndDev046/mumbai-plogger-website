// Fetch images from the server
fetch("http://localhost:5000/gallery-images")
  .then((response) => response.json())
  .then((images) => {
    const galleryContainer = document.getElementById("image-gallery");

    // Clear any existing content
    galleryContainer.innerHTML = "";

    // Loop through the images and create <img> elements for each
    images.forEach((image) => {
      // Create an image element
      const imgElement = document.createElement("img");
      imgElement.src = `http://localhost:5000${image.filepath}`; // Ensure the full path is used here
      imgElement.alt = image.filename; // Use the filename as alt text
      imgElement.classList.add("gallery-image"); // Add a class for styling

      // Append the image element to the gallery container
      galleryContainer.appendChild(imgElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching images:", error);
  });
