/**
 * This file should be temporary
 * See https://github.com/angular/angular-cli/pull/5194
 */
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';
import * as express from 'express';
import * as compression from 'compression';
import * as https from 'https';
import * as fs from 'fs';
import { ServerAppModuleNgFactory } from './ngfactory/app/server-app.module.ngfactory';
import { ngExpressEngine } from './modules/ng-express-engine/express-engine';
import { ROUTES } from './routes';
import { enableProdMode } from '@angular/core';
enableProdMode();
const app = express();
const port = 4444;

app.engine('html', ngExpressEngine({
  aot: true,
  bootstrap: ServerAppModuleNgFactory
}));

app.set('view engine', 'html');
app.set('views', 'src');

app.use(compression());
app.use('/static', express.static('dist/static', { index: false, maxAge: 1 * 365 * 24 * 60 * 60 * 1000 }));

ROUTES.forEach(route => {
  app.get(route, (req, res) => {
    console.time(`GET: ${req.originalUrl}`);
    res.render('../dist/index', {
      req: req,
      res: res
    });
    console.timeEnd(`GET: ${req.originalUrl}`);
  });
});

// const options = {
//   key: fs.readFileSync('cert/cert.key'),
//   cert: fs.readFileSync('cert/cert.pem')
// };

// https.createServer(options, app).listen(port, ()=>{
//   console.log('https listens on port '+ port)
// });
app.listen(port)
