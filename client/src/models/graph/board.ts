import * as PIXI from "pixi.js";
import * as _ from "lodash";

import { Ground } from "models/board";
import { Cell } from "models/cell";
import { Result } from "models/result";
import { Config } from "models/graph/config";
import { Size } from "models/graph/size";
import { LatticePoint } from "models/graph/lattice_point";
import { GraphCell } from "models/graph/cell";
import { GraphHouse } from "models/graph/house";

export class GraphBoard {
  size: Size;
  stage = new PIXI.Container();

  private ground: Ground;
  private config = new Config();
  private graphCells: GraphCell[];
  private graphHouses: GraphHouse[];

  initGround(ground: Ground) {
    let cells = ground.rows * ground.cols;

    this.ground = ground;
    this.size = new Size(this.ground, this.config);

    this.stage = new PIXI.Container();

    this.graphCells = _.times(cells, index => new GraphCell(
      this.config, index, this.ground, this.size
    ));
    this.graphCells.forEach(graphCell => this.stage.addChild(graphCell.container));

    let latticePoints = _.times(cells, index => new LatticePoint(
      index, ground, this.size
    ));

    this.graphHouses = this.ground.houses.map(house => new GraphHouse(
      house, this.config, latticePoints
    ));
    this.graphHouses.forEach(graphHouse => this.stage.addChild(graphHouse.container));
  }

  updateCells(cells: Cell[]) {
    if (this.graphCells) {
      this.graphCells.forEach((graphCell, index) => graphCell.update(cells[index]));
    }
  }

  updateProblems(problems: boolean[]) {
    if (this.graphCells) {
      this.graphCells.forEach((graphCell, index) => graphCell.updateProblem(problems[index]));
    }
  }

  updateResult(result?: Result) {
    if (this.graphCells) {
      if (result) {
        if (result.removeCcs) {
          result.removeCcs.forEach(cc => {
            this.graphCells[cc.index].updateCandResult("remove", cc);
          });
        }
        if (result.decideVcs) {
          result.decideVcs.forEach(vc => {
            this.graphCells[vc.index].updateCandResult("decide", vc);
          });
        }
      } else {
        this.graphCells.forEach(graphCell => graphCell.removeResult());
      }
    }
  }

  setEditMode(editMode: boolean) {
    if (this.graphCells) {
      this.graphCells.forEach(graphCell => graphCell.setEditMode(editMode));
    }
  }

  setCursor(cursor: number) {
    if (this.graphCells) {
      this.graphCells.forEach(graphCell => graphCell.setCursor(cursor));
    }
  }
}