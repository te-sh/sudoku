import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { BehaviorSubject } from "rxjs";
import * as _ from "lodash";
import * as fileSaver from "file-saver";
import * as JSZip from "jszip";

import { Board, Ground } from "models/board";
import { Cell } from "models/cell";
import { Result } from "models/result";
import { ModeService } from "services/mode.service";
import { SolversService } from "services/solvers.service";
import { HistoryService } from "services/history.service";

@Injectable()
export class BoardService {
  ground$ = new BehaviorSubject<Ground>(new Ground(0, 0, 0, []));
  cells$ = new BehaviorSubject<Cell[]>([]);
  problems$ = new BehaviorSubject<boolean[]>([]);
  result$ = new BehaviorSubject<Result|undefined>(undefined);

  constructor(
    private http: Http,
    private modeService: ModeService,
    private solversService: SolversService,
    private historyService: HistoryService
  ) {
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

  get result() {
    return this.result$.getValue();
  }

  updateCells(cells: Cell[]) {
    this.cells$.next(cells);
  }

  updateResult(result?: Result) {
    this.result$.next(result);
  }

  init() {
    this.http.get("/board")
      .map(r => r.json())
      .map(r => Board.fromJson(r))
      .subscribe(board => this.setBoard(board));
  }

  clear() {
    let cells = _.cloneDeep(this.cells);
    cells.forEach(cell => cell.setValue(undefined));
    this.cells$.next(cells);

    let problems = _.clone(this.problems);
    _.fill(problems, false);
    this.problems$.next(problems);

    this.result$.next(undefined);
    this.historyService.clear();
    this.solversService.clear();
  }

  setValue(value?: number) {
    let cursor = this.modeService.cursor;

    let cell = _.clone(this.cells[cursor]);
    cell.setValue(value);

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
      .then((content: any) => {
        let blob = new Blob([content], { type: "application/octed-stream" });
        fileSaver.saveAs(blob, fileName);
      });
  }

  upload(file: File) {
    let reader = new FileReader();
    reader.onload = () => {
      let zip = new JSZip();
      zip.loadAsync(reader.result)
        .then((extracted: any) => {
          return extracted.file("board.json").async("string");
        })
        .then((json: any) => {
          let board = Board.fromJson(JSON.parse(json));
          this.setBoard(board);
        });
    };
    reader.readAsBinaryString(file);
  }

  private setBoard(board: Board) {
    this.ground$.next(board.ground);
    this.cells$.next(board.cells);
    this.problems$.next(board.problems);
    this.modeService.setCursor(0);
    this.result$.next(undefined);
    this.historyService.clear();
    this.solversService.clear();
  }
}
