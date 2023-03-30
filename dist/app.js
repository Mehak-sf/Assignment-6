import express from "express";
const app = express();
import route from "./src/route.js";
app.use(express.static('./dist/public'));

app.use(express.json());
app.use('/', route);
export const myURL = `http://localhost:2500`;
app.listen(2500, () => {
    console.log(`Listening on port 2500`);
});
