void (function () {
  var defaultParent = null;
  var possibleParents = new Array(document, window);

  for (var parentIndex = 0; parentIndex < possibleParents.length; parentIndex++) {
    var possibleParent = possibleParents[parentIndex];
    if (typeof possibleParent != "undefined") {
      defaultParent = possibleParent;
      break;
    }
  }

  function createEventPolyfill(event, parent) {
    if (typeof parent == "undefined") {
      parent = defaultParent;
    }

    if (typeof parent.events == "undefined") {
      parent.events = new Object();
    }

    if (typeof parent.events[event] != "undefined") {
      return;
    }

    var eventPolyfill = new Object();
    var functionQueue = new Array();
    eventPolyfill.functionQueue = functionQueue;

    eventPolyfill.addEvent = function (functionReference) {
      var eventID = functionQueue.length;
      functionQueue[eventID] = functionReference;
      return eventID;
    }

    eventPolyfill.removeEvent = function (eventID) {
      var lastFunctionIndex = functionQueue.length - 1;
      var functionIndex = eventID;
      while (functionIndex < lastFunctionIndex) {
        functionQueue[functionIndex] = functionQueue[functionIndex + 1];
        functionIndex = functionIndex + 1;
      }
      functionQueue.length = lastFunctionIndex;
    }

    parent.events[event] = eventPolyfill;

    parent[event] = function (context) {
      var functionIndex = 0;
      while (functionIndex < functionQueue.length) {
        functionQueue[functionIndex](context);
        functionIndex = functionIndex + 1;
      }
    }
  }

  window.createEventPolyfill = createEventPolyfill;
  createEventPolyfill("onkeydown", document);

})();
