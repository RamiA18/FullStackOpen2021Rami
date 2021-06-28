import express from "express";
import BMICalculator from "./bmiCalculator";
import exerciseCalculator from "./exerciseCalculator";
const app = express();
const PORT = 3003;
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/bmiclculator", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const testArg: boolean = !isNaN(height) && !isNaN(weight);
  if (!weight || !height || !testArg) {
    res.status(400).send("Wrong request");
  }
  res.json({
    weight,
    height,
    BodyMassIndex: BMICalculator(height, weight),
  });
});

app.post("/exercisecalculator", (req, res) => {
  try {
    const testingTypeLog: boolean = req.body.daily_exercises.some(isNaN);
    const testingTypeTarget: boolean = isNaN(Number(req.body.target));

    if (
      req.body.daily_exercises &&
      req.body.target &&
      !testingTypeLog &&
      !testingTypeTarget
    ) {
      res.json(exerciseCalculator(req.body.daily_exercises, req.body.target));
    } else {
      res.status(400).json({
        error: "Parameter(s) missing or invalid",
      });
    }
  } catch (e) {
    console.error(e);
    res.send(e);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
