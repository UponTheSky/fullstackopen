import React, { useState } from 'react';

import { Button } from './components/Button';
// import { Statistics } from './components/Statistics';

// const App = () => {
//   const [good, setGood] = useState(0)
//   const [neutral, setNeutral] = useState(0)
//   const [bad, setBad] = useState(0)

//   const handleSetGood = () => { setGood(prev => prev + 1) };
//   const handleSetNeutral = () => { setNeutral(prev => prev + 1) };
//   const handleSetBad = () => { setBad(prev => prev + 1) };

//   const getTotal = () => good + neutral + bad;

//   return (
//     <div>
//       <div>
//         <h1>give feedback</h1>
//         <Button text="good" onClickHandler={handleSetGood} />
//         <Button text="neutral" onClickHandler={handleSetNeutral} />
//         <Button text="bad" onClickHandler={handleSetBad} />
//       </div>
//       <div>
//         <h1>statistics</h1>
//         {getTotal() === 0 ?
//           "No feedback given" :
//           <Statistics good={good} neutral={neutral} bad={bad} />
//         }
//       </div>
//     </div>
//   );
// }

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState<{[key: number]: number}>(() => 
    Array(anecdotes.length).fill(0)
      .reduce((prev, _, idx) => { 
          prev[idx] = 0;
          return prev;
        }, 
      {})
  );

  const handleSelectItems = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const handleVoteItems = () => {
    setPoints({...points, [selected]: points[selected] + 1});
  };

  return (
    <div>
      {anecdotes[selected]}
      <br />
      has {points[selected]} votes
      <br />
      <Button text="next anecdote" onClickHandler={handleSelectItems} />
      <Button text="vote" onClickHandler={handleVoteItems} />
    </div>
  )
};

export default App;
