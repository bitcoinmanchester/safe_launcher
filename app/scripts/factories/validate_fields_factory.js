/**
 * Validate Fields Factory
 */
window.safeLauncher.factory('validateFieldsFactory', [ 'MESSAGES', 'CONSTANTS', 'utilsFactory',
  function(MESSAGES, CONSTANTS, utils) {
    var self = this;

    // validate pin
    self.validatePin = function(val) {
      if (!val) {
        return MESSAGES.PIN_FIELD_BLANK;
      }
      if (isNaN(val)) {
        return MESSAGES.PIN_MUST_BE_NUM;
      }
      if (val.length < CONSTANTS.PIN_MIN_LEN) {
        return MESSAGES.PIN_FOUR_CHAR_LONG;
      }
      return null;
    };

    // validate keyword
    self.validateKeyword = function(val) {
      if (!val) {
        return MESSAGES.KEYWORD_FIELD_BLANK;
      }
      if (val.length < CONSTANTS.KEYWORD_MIN_LEN) {
        return MESSAGES.KEYWORD_SIX_CHAR_LONG;
      }
      return null;
    };

    // valiate password
    self.validatePassword = function(val) {
      if (!val) {
        return MESSAGES.PASSWORD_FIELD_BLANK;
      }
      if (val.length < CONSTANTS.PASSWORD_MIN_LEN) {
        return MESSAGES.PASSWORD_SIX_CHAR_LONG;
      }
      return null;
    };

    self.validateConfirmPIN = function(val) {

    };

    return self;
  }
]);
