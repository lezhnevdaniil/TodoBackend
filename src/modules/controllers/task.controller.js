const Task = require("../../db/models/task/index");

module.exports.getAllTasks = (req, res) => {
  Task.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.createNewTask = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const body = req.body;
  if (body.hasOwnProperty("text") & body.hasOwnProperty("isCheck")) {
    const task = new Task({
      text: body.text,
      isCheck: body.isCheck,
    });
    task
      .save()
      .then((result) => {
        Task.find().then((tasks) => {
          res.send(tasks);
        });
      })
      .catch((err) => res.send(err));
  }
};

module.exports.changeTaskInfo = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const body = req.body;
  const selector = { _id: body._id };
  console.log('selector',selector);
  console.log(body)
  if (
    body.hasOwnProperty("text") &&
    body.hasOwnProperty("_id") &&
    body.hasOwnProperty("isCheck")
  ) {
    Task.updateOne(selector, {
      $set: {
        text: body.text,
        isCheck: body.isCheck,
      },
    })
      .then((result) => {
        Task.find().then((tasks) => {
          res.send(tasks);
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }
};

module.exports.deleteTask = (req, res) => {
  const id = req.query.id;
  if (id) {
    Task.deleteOne({ _id: id }).then((result) => {
        Task.find().then((tasks) => {
          res.send(tasks);
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }
};
