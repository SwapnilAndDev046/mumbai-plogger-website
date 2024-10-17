const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();

// Middleware to parse JSON data from POST requests
app.use(express.json());
app.use(cors()); // Use CORS middleware

// Set up MySQL connection
const db = mysql.createConnection({
  host: "mysql-17a2c69b-swapnildevkate93-b9f7.i.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_gxeCrqxRBYkcfnAsgUU",
  database: "events_db",
  port: 21524,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Example route for testing the server
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Add a new event
app.post("/events", (req, res) => {
  const { name, date_time, location, join_link } = req.body;
  db.query(
    "INSERT INTO events (name, date_time, location, join_link) VALUES (?, ?, ?, ?)",
    [name, date_time, location, join_link],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).json({ id: result.insertId });
    }
  );
});

// Fetch all events
app.get("/events", (req, res) => {
  const sql = "SELECT * FROM events";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send("Error fetching events");
    res.json(results);
  });
});

// Delete an event by name
app.delete("/events/:name", (req, res) => {
  const { name } = req.params;
  const sql = "DELETE FROM events WHERE name = ?";
  db.query(sql, [name], (err, result) => {
    if (err) return res.status(500).json({ message: "Error deleting event" });
    res.status(200).json({ message: "Event deleted!" });
  });
});

// Handle POST request for logout
app.post("/logout", (req, res) => {
  res.status(200).send("Logged out successfully");
});

// Photo uploading
const uploadDirectory = path.join(__dirname, "public", "images", "gallery");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const cleanFileName = file.originalname.replace(/\s+/g, "-");
    cb(null, cleanFileName);
  },
});

const upload = multer({ storage: storage });

// API to handle image upload and store path in MySQL
app.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const imagePath = `/images/gallery/${req.file.filename}`;
  const sql = "INSERT INTO images (filename, filepath) VALUES (?, ?)";
  db.query(sql, [req.file.filename, imagePath], (err, result) => {
    if (err)
      return res.status(500).json({ message: "Failed to store image path." });
    res
      .status(200)
      .json({ message: "Image uploaded and path saved successfully." });
  });
});

// API to delete an image by filename
app.delete("/delete-photo/:filename", (req, res) => {
  const photoPath = path.join(uploadDirectory, req.params.filename);

  // Delete the file from the server directory
  fs.unlink(photoPath, (err) => {
    if (err)
      return res.status(500).json({ message: "Failed to delete the photo." });

    // After successfully deleting the file, remove its record from the database
    const sql = "DELETE FROM images WHERE filename = ?";
    db.query(sql, [req.params.filename], (dbErr, result) => {
      if (dbErr)
        return res
          .status(500)
          .json({ message: "Failed to delete from database." });
      res.status(200).json({ message: "Photo deleted successfully!" });
    });
  });
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html at the specified route
app.get("/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "index.html"));
});

// Log every incoming request
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Endpoint to fetch images in the gallery folder
app.get("/images/gallery", (req, res) => {
  const galleryPath = path.join(__dirname, "public", "images", "gallery");
  fs.readdir(galleryPath, (err, files) => {
    if (err)
      return res.status(500).json({ error: "Failed to read gallery folder" });
    const imageFiles = files.filter((file) =>
      file.match(/\.(jpg|jpeg|png|gif|webp)$/)
    );
    res.json(imageFiles);
  });
});

// Route to fetch gallery images from the database
app.get("/gallery-images", (req, res) => {
  const sql = "SELECT * FROM images";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching images:", err);
      return res.status(500).json({ message: "Error fetching images" });
    }
    res.json(results); // Send the list of images as JSON to the client
  });
});

// Start the server
const PORT = process.env.PORT || 5000; // Use the Render port or default to 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// setuping routes

// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "index.html"));
});

app.get("/gallery", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "gallery.html"));
});

// Serve the admin dashboard
app.get("/admin-dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "admin-dashboard.html"));
});
