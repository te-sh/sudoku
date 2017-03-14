const json = require("resources/config.json");

export class ConfigService {
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
