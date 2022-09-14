import { DataHandler } from "./DataHandler";

const eventsMock = [
  {
    VWTimestamp: "20071105112655222",
    EventCode: "WELD",
    EventType: "Pipeline Weld",
    Easting: "596626.20",
    Northing: "6710096.19",
    KP: "12.49839",
  },
];

describe("DataHandler", () => {
  const constructor = {
    rawData: eventsMock,
  };
  const classInstance = new DataHandler(constructor.rawData);

  describe("parseDate()", () => {
    it("should return locale formatted date from UTC string", () => {
      let result = (classInstance as any).parseDate(eventsMock[0].VWTimestamp);
      expect(result).toBe("11/5/2007 11:26:55");
    });
  });

  describe("transformRowData()", () => {
    it("should return event data with time, Easting, Northing, KP formatted", () => {
      let formatted = [
        {
          VWTimestamp: "11/5/2007 11:26:55",
          EventCode: "WELD",
          EventType: "Pipeline Weld",
          Easting: "596626.20",
          Northing: "6710096.19",
          KP: "12.498",
        },
      ];
      let result = (classInstance as any).transformRowData(eventsMock);
      expect(result).toStrictEqual(formatted);
    });
  });
  describe("extractColumns", () => {
    it("should return JS object of column list from first row of raw data", () => {
      const columns = [
        {
          key: "VWTimestamp",
          name: "DateTime",
        },
        {
          key: "EventCode",
          name: "EventCode",
        },
        {
          key: "EventType",
          name: "EventType",
        },
        {
          key: "Easting",
          name: "Easting",
        },
        {
          key: "Northing",
          name: "Northing",
        },
        {
          key: "KP",
          name: "KP",
        },
      ];
      let result = (classInstance as any).extractColumns(eventsMock[0]);
      expect(result).toStrictEqual(columns);
    });
  });
});
