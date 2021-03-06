import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';
import * as express from 'express';
import { ServerAppModule } from './app/server-app.module';
import { ngExpressEngine } from './modules/ng-express-engine/express-engine';
import { ROUTES } from './routes';
import { enableProdMode } from '@angular/core';
enableProdMode();
const app = express();
const port = 8000;
const baseUrl = `http://localhost:${port}`;

app.engine('html', ngExpressEngine({
  bootstrap: ServerAppModule
}));

app.set('view engine', 'html');
app.set('views', 'src');

app.use('/static', express.static('dist/static', {index: false}));

  app.get('**', (req, res) => {
    console.time(`GET: ${req.originalUrl}`);
    res.render('../dist/index', {
      req: req,
      res: res
    });
    console.timeEnd(`GET: ${req.originalUrl}`);
  });

app.listen(8000,() => {
	console.log(`Listening at ${baseUrl}`);
});
