import * as PIXI from "pixi.js";

import { Board } from "models/board";
import { Config } from "models/graph/config";
import { Size } from "models/graph/size";
import { LatticePoint } from "models/graph/lattice_point";
import { GraphCell } from "models/graph/cell";
import { GraphHouse } from "models/graph/house";

export class GraphBoard {
  size: Size;
  stage = new PIXI.Container();

  private board: Board;
  private config = new Config();
  private cells: GraphCell[];
  private houses: GraphHouse[];

  initBoard(board: Board) {
    this.board = board;
    this.size = new Size(this.board, this.config);

    this.stage = new PIXI.Container();

    this.cells = this.board.cells.map(cell => new GraphCell(
      this.config, cell, this.board, this.size
    ));
    this.cells.forEach(cell => this.stage.addChild(cell.container));

    let latticePoints = this.board.cells.map(cell => new LatticePoint(
      cell.index, this.board, this.size
    ));

    this.houses = this.board.houses.map(house => new GraphHouse(
      house, this.config, latticePoints
    ));
    this.houses.forEach(house => this.stage.addChild(house.container));
  }

  update() {
    this.cells.forEach(cell => cell.update());
  }

  setEditMode(editMode: boolean) {
    if (this.cells) {
      this.cells.forEach(cell => cell.setEditMode(editMode));
    }
  }

  setCursor(cursor: number) {
    if (this.cells) {
      this.cells.forEach(cell => cell.setCursor(cursor));
    }
  }
}
