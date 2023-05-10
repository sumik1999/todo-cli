const todo = require("../to_dotask.js");
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

const {
  all,
  add,
  markAsComplete,
  overdue,
  dueToday,
  dueLater,
  toDisplayableList,
} = todo();

describe("First test suite", () => {
  // Describe is used to define a test suite

  beforeAll(() => {
    // Seeding a value. So that it can be used by all the rest functions
    add({
      title: "My task seeded",
      dueDate: "2023-05-04",
      completed: false,
    });
    add({
      title: "Submit assignment",
      dueDate: yesterday,
      completed: false,
    });
    add({
      title: "Pay rent",
      dueDate: formattedDate(today),
      completed: true,
    });
    add({
      title: "Service Vehicle",
      dueDate: formattedDate(today),
      completed: false,
    });
    add({ title: "File taxes", dueDate: tomorrow, completed: false });
    add({
      title: "Pay electric bill",
      dueDate: tomorrow,
      completed: false,
    });
  });

  test("Check creating new Todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "My task 2",
      dueDate: formattedDate(today),
      completed: false,
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Check marrking a todo as complete", () => {
    expect(all[0].completed).toBe(false); // second test case dependent on first.so they are coupled. You'll need to seed values in order to remove coupling
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Retrieval of overdue list", () => {
    list_retrieved = overdue();
    list_retrieved.map((item) => {
      expect(new Date(item.dueDate).getDate()).toBeLessThan(today.getDate());
    });
  });

  test("Retrieval of duetoday list", () => {
    list_retrieved = dueToday();
    list_retrieved.map((item) =>
      expect(item.dueDate).toBe(formattedDate(today))
    );
  });

  test("Retrieval of duelater list", () => {
    list_retrieved = dueLater();
    list_retrieved.map((item) =>
      expect(new Date(item.dueDate).getDate()).toBeGreaterThan(today.getDate())
    );
  });
});
