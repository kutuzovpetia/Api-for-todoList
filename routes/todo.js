const { Router, json } = require("express");
const Todo = require("../models/todo");

const router = Router();

// Получение списка задач
router.get("/all", async (req, res) => {
  try {
    const todos = await Todo.findAll({ include: "lists" });
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// Получение одной записи
router.get("/get/:id", async (req, res) => {

  try {

    const todo = await Todo.findByPk(+req.params.id, { include: "lists" });
    res.status(200).json(todo);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }

});

// Создание нового списка
router.post("/new", async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
    });
    res.status(201).json({ todo });
  
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// Добавление задачи в список
router.post("/add/:id", async (req, res) => {
  
  try {
    const todo = await Todo.findByPk(+req.params.id);
  
   const id = await todo.createList({
        title: req.body.title,
        note: req.body.note,
        date: req.body.date,
        priority: req.body.priority,
      });
     res.status(201).send(id);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
  
});

// Удаление задачи из списка
router.delete("/del/:id1/:id2", async (req, res) => {
  
  try {
   
    const todo = await Todo.findAll({
      where : {id : +req.params.id1},
      include : 'lists'
    })

    const lists = todo[0].lists // массив записей
    const index = lists.findIndex(item => item.id === +req.params.id2); // находим индэкс
    lists[index].destroy(); // удаляем
    console.log(index);
    res.status(204).json({});

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
  
});


// Изменение Чек
router.put("/done/:id1/:id2", async (req, res) => {
  try {
    // const todo = await Todo.findByPk(+req.params.id);
    // todo.done = req.body.done;
    // await todo.save();
    // res.status(200).json(todo);
    
    const todo = await Todo.findAll({
      where : {id : +req.params.id1},
      include : 'lists'
    })

    const lists = todo[0].lists // массив записей
    const index = lists.findIndex(item => item.id === +req.params.id2); // находим индэкс
    lists[index].done = req.body.done; // Изменяем чек
    await lists[index].save(); // сохраняем

    res.status(204).send('check');

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});


// Изменение приоритета
router.put("/priority/:id1/:id2", async (req, res) => {
  try {
    const todo = await Todo.findAll({
      where : {id : +req.params.id1},
      include : 'lists'
    })

    const lists = todo[0].lists // массив записей
    const index = lists.findIndex(item => item.id === +req.params.id2); // находим индэкс
    lists[index].priority = req.body.priority; // Изменяем приоритет
    await lists[index].save(); // сохраняем

    res.status(204).send('priority');

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// Изменение Date
router.put("/date/:id1/:id2", async (req, res) => {
  try {
    const todo = await Todo.findAll({
      where : {id : +req.params.id1},
      include : 'lists'
    })

    const lists = todo[0].lists // массив записей
    const index = lists.findIndex(item => item.id === +req.params.id2); // находим индэкс
    lists[index].date = req.body.date; // Изменяем приоритет
    await lists[index].save(); // сохраняем

    res.status(204).send('priority');

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});
// Изменение Task
router.put("/task/:id1/:id2", async (req, res) => {
  try {
    const todo = await Todo.findAll({
      where : {id : +req.params.id1},
      include : 'lists'
    })

    const lists = todo[0].lists // массив записей
    const index = lists.findIndex(item => item.id === +req.params.id2); // находим индэкс
    lists[index].note = req.body.note; // Изменяем приоритет
    await lists[index].save(); // сохраняем

    res.status(204).send('priority');

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// Удаление задач
router.delete("/delete/:id", async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: {
        id: +req.params.id,
      },
    });
    const todo = todos[0];
    await todo.destroy();
    res.status(204).json({});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
