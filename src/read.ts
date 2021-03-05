import { ReadHandler, TApiReadRequest } from '../lib/LambdaClasses/AbstractReadOperation'
import { TApiResponse } from '../lib/LambdaClasses/Response.class'
import { Context, Callback } from 'aws-lambda'


export function handler(incomingRequest:TApiReadRequest, context:Context, callback:Callback) {

  class HandlerObject extends ReadHandler {
    protected request:TApiReadRequest
    protected response:TApiResponse


    constructor(incomingRequest:TApiReadRequest, context:Context, callback:Callback) {
      super(incomingRequest, context, callback)
    }


  } // End Handler Class ---------

  new HandlerObject(incomingRequest, context, callback)

} // End Main Handler Function -------
