void (function () {

  function setStatus(msg) {
    window.status = msg;
  }

  function patchConsole(prop, header) {
    header += ": ";

    if (typeof console[prop] != "function") {
      console[prop] = function (msg) {
        msg = header + msg;
        setStatus(msg);
      }
    } else {
      var originalFunction = console[prop];
      console[prop] = function (msg) {
        msg = header + msg;
        originalFunction(msg);
        setStatus(msg);
      }
    }
  }

  var knownFn = new Array(
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

  var fnAlias = new Array (
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

    for (let fnIndex = 0; fnIndex < knownFn.length; fnIndex++) {
      console[knownFn[knownIndex]] = function (msg) {
        setStatus(fnAlias[fnIndex] + ": " + msg);
      }
    }

  } else {
    for (let fnIndex = 0; fnIndex < knownFn.length; fnIndex++) {
      patchConsole(knownFn[fnIndex], fnAlias[fnIndex]);
    }
  }

})();
