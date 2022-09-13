import React from 'react';
import DataGrid from 'react-data-grid';
import axios from 'axios';
import {DataHandler, IEvent} from './DataHandler';

const DataTable: React.FC = () => {
  const [columns, setColumns] = React.useState<any>([]);
  const [rows, setRows] = React.useState<any>([]);

  React.useEffect(() => {
    const fetchEvents = async () => {
      const events = await axios.get('http://localhost:8080/api/events');
      const handler = new DataHandler(events?.data);
      setColumns(handler.extractColumns());
      setRows(events.data);
    };
    fetchEvents();
  }, []);

  return <DataGrid className="rdg-dark fill-grid" columns={columns} rows={rows} />;
};

export default DataTable;
