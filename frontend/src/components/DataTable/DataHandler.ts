export class DataHandler {
  private rawData: any[];
  constructor(rawData: any) {
    this.rawData = rawData;
  }

  public extractColumns() {
    const cols = Object.keys(this.rawData[0]);
    const parsed = cols.map((x) => ({
      key: x,
      name: x,
    }));
    return parsed;
  }

  //   public extractRows() {
  //     const rows: {}[] = []
  //     for (const [i, event] of this.rawData) {
  //         rows.push({
  //             id: i,
  //             title: event
  //         })

  //     }
  //   }
}

export interface IEvent {
  Easting: number;
  EventCode: string;
  EventType: string;
  KP: number;
  Northing: number;
  VWTimestamp: number;
}
