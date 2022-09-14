import React from "react";
import DataGrid from "react-data-grid";
import axios from "axios";
import { DataHandler, IEvent, IEventSlice } from "./DataHandler";

const DataTable: React.FC = () => {
  const [columns, setColumns] = React.useState<IEventSlice["column"]>([]);
  const [rows, setRows] = React.useState<IEvent<string>[]>([]);

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await axios.get("http://localhost:8080/api/events");
        const handler = new DataHandler(events?.data);
        setColumns(handler.columns);
        setRows(handler.rows);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <DataGrid className="rdg-dark fill-grid" columns={columns} rows={rows} />
  );
};

export default DataTable;
