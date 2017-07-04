const _ = require('lodash');
const format = require('string-format');
const commonConfig = require('./common.json');

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

/**
 * capitalize
 * @return {String}
 */
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

/**
 * extends format to string prototype
 */
format.extend(String.prototype, {});

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

/**
 * Get configuration for a specific environment.
 *
 * @param {string} env
 * @returns {object}
 */
function getConfig (env = "development") {

  let envConfig;

  switch (env) {
    default:
      envConfig = require("./development.json");
      break;
  }

  let settings = _.merge(commonConfig, envConfig);

  return settings;
}

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

const envNames = {
  /**
   * Get development environment name.
   * @returns {string}
   */
  get development () {
    return "development";
  }
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

module.exports = getConfig(envNames.development);