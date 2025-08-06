import app, { idToIndex } from "#app";
import employees from "#db/employees";
const PORT = 3000;

app.get("/", (req, res) => {
  res.status(200).send("Hello employees!");
});

app.get("/employees", (req, res) => {
  res.status(200).send(employees);
});

app.get("/employees/random", (req, res) => {
  res.status(200).send("TODO: RANDOM");
});

app.get("/employees/:id", (req, res, next) => {
  try {
    const parsedI = idToIndex(parseInt(req.params.id));
    console.log("PARSED I", parsedI);
    if (isNaN(parsedI)) {
      const error = new Error(`${req.params.id} is not a number`);
      error.code = 404;
      throw error;
    }
    if (parsedI < 0 || parsedI >= employees.length) {
      const error = new Error("Out of range!");
      error.code = 404;
      throw error;
    }
    res.status(200).send(employees[parsedI]);
  } catch (e) {
    next(e);
  }
});

app.use((error, req, res, next) => {
  res.status(error.code || 500).send(error.message ?? "it borken");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
