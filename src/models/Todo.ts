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

  get id(): string {
    return this._id;
  }

  set title(newTitle: string) {
    this._title = newTitle;
  }

  get title(): string {
    return this._title;
  }

  set detail(newDetail: string) {
    this._detail = newDetail;
  }

  get detail(): string {
    return this._detail;
  }

  set date(newDate: string) {
    if (!newDate) {
      this._date = "";
      return;
    }

    if (Todo.DATE_REGEX.test(newDate)) {
      this._date = newDate;
    }
  }

  get date(): string {
    return this._date;
  }

  set time(newTime: string) {
    if (!newTime) {
      this._time = "";
      return;
    }

    if (Todo.TIME_REGEX.test(newTime)) {
      this._time = newTime;
    }
  }

  get time(): string {
    return this._time;
  }

  set status(newStatus: TodoStatus) {
    this._status = newStatus;
  }

  get status(): TodoStatus {
    return this._status;
  }
}
