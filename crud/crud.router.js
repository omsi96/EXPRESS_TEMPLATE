const express = require("express");

const defaultOptions = {
  listMW: [],
  createMW: [],
  updateMW: [],
  destroyMW: [],
  listPath: "/",
  createPath: "/",
  destroyPath: "/:id",
  updatePath: "/:id",
};
class CrudRouter extends express.Router {
  constructor(crudController, options = defaultOptions) {
    super();
    function next(req, res, next) {
      console.log("Next");
      next();
    }

    this.get(
      options?.listPath ?? "/",
      options?.listMW ?? next,
      (req, res, next) => {
        next();
      },
      crudController.list
    );
    this.post(
      options?.createPath ?? "/",
      options?.createMW ?? next,
      crudController.create
    );
    this.put(
      options?.updatePath ?? "/:id",
      options?.updateMW ?? next,
      crudController.update
    );
    this.delete(
      options?.destroyPath ?? "/:id",
      options?.destroyMW ?? next,
      crudController.destory
    );
  }
}
module.exports = CrudRouter;
