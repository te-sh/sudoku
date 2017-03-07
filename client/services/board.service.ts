import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { BehaviorSubject } from "rxjs";
import * as _ from "lodash";
import * as fileSaver from "file-saver";
import * as JSZip from "jszip";

import { Board, Ground } from "models/board";
import { Cell } from "models/cell";

@Injectable()
export class BoardService {
  ground$ = new BehaviorSubject<Ground>(new Ground(0, 0, 0, []));
  cells$ = new BehaviorSubject<Cell[]>([]);
  problems$ = new BehaviorSubject<boolean[]>([]);

  constructor(private http: Http) {
  }

  get ground() {
    return this.ground$.getValue();
  }

  get cells() {
    return this.cells$.getValue();
  }

  get problems() {
    return this.problems$.getValue();
  }

  init() {
    this.http.get("/board")
      .map(r => r.json())
      .subscribe(r => {
        let board = Board.fromJson(r);
        this.setBoard(board);
      });
  }

  clear() {
    let cells = _.cloneDeep(this.cells);
    cells.forEach(cell => {
      cell.setValue(this.ground.nc, undefined);
    });
    this.cells$.next(cells);

    let problems = _.clone(this.problems);
    _.fill(problems, false);
    this.problems$.next(problems);
  }

  setValue(cursor: number, value?: number) {
    let cell = _.clone(this.cells[cursor]);
    cell.setValue(this.ground.nc, value);

    let cells = _.clone(this.cells);
    cells[cursor] = cell;
    this.cells$.next(cells);

    let problems = _.clone(this.problems);
    problems[cursor] = !_.isUndefined(value);
    this.problems$.next(problems);
  }

  download(fileName: string) {
    let json = JSON.stringify({
      ground: this.ground,
      cells: this.cells.map(cell => cell.toJson()),
      problems: this.problems
    });
    let zip = new JSZip();
    zip.file("board.json", json);
    zip.generateAsync({ type: "blob", compression: "DEFLATE" })
      .then(content => {
        let blob = new Blob([content], { type: "application/octed-stream" });
        fileSaver.saveAs(blob, fileName);
      });
  }

  upload(file: File) {
    let reader = new FileReader();
    reader.onload = () => {
      let zip = new JSZip();
      zip.loadAsync(reader.result)
        .then(extracted => {
          extracted.file("board.json").async("string").then(json => {
            let board = Board.fromJson(JSON.parse(json));
            this.setBoard(board);
          });
        });
    };
    reader.readAsBinaryString(file);
  }

  private setBoard(board: Board) {
    this.ground$.next(board.ground);
    this.cells$.next(board.cells);
    this.problems$.next(board.problems);
  }
}
