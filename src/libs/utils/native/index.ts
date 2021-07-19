export const sleep = (duration: number = 1000) => <Result>(result: Result) => new Promise<Result>((resolve) => {
  setTimeout(() => resolve(result), duration);
});
