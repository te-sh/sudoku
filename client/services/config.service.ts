export class Config {
  cell: ConfigCell;
  cand: ConfigCand;
  house: ConfigHouse;

  constructor() {
    let json = require("config.json");
  }
}

export class ConfigCell {
  padding: number;
  text: ConfigText;
  frame: ConfigRect;
  markRect: ConfigRect;
  cursor: ConfigRect;

  constructor(json: any) {
    this.padding = json.padding;
    this.text = new ConfigText(json.text);
    this.frame = new ConfigRect(json.frame);
    this.markRect = new ConfigRect(json.markRect);
    this.cursor = new ConfigRect(json.markRect);
  }
}

export class ConfigCand {
  padding: number;
  text: ConfigText;
  frame: ConfigRect;
  markRect: ConfigRect;
  markCirc: ConfigCirc;

  constructor(json: any) {
    this.padding = json.padding;
    this.text = new ConfigText(json.text);
    this.frame = new ConfigRect(json.frame);
    this.markRect = new ConfigRect(json.markRect);
    this.markCirc = new ConfigCirc(json.markCirc);
  }
}

export class ConfigHouse {
  frame: ConfigRect;
  markPoly: ConfigRect;

  constructor(json: any) {
    this.frame = new ConfigRect(json.frame);
    this.markPoly = new ConfigRect(json.markPoly);
  }
}

export class ConfigText {
  size: number;
  font: string;
  color?: string;
  colors?: string[];

  constructor(json: any) {
    this.size = json.size;
    this.font = json.font;
    this.color = json.color;
    this.colors = json.colors;
  }
}

export class ConfigRect {
  offset: number;
  width: number;
  color?: string;
  colors?: string[];

  constructor(json: any) {
    this.offset = json.offset;
    this.width = json.width;
    this.color = json.color;
    this.colors = json.colors;
  }
}

export class ConfigCirc {
  size: number;
  color?: string;
  colors?: string[];

  constructor(json: any) {
    this.size = json.size;
    this.color = json.color;
    this.colors = json.colors;
  }
}
