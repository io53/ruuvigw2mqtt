const { parseData } = require("ruuvitag-parser");

const decoder = (data) => {
  try {
    return data.indexOf("FF9904") !== -1 ? parseData(data) : null;
  } catch (error) {
    console.error("parse error", error);
    return null;
  }
};

module.exports = decoder;
