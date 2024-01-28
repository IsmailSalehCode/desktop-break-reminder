const isPositiveWholeNumberRegex = /^\d+$/;

const required = (v) => !!v || "Required.";
const isPositiveWholeNumber = (v) =>
  isPositiveWholeNumberRegex.test(v) || "Positive whole numbers only.";
const isLessThanMaxNumber = (v) =>
  v <= Number.MAX_SAFE_INTEGER || "Number exceeds max.";

export { required, isPositiveWholeNumber, isLessThanMaxNumber };
