// all rules in one JS file for now
const isHexOrUnsetRegex = /^(#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})|unset)$/;

const required = (v) => !!v || "Required.";

const isValidColorValue = (v) => isHexOrUnsetRegex.test(v) || "Invalid value.";

export { required, isValidColorValue };
