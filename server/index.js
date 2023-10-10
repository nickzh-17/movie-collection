require("dotenv").config();
const express = require("express");
const cors = require("cors");

const movieRoutes = require("./routes/movie-routes");

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(
	cors({ origin: ["http://localhost:3000", "http://localhost:3001", "https://qpgtk7kx-3000.euw.devtunnels.ms"] })
);

app.use("/api/v1/movies", movieRoutes);

// app.use(errorMiddleware); //должен быть в самом конце цепочки мидлваров

const startServer = (app, PORT) => {
	app.listen(PORT, err => {
		err ? console.log(err) : console.log(`Listening port ${PORT}`);
	});
};

startServer(app, process.env.PORT);
