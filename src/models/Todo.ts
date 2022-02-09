export enum TodoStatus {
  WORK,
  COMPLETED,
}

export class Todo {
  static readonly DATE_REGEX =
    /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/; // yyyy-mm-dd
  static readonly TIME_REGEX = /^([01][0-9]|2[0-3]):[0-5][0-9]$/; // hh:mm

  constructor(
    private _id: string,
    private _title: string,
    private _detail: string,
    private _date: string,
    private _time: string,
    private _status: TodoStatus
  ) {
    if (!Todo.DATE_REGEX.test(_date)) {
      this._date = "";
    }
    if (!Todo.TIME_REGEX.test(_time)) {
      this._time = "";
    }
  }

  set id(newID: string) {
    this._id = newID;
  }

  get id() {
    return this._id;
  }

  set title(newTitle: string) {
    this._title = newTitle;
  }

  get title() {
    return this._title;
  }

  set detail(newDetail: string) {
    this._detail = newDetail;
  }

  get detail() {
    return this._detail;
  }

  set date(newDate: string) {
    if (Todo.DATE_REGEX.test(newDate)) {
      this._date = newDate;
    }
  }

  get date() {
    return this._date;
  }

  set time(newTime: string) {
    if (Todo.TIME_REGEX.test(newTime)) {
      this._time = newTime;
    }
  }

  get time() {
    return this._time;
  }

  set status(newStatus: TodoStatus) {
    this._status = newStatus;
  }

  get status() {
    return this._status;
  }

  public clearDate() {
    this._date = "";
  }

  public clearTime() {
    this._time = "";
  }
}
