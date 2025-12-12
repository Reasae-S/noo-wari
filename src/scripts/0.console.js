/*
  Polyfill for the console API.
  Logs are cast to strings and sent via either
  the deprecated window.status or patched console methods.
*/

void (function () {

  function setStatus(message) {
    window.status = message;
  }

  function patchConsole(property, header) {
    header += ": ";

    if (typeof console[property] != "function") {
      console[property] = function (message) {
        message = header + message;
        setStatus(message);
      }
    } else {
      var originalFunction = console[property];
      console[property] = function (message) {
        message = header + message;
        originalFunction(message);
        setStatus(message);
      }
    }
  }

  var consoleFunctions = new Array(
    "assert",
    "clear",
    "count",
    "countReset",
    "debug",
    "dir",
    "dirxml",
    "error",
    "exception",
    "group",
    "groupCollapsed",
    "groupEnd",
    "info",
    "log",
    "profile",
    "profileEnd",
    "table",
    "time",
    "timeEnd",
    "timeLog",
    "timeStamp",
    "trace",
    "warn"
  );

  var consoleAliases = new Array (
    "ASR",
    "CLR",
    "CNT",
    "CNR",
    "DBG",
    "DIR",
    "DXL",
    "ERR",
    "EXC",
    "GRP",
    "GRC",
    "GRE",
    "INF",
    "LOG",
    "PRF",
    "PRE",
    "TBL",
    "TIM",
    "TME",
    "TLG",
    "TMS",
    "TRC",
    "WRN"
  );

  if (typeof console != "object") {
    window.console = new Object();

    for (let functionIndex = 0; functionIndex < consoleFunctions.length; functionIndex++) {
      console[consoleFunctions[functionIndex]] = function (message) {
        setStatus(consoleAliases[functionIndex] + ": " + message);
      }
    }

  } else {
    for (let functionIndex = 0; functionIndex < consoleFunctions.length; functionIndex++) {
      patchConsole(consoleFunctions[functionIndex], consoleAliases[functionIndex]);
    }
  }
})();
