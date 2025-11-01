function Shell(host, user, terminal) {
  this.login(host, user);
  
  this.command = "";
  this.commandLength = 0;
  this.connect(terminal);
  
  var self = this;

  this.catcher.stream(
    function (writing, special) {

      if (typeof special != "undefined") {
        if (special == "Enter") {
          this.catcher.clear();
          this.command = "";
          self.terminal.adjustCursor(self.cursor.y + 1);
          self.terminal.shiftCursor(0);
          self.prompt();
        }
      }

      self.userWrite(writing.msg);

      var adjust = Math.floor((self.promptLength + writing.pos) / self.terminal.terminalSize.x) + self.promptLine;
      var shift = (self.promptLength + writing.pos) % self.terminal.terminalSize.x

      self.terminal.adjustCursor(adjust);
      self.terminal.shiftCursor(shift)
    }
  )
};

Shell.prototype.connect = function (terminal) {
  this.terminal = terminal;
  this.cursor = this.terminal.cursor;
  this.catcher = this.terminal.catcher;
  this.prompt();
};

Shell.prototype.login = function (host, user) {
  this.host = host,
  this.user = user;
};

Shell.prototype.prompt = function () {
  this.promptText = this.user + "@" + this.host + ":~$ ";
  this.promptLength = this.promptText.length;
  this.command += this.promptText;
  this.promptLine = this.terminal.cursor.y
  this.terminal.write(this.promptText);
};

Shell.prototype.gotoPrompt = function () {
  this.cursor.x = 0;
  this.cursor.y = this.promptLine;
}

Shell.prototype.userWrite = function (msg) {

  this.command = this.promptText + msg;

  var startCursorY = this.cursor.y;

  this.gotoPrompt();
  
  var clearSpace = (Math.abs(startCursorY - this.cursor.y) + 1) * this.terminal.terminalSize.x;

  this.terminal.write(
    "\u00A0".repeat(clearSpace)
  )

  this.gotoPrompt();

  this.terminal.write(
    this.command
  );

  this.terminal.reRender(this.promptLine);
  this.terminal.reRender(this.terminal.cursor.y);
}
