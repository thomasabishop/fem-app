import moment from "moment";

export class DataHandler {
  public columns: IEventSlice["column"];
  public rows: IEvent<string>[];
  private rawData: IEvent<string>[];

  constructor(rawData: IEvent<string>[]) {
    this.rawData = rawData;
    this.columns = this.extractColumns();
    this.rows = this.transformRowData();
  }

  private parseDate(date: string): string {
    const toUtc = moment(date, "YYYYMMDDHHmmss").format();
    const toJsDate = new Date(toUtc);
    const customFormat =
      [
        toJsDate.getMonth() + 1,
        toJsDate.getDate(),
        toJsDate.getFullYear(),
      ].join("/") +
      " " +
      [toJsDate.getHours(), toJsDate.getMinutes(), toJsDate.getSeconds()].join(
        ":"
      );
    return customFormat;
  }

  private transformRowData(): IEvent<string>[] {
    // NB. This could be done more elegantly with an Array.map + Array.reduce single-line combo
    return this.rawData.map((row) => ({
      VWTimestamp: this.parseDate(row.VWTimestamp),
      EventCode: row.EventCode,
      EventType: row.EventType,
      Easting: parseFloat(row.Easting).toFixed(2),
      Northing: parseFloat(row.Northing).toFixed(2),
      KP: parseFloat(row.KP).toFixed(3),
    }));
  }

  private extractColumns(): IEventSlice["column"] {
    const cols = Object.keys(this.rawData[0]);
    const parsed = cols.map((x) => ({
      key: x,
      name: x === "VWTimestamp" ? "DateTime" : x,
    }));
    return parsed;
  }
}
export interface IEvent<T> {
  [T: string]: T;
}

export interface IEventSlice {
  column: { key: string; name: string }[];
}
