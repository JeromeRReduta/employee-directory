import express from "express";

const app = express();
export default app;

/** These two functions are overkill but I feel that it would be important to abstract the relationship between employee id and index in a "real" app where ids may be defined separately from indices */
export function idToIndex(id) {
  return id - 1;
}

export function indexToId(index) {
  return index + 1;
}
