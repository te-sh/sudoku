const json = require("resources/config.json");

export class Config {
  cell: ConfigCell;
  cand: ConfigCand;
  house: ConfigHouse;

  constructor() {
    this.cell = new ConfigCell();
    this.cand = new ConfigCand();
    this.house = new ConfigHouse();
  }
}

export class ConfigCell {
  padding: number;
  text: ConfigText;
  frame: ConfigRect;
  markRect: ConfigRect;
  cursor: ConfigRect;

  constructor() {
    let js = json.cell;
    this.padding = js.padding;
    this.text = new ConfigText(js.text);
    this.frame = new ConfigRect(js.frame);
    this.markRect = new ConfigRect(js.markRect);
    this.cursor = new ConfigRect(js.markRect);
  }
}

export class ConfigCand {
  size: number;
  padding: number;
  text: ConfigText;
  frame: ConfigRect;
  markRect: ConfigRect;
  markCirc: ConfigCirc;

  constructor() {
    let js = json.cand;
    this.padding = js.padding;
    this.text = new ConfigText(js.text);
    this.frame = new ConfigRect(js.frame);
    this.markRect = new ConfigRect(js.markRect);
    this.markCirc = new ConfigCirc(js.markCirc);
  }
}

export class ConfigHouse {
  frame: ConfigRect;
  markPoly: ConfigRect;

  constructor() {
    let js = json.house;
    this.frame = new ConfigRect(js.frame);
    this.markPoly = new ConfigRect(js.markPoly);
  }
}

class ConfigColor {
  color?: number;
  colors?: number[];
  
  constructor(json: any) {
    if (json.color) {
      this.color = parseInt(json.color, 16);
    }
    if (json.colors) {
      this.colors = json.colors.map((color: string) => parseInt(color, 16));
    }
  }
}

export class ConfigText extends ConfigColor {
  size: number;
  font: string;

  constructor(json: any) {
    super(json);
    this.size = json.size;
    this.font = json.font;
  }
}

export class ConfigRect extends ConfigColor {
  offset: number;
  width: number;

  constructor(json: any) {
    super(json);
    this.offset = json.offset;
    this.width = json.width;
  }
}

export class ConfigCirc extends ConfigColor {
  size: number;

  constructor(json: any) {
    super(json);
    this.size = json.size;
  }
}
