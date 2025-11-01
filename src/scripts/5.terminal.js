function Terminal(displayID, measure, catcher) {
  this.display = document.getElementById(displayID);

  this.cursor = { x: 0, y: 0 };
  
  this.renderIndex = 0;

  this.dataRows = new Array();
  this.outputRows = new Array();

  this.adjust(measure);
  this.listen(catcher);
  
  this.blank();
  
  this.wipe();
  this.render();
  
  var self = this;

  window.events.onresize.addEvent(function () {
    self.blank();
    self.render();
  });

};

Terminal.prototype.adjust = function (measure) {
  this.measure = measure;
  this.terminalSize = measure.getMeasure();
  this.render();
};

Terminal.prototype.listen = function (catcher) {
  this.catcher = catcher;
}

Terminal.prototype.blank = function () {
  while (this.dataRows.length < this.terminalSize.y) {
    var currentRow = this.dataRows.length;
    this.dataRows[currentRow] = "\u00A0".repeat(this.terminalSize.x);
  }
};

Terminal.prototype.shiftCursor = function (x) {
  this.cursor.x = x;
  this.reRender(this.cursor.y);
}

Terminal.prototype.adjustCursor = function (y) {
  var startY = this.cursor.y;
  this.cursor.y = y;

  this.reRender(startY);
  this.reRender(this.cursor.y)
}


Terminal.prototype.wipe = function () {
  this.renderIndex = 0;
  this.display.innerHTML = "";
};

Terminal.prototype.render = function () {
  for (this.renderIndex; this.renderIndex < this.dataRows.length; this.renderIndex++) {

    var text = this.dataRows[this.renderIndex];
    var line = document.createElement("div");

    if (this.cursor.y == this.renderIndex) {
      
      var preCursorText = text.substring(0, this.cursor.x);
      var preCursorTextNode = document.createTextNode(preCursorText);

      line.appendChild(preCursorTextNode);

      var cursorSpan = document.createElement("span");
      cursorSpan.className = "cursor";
      
      var cursorText = text.charAt(this.cursor.x);
      var cursorTextNode = document.createTextNode(cursorText);

      cursorSpan.appendChild(cursorTextNode);

      line.appendChild(cursorSpan);

      var postCursorText = text.substring(this.cursor.x + 1, text.length);
      var postCursorTextNode = document.createTextNode(postCursorText);

      line.appendChild(postCursorTextNode);

    } else {
      var textNode = document.createTextNode(text);
      line.appendChild(textNode);
    }

    this.outputRows[this.renderIndex] = line;

    this.display.appendChild(line);
  }

};

Terminal.prototype.reRender = function (startIndex, endIndex) {

  if (typeof endIndex == "undefined") {
    endIndex = startIndex;
  } else if (startIndex > endIndex) {
    startIndex = startIndex ^ endIndex;
    endIndex = startIndex ^ endIndex;
    startIndex = startIndex ^ endIndex;
  }

  for (let reRenderIndex = startIndex; reRenderIndex <= endIndex; reRenderIndex++) {

    var text = this.dataRows[reRenderIndex];
    var line = this.outputRows[reRenderIndex];

    line.innerHTML = "";

    if (this.cursor.y == reRenderIndex) {

      var preCursorText = text.substring(0, this.cursor.x);
      var preCursorTextNode = document.createTextNode(preCursorText);

      line.appendChild(preCursorTextNode);

      var cursorSpan = document.createElement("span");
      cursorSpan.className += "cursor";
      
      var cursorText = text.charAt(this.cursor.x);
      var cursorTextNode = document.createTextNode(cursorText);

      cursorSpan.appendChild(cursorTextNode);

      line.appendChild(cursorSpan);

      var postCursorText = text.substring(this.cursor.x + 1, text.length);
      var postCursorTextNode = document.createTextNode(postCursorText);

      line.appendChild(postCursorTextNode);

    } else {
      var textNode = document.createTextNode(text);
      line.appendChild(textNode);
    }
    
  }
}

Terminal.prototype.write = function (message) {
  
  var overwrite = false;
  var startIndex = 0;
  var endIndex = 0;

  if (this.cursor.y < this.dataRows.length) {

    if (this.cursor.y < this.outputRows.length) {

      if (overwrite == false) {
        overwrite = true;
        startIndex = this.cursor.y;
      }
    }

    while (message.length > 0) {
      this.dataRows[this.cursor.y] = this.dataRows[this.cursor.y].replaceAt(this.cursor.x, message);
      
      var printedLength = message.length;
      
      message = message.substring(this.terminalSize.x - this.cursor.x);

      if (message.length == 0) {
        this.cursor.x += printedLength;
      } else {
        this.cursor.y++;
        this.cursor.x = 0;
      }
    }
  } else {
    this.dataRows[this.dataRows.length] = message + "\u00A0".repeat(this.terminal.x - message.length);
  }

  endIndex = this.cursor.y;

  if (overwrite == true) {
    this.reRender(startIndex, endIndex);
  }

  this.render();
};
