import * as PIXI from "pixi.js";
import * as _ from "lodash";

import { Board } from "models/board";
import { Config } from "models/graph/config";
import { Size } from "models/graph/size";
import { LatticePoint } from "models/graph/lattice_point";
import { GraphCell } from "models/graph/cell";
import { GraphHouse } from "models/graph/house";

export class GraphBoard {
  size: Size;
  stage: PIXI.Container;

  private board: Board;
  private config: Config;
  private cells: GraphCell[];
  private houses: GraphHouse[];

  constructor() {
    this.config = new Config();
    this.stage = new PIXI.Container();
  }

  initBoard(board: Board) {
    this.board = board;
    this.size = new Size(this.board, this.config);

    this.cells = _.map(this.board.cells, cell => new GraphCell(
      this.board, cell, this.config, this.size
    ));
    this.cells.forEach(cell => this.stage.addChild(cell.container));

    let latticePoints = _.map(this.board.cells, cell => new LatticePoint(
      cell.index, this.board, this.size
    ));

    this.houses = _.map(this.board.houses, house => new GraphHouse(
      this.board, house, this.config, latticePoints
    ));
    this.houses.forEach(house => this.stage.addChild(house.container));
  }
}
