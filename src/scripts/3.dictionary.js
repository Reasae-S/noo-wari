var CharacterSet;

void (function () {

  function getDefaultMap() {

    var asciiMap = new Object();

    asciiMap["\x20"] = 0x20;
    asciiMap["\x21"] = 0x21;
    asciiMap["\x22"] = 0x22;
    asciiMap["\x23"] = 0x23;
    asciiMap["\x24"] = 0x24;
    asciiMap["\x25"] = 0x25;
    asciiMap["\x26"] = 0x26;
    asciiMap["\x27"] = 0x27;
    asciiMap["\x28"] = 0x28;
    asciiMap["\x29"] = 0x29;
    asciiMap["\x2A"] = 0x2A;
    asciiMap["\x2B"] = 0x2B;
    asciiMap["\x2C"] = 0x2C;
    asciiMap["\x2D"] = 0x2D;
    asciiMap["\x2E"] = 0x2E;
    asciiMap["\x2F"] = 0x2F;
    asciiMap["\x30"] = 0x30;
    asciiMap["\x31"] = 0x31;
    asciiMap["\x32"] = 0x32;
    asciiMap["\x33"] = 0x33;
    asciiMap["\x34"] = 0x34;
    asciiMap["\x35"] = 0x35;
    asciiMap["\x36"] = 0x36;
    asciiMap["\x37"] = 0x37;
    asciiMap["\x38"] = 0x38;
    asciiMap["\x39"] = 0x39;
    asciiMap["\x3A"] = 0x3A;
    asciiMap["\x3B"] = 0x3B;
    asciiMap["\x3C"] = 0x3C;
    asciiMap["\x3D"] = 0x3D;
    asciiMap["\x3E"] = 0x3E;
    asciiMap["\x3F"] = 0x3F;
    asciiMap["\x40"] = 0x40;
    asciiMap["\x41"] = 0x41;
    asciiMap["\x42"] = 0x42;
    asciiMap["\x43"] = 0x43;
    asciiMap["\x44"] = 0x44;
    asciiMap["\x45"] = 0x45;
    asciiMap["\x46"] = 0x46;
    asciiMap["\x47"] = 0x47;
    asciiMap["\x48"] = 0x48;
    asciiMap["\x49"] = 0x49;
    asciiMap["\x4A"] = 0x4A;
    asciiMap["\x4B"] = 0x4B;
    asciiMap["\x4C"] = 0x4C;
    asciiMap["\x4D"] = 0x4D;
    asciiMap["\x4E"] = 0x4E;
    asciiMap["\x4F"] = 0x4F;
    asciiMap["\x50"] = 0x50;
    asciiMap["\x51"] = 0x51;
    asciiMap["\x52"] = 0x52;
    asciiMap["\x53"] = 0x53;
    asciiMap["\x54"] = 0x54;
    asciiMap["\x55"] = 0x55;
    asciiMap["\x56"] = 0x56;
    asciiMap["\x57"] = 0x57;
    asciiMap["\x58"] = 0x58;
    asciiMap["\x59"] = 0x59;
    asciiMap["\x5A"] = 0x5A;
    asciiMap["\x5B"] = 0x5B;
    asciiMap["\x5C"] = 0x5C;
    asciiMap["\x5D"] = 0x5D;
    asciiMap["\x5E"] = 0x5E;
    asciiMap["\x5F"] = 0x5F;
    asciiMap["\x60"] = 0x60;
    asciiMap["\x61"] = 0x61;
    asciiMap["\x62"] = 0x62;
    asciiMap["\x63"] = 0x63;
    asciiMap["\x64"] = 0x64;
    asciiMap["\x65"] = 0x65;
    asciiMap["\x66"] = 0x66;
    asciiMap["\x67"] = 0x67;
    asciiMap["\x68"] = 0x68;
    asciiMap["\x69"] = 0x69;
    asciiMap["\x6A"] = 0x6A;
    asciiMap["\x6B"] = 0x6B;
    asciiMap["\x6C"] = 0x6C;
    asciiMap["\x6D"] = 0x6D;
    asciiMap["\x6E"] = 0x6E;
    asciiMap["\x6F"] = 0x6F;
    asciiMap["\x70"] = 0x70;
    asciiMap["\x71"] = 0x71;
    asciiMap["\x72"] = 0x72;
    asciiMap["\x73"] = 0x73;
    asciiMap["\x74"] = 0x74;
    asciiMap["\x75"] = 0x75;
    asciiMap["\x76"] = 0x76;
    asciiMap["\x77"] = 0x77;
    asciiMap["\x78"] = 0x78;
    asciiMap["\x79"] = 0x79;
    asciiMap["\x7A"] = 0x7A;
    asciiMap["\x7B"] = 0x7B;
    asciiMap["\x7C"] = 0x7C;
    asciiMap["\x7D"] = 0x7D;
    asciiMap["\x7E"] = 0x7E;

    return asciiMap;
  }

  function reverseMap(map) {
    var newMap = new Array();

    for (var character in map) {
      var code = map[character];
      newMap[code] = character;
    }

    return newMap;
  }

  CharacterSet = function(setMap) {

    if (typeof setMap != "object") {
      this.setMap = getDefaultMap();
    } else {
      this.setMap = setMap;
    }

    this.setArray = reverseMap(this.setMap);
  }

  CharacterSet.prototype.getCode = function (character) {
    return this.setMap[character] || -1;
  };

  CharacterSet.prototype.getChar = function (code) {
    return this.setArray[code] || "\x7F";
  }
})();
