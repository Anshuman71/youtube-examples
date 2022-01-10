// configs for the createPromiseArrayFromConfig function
const allItemsWillResolve = [
  { settleAfterSeconds: 1, shouldReject: false },
  { settleAfterSeconds: 1, shouldReject: false }
];
const someItemsReject = [
  { settleAfterSeconds: 1, shouldReject: false },
  { settleAfterSeconds: 1, shouldReject: true },
  { settleAfterSeconds: 1, shouldReject: false }
];
const allItemsReject = [
  { settleAfterSeconds: 1, shouldReject: true },
  { settleAfterSeconds: 1, shouldReject: true }
];
const itemsWillResolveAtDifferentTime = [
  { settleAfterSeconds: 2, shouldReject: false },
  { settleAfterSeconds: 1, shouldReject: false }
];

// creates an array of promises from the provided config
function createPromiseArrayFromConfig(arrayOfConfigs) {
  // map over the array config objects and
  // return a new Promise for each item as per the config
  return arrayOfConfigs.map(
    ({ settleAfterSeconds, shouldReject }, index) =>
      new Promise((resolve, reject) => {
        // wait "settleAfterSeconds" seconds before settling the promise
        setTimeout(() => {
          if (shouldReject) {
            reject(`Item at ${index} index couldn't resolve! `);
          } else {
            resolve(`Item at ${index} index resolved fine!`);
          }
        }, settleAfterSeconds * 1000);
      })
  );
}

// uncomment to run examples
// withRace();

// returns an array of result, if every promise resolves otherwise throws an error  from the first rejected item
async function withAll() {
  const allPassing = await Promise.all(
    createPromiseArrayFromConfig(allItemsWillResolve)
  );
  console.log(" withAll ~ allPassing", allPassing);
  try {
    const someFail = await Promise.all(
      createPromiseArrayFromConfig(someItemsReject)
    );
    console.log(" withAll ~ someFail", someFail);
  } catch (error) {
    console.error(" withAll", error);
  }
  try {
    const allFail = await Promise.all(
      createPromiseArrayFromConfig(allItemsReject)
    );
    console.log(" withAll ~ allFail", allFail);
  } catch (error) {
    console.error(" withAll", error);
  }
  const before = Date.now();
  const raceCondition = await Promise.all(
    createPromiseArrayFromConfig(itemsWillResolveAtDifferentTime)
  );
  const later = Date.now();
  console.log(" withAll ~ raceCondition", raceCondition);
  console.log(
    "Time ~ withAll ~ raceCondition",
    Math.floor((later - before) / 1000),
    " seconds"
  );
}

// method returns a promise that resolves after all of the given promises
// have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.
async function withAllSettled() {
  const allPassing = await Promise.allSettled(
    createPromiseArrayFromConfig(allItemsWillResolve)
  );
  console.log(" withAllSettled ~ allPassing", allPassing);
  try {
    const someFail = await Promise.allSettled(
      createPromiseArrayFromConfig(someItemsReject)
    );
    console.log(" withAllSettled ~ someFail", someFail);
  } catch (error) {
    console.error("withAllSettled", error);
  }
  try {
    const allFail = await Promise.allSettled(
      createPromiseArrayFromConfig(allItemsReject)
    );
    console.log(" withAllSettled ~ allFail", allFail);
  } catch (error) {
    console.error(" withAllSettled", error);
  }
  const before = Date.now();
  const raceCondition = await Promise.allSettled(
    createPromiseArrayFromConfig(itemsWillResolveAtDifferentTime)
  );
  const later = Date.now();
  console.log(" withAllSettled ~ raceCondition", raceCondition);
  console.log(
    "Time ~ withAllSettled ~ raceCondition",
    Math.round((later - before) / 1000),
    " seconds"
  );
}

// this method returns the first fulfilled value, node version > 15
async function withAny() {
  const allPassing = await Promise.any(
    createPromiseArrayFromConfig(allItemsWillResolve)
  );
  console.log("withAny ~ allPassing", allPassing);
  try {
    const someFail = await Promise.any(
      createPromiseArrayFromConfig(someItemsReject)
    );
    console.log(" withAny ~ someFail", someFail);
  } catch (error) {
    console.error(" withAny", error);
  }
  try {
    const allFail = await Promise.any(
      createPromiseArrayFromConfig(allItemsReject)
    );
    console.log(" withAny ~ allFail", allFail);
  } catch (error) {
    console.error(" withAny", error);
  }
  const before = Date.now();
  const raceCondition = await Promise.any(
    createPromiseArrayFromConfig(itemsWillResolveAtDifferentTime)
  );
  const later = Date.now();
  console.log(" withAny ~ raceCondition", raceCondition);
  console.log(
    "Time ~ withAny ~ raceCondition",
    Math.round((later - before) / 1000),
    " seconds"
  );
}

// returns a promise that fulfills or rejects
// as soon as one of the promises in an iterable fulfills or rejects
// If the iterable passed is empty, the promise returned will be forever pending.
async function withRace() {
  const allPassing = await Promise.race(
    createPromiseArrayFromConfig(allItemsWillResolve)
  );
  console.log(" withRace ~ allPassing", allPassing);
  try {
    const someFail = await Promise.race(
      createPromiseArrayFromConfig(someItemsReject)
    );
    console.log(" withRace ~ someFail", someFail);
  } catch (error) {
    console.error(" withRace", error);
  }
  try {
    const allFail = await Promise.race(
      createPromiseArrayFromConfig(allItemsReject)
    );
    console.log(" withRace ~ allFail", allFail);
  } catch (error) {
    console.error(" withRace", error);
  }
  const before = Date.now();
  const raceCondition = await Promise.race(
    createPromiseArrayFromConfig(itemsWillResolveAtDifferentTime)
  );
  const later = Date.now();
  console.log(" withRace ~ raceCondition", raceCondition);
  console.log(
    "Time ~ withRace ~ raceCondition",
    Math.round((later - before) / 1000),
    " seconds"
  );
}

// wait for "seconds" to reject
function waitFor(seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => reject(`Request couldn't resolve in ${seconds}`),
      seconds * 1000
    );
  });
}

// to test Promise.race
async function testCutoff() {
  try {
    await Promise.race([fetch(), waitFor(5)]);
  } catch (error) {
    console.log(error);
  }
}

// testCutoff();
