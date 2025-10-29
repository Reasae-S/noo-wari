void function () {
  if (typeof console == "undefined") {
    window.console = new Object();
    
    console.log = function (msg) {
      window.status = "" + msg;
    }

    console.error = function (err) {
      window.status = "ERR: " + err;
    }

    console.console.warn = function (wrn) {
      window.status = "WRN: " + wrn;
    };
  }
}();