function Ruler(fontID, sampleText) {
  var sampleSpan = document.createElement("span");
  sampleSpan.className = "ruler";
  this.sampleSpan = sampleSpan;

  document.body.appendChild(sampleSpan);
  this.updateFont(fontID);

  if (typeof sampleText == "string") {
    this.updateSample(sampleText);
  } else {
    var printableAscii = "";
    
    for (var charCode = 32; charCode < 127; charCode++) {
      printableAscii += String.fromCharCode(charCode);
    }

    this.updateSample(printableAscii);
  }

  this.measure();

  this.streamID;
  
  var self = this;
  
  window.events.onresize.addEvent(function () {
    self.measure();
  })
};

Ruler.prototype.measure = function () {
  var sampleRect = this.sampleSpan.getBoundingClientRect();
  var sampleSizeY = sampleRect.height;
  var textWidth = this.sampleSpan.textContent.length;
  var sampleSizeX = sampleRect.width / textWidth;

  this.screenSpace = {
    y: Math.floor(window.innerHeight / sampleSizeY),
    x: Math.floor(window.innerWidth / sampleSizeX)
  };
};

Ruler.prototype.updateFont = function (fontID) {
  this.sampleSpan.style.fontFamily = fontID;
};

Ruler.prototype.updateSample = function (sampleText) {
  this.sampleSpan.textContent = sampleText;
};

Ruler.prototype.getMeasure = function () {
  return this.screenSpace;
};

Ruler.prototype.stream = function (port) {
  var self = this;

  this.streamID = window.events.onresize.addEvent(function () {
    port(self.getMeasure());
  })
}