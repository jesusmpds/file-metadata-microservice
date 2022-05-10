var express = require("express");
var cors = require("cors");
if (process.env.NODE_ENV === "development") require("dotenv").config();
const multer = require("multer");
var app = express();

// Multer setup
const upload = multer({ dest: "./public/uploads/" });

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res, next) => {
  if (!req.file) {
    res.json({ error: "Please upload a file" });
  }

  const { originalname, mimetype, size } = req.file;

  res.json({
    name: originalname,
    type: mimetype,
    size: size,
  });
  return;
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
