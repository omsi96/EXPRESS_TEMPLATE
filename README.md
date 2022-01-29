# Express - Sequelize Templat

This template allows you to create quick APIs using express, and sequilize. There are three main parts you should pay attention to

1. Routers
2. Models
3. Middlewares

When you want to create a new endpoint, then that should be in router. So go inside `routers` folder, and create a new folder for the module you want to create endpoints for. Even if it was a single endpoint, we recommend you creating a folder, so you have a module based routing system.

When you want to create a CRUD endpoints, you can do that with a single line of code using the CrudController class. Just do that using the following lines;

```js
import express from "express";
import DATABASE_MODEL from "../db/DATABASE_MODEL";

const router = express.Router();

router.use(
  "endpointPath/",
  new CrudRouter(new CrudController(DATABASE_MODEL, "ENDPOINT_NAME"))
);
```
