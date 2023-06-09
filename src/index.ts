import * as express from 'express';
const app = express();
const port:string = process.env.PORT || "3000";
app.use(express.static(__dirname + '/public'));
app.listen(port, () => {
  console.log(`testing listening on port ${port}`)
})