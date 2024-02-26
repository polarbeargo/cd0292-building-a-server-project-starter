import {Request, Response, NextFunction} from 'express';

// Create a function to check if filename, height and width are in request and are valid
function validCall(req: Request, res: Response, next: NextFunction) {
  // Check if the filename in the request are not string then return error
  if (typeof req.params.name !== 'string') {
    res.status(400).json({error: 'Invalid Request'});
  }

  // Check if the height and width in the request are not number then return error
  if (
    isNaN(parseInt(req.query.height as string)) ||
    isNaN(parseInt(req.query.width as string))
  ) {
    res.status(400).json({error: 'Invalid Request'});
  }

  // check if the filename, height and width are in the request
  if (req.query.width && req.query.height && req.params.name) {
    next();
  } else {
    res.status(400).json({error: 'Invalid Request'});
  }
}

// export the function
export default validCall;
