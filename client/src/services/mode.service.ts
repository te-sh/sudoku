import { BehaviorSubject } from "rxjs";

export class ModeService {
  solving$ = new BehaviorSubject<boolean>(false);
  edit$ = new BehaviorSubject<boolean>(false);
  cursor$ = new BehaviorSubject<number>(0);

  get solving() {
    return this.solving$.getValue();
  }

  get edit() {
    return this.edit$.getValue();
  }

  get cursor() {
    return this.cursor$.getValue();
  }

  toggleSolving() {
    this.solving$.next(!this.solving);
  }

  toggleEdit() {
    this.edit$.next(!this.edit);
    this.cursor$.next(this.cursor);
  }

  setCursor(cursor: number) {
    this.cursor$.next(cursor);
  }
}
