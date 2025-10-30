void function () {
  var defaultParent = null;
  var possibleParents = new Array();
  possibleParents[0] = document;
  possibleParents[1] = this;

  for (var parentIndex = 0; parentIndex < possibleParents.length; parentIndex++) {
    var possibleParent = possibleParents[parentIndex];
    if (possibleParent != null) {
      defaultParent = possibleParent;
      break;
    }
  }

  function createEventPolyfill(event, parent) {
    if (parent == null) {
      parent = defaultParent;
    }

    if (parent.events == null) {
      parent.events = new Object();
    }

    if (parent.events[event] != null) {
      return;
    }

    var eventPolyfill = new Object();
    var functionQueue = new Array();
    eventPolyfill.functionQueue = functionQueue;

    eventPolyfill.addEvent = function (functionReference) {
      var eventID = functionQueue.length;
      functionQueue[eventID] = functionReference;
      return eventID;
    };

    eventPolyfill.removeEvent = function (eventID) {
      var lastFunctionIndex = functionQueue.length - 1;
      var functionIndex = eventID;
      while (functionIndex < lastFunctionIndex) {
        functionQueue[functionIndex] = functionQueue[functionIndex + 1];
        functionIndex = functionIndex + 1;
      }
      functionQueue.length = lastFunctionIndex;
    };

    parent.events[event] = eventPolyfill;

    parent[event] = function (context) {
      var functionIndex = 0;
      while (functionIndex < functionQueue.length) {
        functionQueue[functionIndex](context);
        functionIndex = functionIndex + 1;
      }
    };
  }

  this.createEventPolyfill = createEventPolyfill;

  createEventPolyfill("onkeydown", document);
  createEventPolyfill("onresize", window);
}();
