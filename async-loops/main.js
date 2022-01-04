const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export async function mainWithFor() {
  const start = Date.now();
  const logger = getLogger("mainWithFor");
  for (const item of list) {
    await waitFor(2);
    const later = Date.now();
    logger(item, later - start);
  }
}

export async function mainWithForEach() {
  const start = Date.now();
  const logger = getLogger("mainWithForEach");
  list.forEach(async (item) => {
    await waitFor(2);
    const later = Date.now();
    logger(item, later - start);
  });
}

export async function mainWithMap() {
  const start = Date.now();
  const logger = getLogger("mainWithMap");
  const promises = list.map(async (item) => {
    await waitFor(2);
    const later = Date.now();
    logger(item, later - start);
  });
  const finalAnswer = await Promise.all(promises);
  return finalAnswer;
}

// creates a logger function to print logs with function name
function getLogger(fnName) {
  return function logger(value, diffInMS) {
    return console.log(
      `${fnName}: Item ${value} finished waiting ${Math.round(
        diffInMS / 1000
      )} seconds later.`
    );
  };
}

// simulates an async flow, a network request for example
async function waitFor(seconds) {
  // used to create the fancy waterfall
  fetch("https://random-data-api.com/api/stripe/random_stripe" + Math.random());
  // the fake asynchronous task
  return new Promise((res, rej) => {
    setTimeout(res, seconds * 1000);
  });
}
