class CrudController {
  constructor(ITEM, item, listOptions = {}) {
    this.ITEM = ITEM; // Model used for crud methods
    this.item = item; // String represents the name of the model
    this.listOptions = listOptions;
  }
  // CREATE
  create = async (req, res, next) => {
    try {
      const newItem = await this.ITEM.create(req.body);
      console.log(`🆕 New ${this.item} has been created!`);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  };

  // UPDATE
  update = async (req, res, next) => {
    const { id } = req.params;
    console.log(`🆕 Got ${this.item} id:`, id);
    try {
      const foundItem = await this.ITEM.findByPk(id);
      if (foundItem) {
        await foundItem.update(req.body);
        res.status(202).json({ message: "Updated!", payload: foundItem });
      } else {
        res.status(404).json({ message: `${this.item} Not Found` });
      }
    } catch (error) {
      next(error);
    }
  };

  // DELETE
  destory = async (req, res, next) => {
    const { id } = req.params;
    try {
      const foundItem = await this.ITEM.findByPk(id);
      if (foundItem) {
        await foundItem.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Error while deleting" });
      }
    } catch (error) {
      next(error);
    }
  };
  // LIST
  list = async (req, res, next) => {
    try {
      const allItems = await this.ITEM.findAll(this.listOptions);
      res.json(allItems);
    } catch (error) {
      next(error);
    }
  };

  getSingleElement = async (req, res, next) => {
    try {
      const { id } = req.params;
    } catch (error) {
      next(error);
    }
  };
}

module.exports = CrudController;
