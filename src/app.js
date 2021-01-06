import path from "path";
import express, { response } from "express";
import hbs from "hbs";
import { geocode } from "./utils/geocode.js";
import { forecast } from "./utils/forecast.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
console.log(__dirname);
console.log(path.join(__dirname, "../public"));
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Find Weather",
    name: "Tommy Ngo",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Tommy Ngo",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    howtouse:
      "Just type in your location and Find Weather will display your results!",
    email: "tommykhoango@gmail.com",
    name: "Tommy Ngo",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address.",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(
        latitude,
        longitude,
        (error, { description, temperature, feelslike, icon } = {}) => {
          if (error) {
            return res.send({ error });
          }

          res.send({
            description,
            temperature,
            feelslike,
            icon,
            location,
            address: req.query.address,
          });
        }
      );
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errormessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errormessage: "Page Not Found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port + ".");
});
