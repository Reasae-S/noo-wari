function Catcher() {
  var logger = document.createElement("input");
  this.logger = logger;
  logger.className = "catcher";
  document.body.appendChild(logger);

  this.listenID;
  this.listen();
  createEventPolyfill("oninput", logger);
  createEventPolyfill("onkeydown", logger);

};

Catcher.prototype.getCaretPosition = function () {
  if (typeof this.logger.selectionStart == "number") {
    return this.logger.selectionStart;
  }

  if (document.selection) {
    var range = document.selection.range;
    range.moveStart("character", -this.logger.value.length)
    return range.text.length;
  }
}

Catcher.prototype.getInput = function () {
  var writing = new Object();
  writing.msg = this.logger.value;
  writing.pos = this.getCaretPosition();
  return writing;
}

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

  this.streamID = this.logger.events.onkeydown.addEvent(function (event) {

    if (event.key == "Enter") {
      self.logger.value = "";
      var writing = new Object();
      writing.msg = "";
      writing.pos = 0;
      port(writing, "Enter")
    }

    if (event.shiftKey &&  event.key.substring(0, "Arrow".length) == "Arrow") {
        event.preventDefault();
        return;
    }

    if (event.key == "ArrowLeft") {
      var writing = self.getInput();
      writing.pos--;
      writing.pos = Math.max(writing.pos, 0)
      port(writing)
    }

    else if (event.key == "ArrowRight") {
      var writing = self.getInput();
      writing.pos++;
      writing.pos = Math.min(writing.pos, writing.msg.length)
      port(writing)
    }
  })

  this.streamID = this.logger.events.oninput.addEvent(function () {

    var writing = new Object();
    writing.msg = self.logger.value;
    writing.pos = self.getCaretPosition();

    port(writing)
  })
}