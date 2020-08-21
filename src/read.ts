import { ReadHandler } from '../lib/classes/CRUDDynamoDBAbstractClasses/ReadHandler.class'
import { IReadRequest } from '../lib/interfaces/ICRUD/IReadRequest.interface'
import { IResponse } from '../lib/classes/lambdahandler/Response.class'
import { Context, Callback } from 'aws-lambda'


export function handler(incomingRequest:IReadRequest, context:Context, callback:Callback) {

  class HandlerObject extends ReadHandler {
    protected request:IReadRequest
    protected response:IResponse


    constructor(incomingRequest:IReadRequest, context:Context, callback:Callback) {
      super(incomingRequest, context, callback)
    }


  } // End Handler Class ---------

  new HandlerObject(incomingRequest, context, callback)

} // End Main Handler Function -------
