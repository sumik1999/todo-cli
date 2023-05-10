const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

var today = new Date();
// const today = formattedDate(dateToday);

const yesterday = formattedDate(
  new Date(new Date().setDate(today.getDate() - 1))
);

const tomorrow = formattedDate(
  new Date(new Date().setDate(today.getDate() + 1))
);

const todoList = () => {
  all = [];
  const add = (todoTask) => {
    all.push(todoTask);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };
  const overdue = () => {
    return all.filter((item) => {
      // console.log(item.dueDate.getDate(), today.getDate());
      return new Date(item.dueDate) <= new Date(yesterday);
    });
  };
  const dueToday = () => {
    return all.filter((item) => {
      return item.dueDate === formattedDate(today);
    });
  };
  const dueLater = () => {
    return all.filter((item) => {
      return new Date(item.dueDate) > today;
    });
  };
  const toDisplayableList = (list) => {
    for (ind in list) {
      if (list[ind].completed == true) {
        console.log(`[x] ${list[ind].title}`);
      } else {
        console.log(`[ ] ${list[ind].title}`);
      }
    }
    // return list.map();
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  }; // return functions in curly braces
};

const todos = todoList();

module.exports = todoList;
