import SequelizeSlugify from "../../utils/sequelize-slugify";
module.exports = (sequelize, DataTypes) => {
  const Sample = sequelize.define("Sample", {
    title: { type: DataTypes.STRING, allowNull: false },
    titleArabic: DataTypes.STRING,
    position: { type: DataTypes.INTEGER },
    description: DataTypes.STRING,
    coverImage: DataTypes.STRING,
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    id: { type: DataTypes.STRING, primaryKey: true },
  });

  SequelizeSlugify.slugifyModel(Sample, {
    source: ["title"],
  });

  return Sample;
};
