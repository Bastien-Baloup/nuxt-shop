import { IncomingMessage, ServerResponse } from 'h3'
import helmet from 'helmet'

const runHelmet = helmet();

export default (req: IncomingMessage, res: ServerResponse, next: Function) => {
  runHelmet(req, res, (err: any) => {
    if (err) {
      res.statusCode = 500;
      res.end(
        "Helmet failed for some unexpected reason. Was it configured correctly?"
      );
      return;
    }
    next()
  });
  
}