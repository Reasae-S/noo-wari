function Catcher() {
  var logger = document.createElement("input");
  this.logger = logger;
  logger.className = "catcher";
  document.body.appendChild(logger);

  this.listenID;
  this.listen();
  createEventPolyfill("oninput", logger);

};

Catcher.prototype.hear = function () {
  this.logger.focus();
}

Catcher.prototype.listen = function () {
  var self = this;

  this.listenID = document.events.onkeydown.addEvent(function () {
    self.hear();
  }); 
}

Catcher.prototype.deafen = function () {
  this.logger.blur();
}

Catcher.prototype.zone = function () {
  if (typeof this.listenID != undefined) {
    this.listenID = document.events.onkeydown.removeEvent(this.listenID);  
  }
}

Catcher.prototype.stream = function (port) {
  var self = this;

  this.streamID = this.logger.events.oninput.addEvent(function () {
    port(self.logger.value)
  })
}