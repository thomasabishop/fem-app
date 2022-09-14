# FEM Exercise

![](/screenshot.png)

As explained, I am not a backend developer and do not know C#. Therefore I have tried to approximate a solution using the technologies that I am familiar with. I was unable to find an analogue to the `properties.ini` part of the exercise however I have completed the data grid part.

I have created a backend and a frontend. The backend, created with NodeJS, reads the `event.txt`, as a stream, converts it into CSV and then JSON and exposes this as a RESTful GET endpoint for consumption by the frontend. The frontend is created with React and TypeScript. React is used to display the events data in a table. The data parsing and transformation is managed via the `DataHandler` class. There is also a unit test for this class.

## Running the app

> `npm` is required

```bash
git clone https://github.com/thomasabishop/fem-app.git
cd fem-app
cd backend
npm install
npm start
cd ../frontend
npm install
npm start
```

To run test: `npm run test`
