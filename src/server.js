import express from "express"
import cors from "cors"
import {listEndpoints} from "express-list-endpoints"
import join from "path"



const server = express();

const port = process.env.PORT || 3001; // the fallback is for local development, heroku will use his own port, something like 12312, because imagine how many processes are running on the same machine there

server.use(express.json());

const corsOptions =
  process.env.NODE_ENV === "production"
    ? {
        origin: function (origin, callback) {
          if (whiteList.indexOf(origin) !== -1 || !origin) {
            // allowed
            callback(null, true);
          } else {
            // Not allowed
            callback(new Error("NOT ALLOWED - CORS ISSUES"));
          }
        },
      }
    : {};




//ROUTES

server.use("/media", mediaRoutes);
server.use("/reviews", reviewsRoutes);
server.use("/user", usersRoutes);

// ERROR HANDLERS
server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

console.log(listEndpoints(server));

server.listen(port, () => {
    console.log("Running locally on port", port);
});