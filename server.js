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


/*

  Router.get("/", async (req, res, next) => {
    try {
      const employees = await Employee.findAll({
        include: [Category, { model: Employee, as: "boss" }],
      });
  
      const categories = await Category.findAll();
      const options = categories
        .map((category) => {
          return `
        <option value='${category.id}'>
        ${category.name}
        </option>
        `;
        })
        .join("");
      const html = employees
        .map((employee) => {
          const boss = employee.boss;
          let bossName = "NO BOSS";
          if (boss) {
            bossName = boss.name;
          }
          return `<div>
                          Employee Name: ${employee.name} -- Employee Department: ${employee.category.name} -- Name of Boss: ${bossName}
                          <a href = '/employees/${employee.id}'> employee page </a>
                          <a href = 'categories/${employee.categoryId}'> category page </a>
                      </div>
                `;
        })
        .join("");
      res.send(`
      <html>
          <head>
            <title> Robbys' Corporation </title>
          </head>
          <body>
            <h1> Robby's Corporation </h1>
            <form Method = "POST">
            <input name='name' placeholder = "employee name">
            <select name="categoryId">
            ${options}
            </select>
            <button> CREATE NEW EMPLOYEE</button>
            </form>
            <div> ${html} </div>
           
          </body>
      </html>
      
      `);
    } catch (ex) {
      next(ex);
    }
  });
*/