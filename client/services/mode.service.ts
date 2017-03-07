import { BehaviorSubject } from "rxjs";

export class ModeService {
  edit$ = new BehaviorSubject<boolean>(false);
  cursor$ = new BehaviorSubject<number>(0);

  get edit() {
    return this.edit$.getValue();
  }

  get cursor() {
    return this.cursor$.getValue();
  }

  toggleEdit() {
    this.edit$.next(!this.edit);
    this.cursor$.next(this.cursor);
  }

  setCursor(cursor: number) {
    this.cursor$.next(cursor);
  }
}
