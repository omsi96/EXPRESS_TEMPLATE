import { postMiddleware, preMiddleware } from "./middleware";

import app from "./express";
import { connect } from "./db";
import { errorMiddleware } from "./middleware/errorMiddleware";
import routers from "./routers";

const port = process.env.PORT || 8080;
app.use(preMiddleware);
app.use(routers);
app.use(postMiddleware);
app.use(errorMiddleware);

require("./discord");

connect(async () => {
  app.listen(port, () => {
    console.log("App is running at port " + port);
  });
});
