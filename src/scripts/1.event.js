void function () {
  var events = new Object();
  
  var defaultParent;
  var possibleParents = new Array(document, window, globalThis);

  for (var parentIndex = 0; parentIndex < possibleParents.length; parentIndex++) {
    var possibleParent = possibleParents[parentIndex];
    if (typeof possibleParent != undefined) {
      defaultParent = possibleParent;
      break;
    }
  }
  
  function createEventPolyfill(event, parent) {
  
    if (typeof parent == "undefined") {
      parent = defaultParent;
    }

    var parentName = parent.constructor.name;

    if (typeof events[parentName] == "undefined") {
      events[parentName] = new Object();
    } else if (typeof events[parentName][event] != "undefined") {
      return
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
  
      for (var functionIndex = eventID; functionIndex < lastFunctionIndex; functionIndex++) {
        functionQueue[functionIndex] = functionQueue[functionIndex + 1];
      }
  
      functionQueue.length = lastFunctionIndex;
    }
  
    events[parentName][event] = eventPolyfill;
  
    parent[event] = function(context) {
      for (var functionIndex = 0; functionIndex < functionQueue.length; functionIndex++) {
        functionQueue[functionIndex](context);
      }
    };
  }
  
  window.events = events;
  window.createEventPolyfill = createEventPolyfill;

  createEventPolyfill("onkeydown", document);
  createEventPolyfill("onresize", window);
}();

