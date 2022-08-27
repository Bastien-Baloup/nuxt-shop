import { IncomingMessage, ServerResponse } from 'h3'
import xss from 'xss-clean'


const runXss = xss();

export default (req: IncomingMessage, res: ServerResponse, next: Function) => {
  runXss(req, res, (err: any) => {
    if (err) {
      res.statusCode = 500;
      res.end(
        "Xss-clean failed for some unexpected reason."
      );
      return;
    }
    next()
  });
  
}