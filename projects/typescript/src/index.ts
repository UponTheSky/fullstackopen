import express from 'express';

import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_request, response) => {
  response.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) => {
  const { heightParams, weightParams } = request.query;
  const height = Number(heightParams);
  const weight = Number(weightParams);

  if (isNaN(height) || isNaN(weight)) {
    response.status(400).json({
      error: "malformatted parameters"
    });
    return;
  }

  const bmi = calculateBmi(height, weight);

  response.status(200).json({
    weight,
    height,
    bmi
  })
})

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
