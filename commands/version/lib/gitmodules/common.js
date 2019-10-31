const checkForNonEmptyString = string => {
  const type = typeof string;
  if (type !== "string") {
    throw new Error(`The parameter was not a string - type was: ${type}!`);
  }
  if (!string) {
    throw new Error("The parameter was an empty string!");
  }
};

module.exports = {
  checkForNonEmptyString,
};
