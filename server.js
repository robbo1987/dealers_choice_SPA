const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABSE_URL || "postgres://localhost/dealers_choice_spa"
);

const Guitarist = sequelize.define("guitarists", {
  name: {
    type: Sequelize.DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  style: {
    type: Sequelize.ENUM("jazz", "rock", "metal", "flamenco"),
  },
});

const express = require("express");
const app = express();
const port = process.env.port || 3000;
const path = require("path");

app.use("/src", express.static(path.join(__dirname, "src")));
app.use(express.urlencoded({ extended:false}))
app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);



app.get("/api/guitarists", async (req, res, next) => {
  try {
    res.send(await Guitarist.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.delete('/api/guitarists/:id', async (req, res, next) => {
  try {
    const guitarist = await Guitarist.findByPk(req.params.id);
    await guitarist.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

  
app.post("/", async (req, res, next) => {
  try { const guitarist = await Guitarist.create(req.body)
        res.send(guitarist)
    
  } catch (ex) {
    next(ex);
  }
})

const init = async () => {
  try {
    console.log("data is seeded");
    await sequelize.sync({ force: true });
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
    const jimmy = Guitarist.create({ name: "jimmy page", style: "rock" });
    const wes = Guitarist.create({ name: "wes montgomery", style: "jazz" });
    const kirk = Guitarist.create({ name: "kirk hammet", style: "metal" });
    const paco = Guitarist.create({ name: "paco de lucia", style: "flamenco" });
    const joe = Guitarist.create({ name: "joe walsh", style: "rock" });
  } catch (ex) {
    console.log(ex);
  }
};

init();


