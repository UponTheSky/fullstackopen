import React, { useState } from 'react';

import { Button } from './components/Button';
import { Stat } from './components/Stat';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleSetGood = () => { setGood(prev => prev + 1) };
  const handleSetNeutral = () => { setNeutral(prev => prev + 1) };
  const handleSetBad = () => { setBad(prev => prev + 1) };

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button text="good" onClickHandler={handleSetGood} />
        <Button text="neutral" onClickHandler={handleSetNeutral} />
        <Button text="bad" onClickHandler={handleSetBad} />
      </div>
      <div>
        <h1>statistics</h1>
        <Stat text="good" stat={good} />
        <Stat text="neutral" stat={neutral} />
        <Stat text="bad" stat={bad} />
      </div>
    </div>
  );
}

export default App;
