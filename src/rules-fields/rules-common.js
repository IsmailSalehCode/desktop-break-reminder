const isPositiveWholeNumberRegex = /^\d+$/;
const isHexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

const required = (v) => !!v || "Required.";
const isPositiveWholeNumber = (v) =>
  isPositiveWholeNumberRegex.test(v) || "Positive whole numbers only.";
const isLessThanMaxNumber = (v) =>
  v <= Number.MAX_SAFE_INTEGER || "Number exceeds max.";
const isValidHexCode = (v) => isHexRegex.test(v) || "Invalid hex code.";

export { required, isPositiveWholeNumber, isLessThanMaxNumber, isValidHexCode };
