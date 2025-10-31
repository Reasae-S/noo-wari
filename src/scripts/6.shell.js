function Shell(host, user, terminal) {
  this.login(host, user);
  
  this.command = "";
  this.commandLength = 0;
  this.connect(terminal);
  
  var self = this;

  this.terminal.catcher.stream(
    function (key) {
      self.userWrite(key);
    }
  )
};

Shell.prototype.connect = function (terminal) {
  this.terminal = terminal;
  this.prompt();
};

Shell.prototype.login = function (host, user) {
  this.host = host,
  this.user = user;
};

Shell.prototype.prompt = function () {
  this.promptText = this.user + "@" + this.host + ":~$ ";
  this.command += this.promptText;
  this.promptLength = this.promptText.length;
  this.promptLine = this.terminal.cursor.y
  this.terminal.write(this.promptText);
};

Shell.prototype.userWrite = function (msg) {

  this.command = this.promptText + msg;

  var startCursorY = this.terminal.cursor.y;

  this.terminal.pullCursor();
  this.terminal.cursor.y = this.promptLine;

  var clearSpace = (Math.abs(startCursorY - this.terminal.cursor.y) + 1) * this.terminal.terminalSize.x;

  this.terminal.write(
    "\u00A0".repeat(clearSpace)
  )

  this.terminal.pullCursor();
  this.terminal.cursor.y = this.promptLine;

  this.terminal.write(
    this.command
  );




  this.terminal.reRender(this.promptLine);
  this.terminal.reRender(this.terminal.cursor.y);
}
