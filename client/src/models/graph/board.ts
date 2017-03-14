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
            this.graphCells[cc.index].setCandResult("remove", cc);
          });
        }
        if (result.decideVcs) {
          result.decideVcs.forEach(vc => {
            this.graphCells[vc.index].setCandResult("decide", vc);
          });
        }
        if (result.markCcs1) {
          result.markCcs1.forEach(cc => {
            this.graphCells[cc.index].setCandResult("mark1", cc);
          });
        }
        if (result.markCcs2) {
          result.markCcs2.forEach(cc => {
            this.graphCells[cc.index].setCandResult("mark2", cc);
          });
        }
        if (result.markCells1) {
          result.markCells1.forEach(markCell => {
            this.graphCells[markCell].setResult("mark1");
          });
        }
        if (result.markCells2) {
          result.markCells2.forEach(markCell => {
            this.graphCells[markCell].setResult("mark2");
          });
        }
        if (result.markHouses1) {
          result.markHouses1.forEach(markHouse => {
            this.graphHouses[markHouse].setResult("mark1");
          });
        }
        if (result.markHouses2) {
          result.markHouses2.forEach(markHouse => {
            this.graphHouses[markHouse].setResult("mark2");
          });
        }
      } else {
        this.graphCells.forEach(graphCell => graphCell.removeResult());
        this.graphHouses.forEach(graphHouse => graphHouse.removeResult());
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
