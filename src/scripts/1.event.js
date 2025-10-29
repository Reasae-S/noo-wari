void function () {
  window.events = new Object();
  
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
  
    window.events[event] = eventPolyfill;
  
    parent[event] = function(context) {
      for (var functionIndex = 0; functionIndex < functionQueue.length; functionIndex++) {
        functionQueue[functionIndex](context);
      }
    };
  }
  
  window.createEventPolyfill = createEventPolyfill;
  
  createEventPolyfill("onkeydown", document);
  createEventPolyfill("onresize", window);
}();

