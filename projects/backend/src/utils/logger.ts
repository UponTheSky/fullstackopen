export const info = (...params: string[]) => {
  if (process.env.NODE_ENV === 'test') {
    return;
  }
  console.log(...params);
}

export const error = (...params: string[]) => {
  if (process.env.NODE_ENV === 'test') {
    return;
  }
  console.error(...params);
}
