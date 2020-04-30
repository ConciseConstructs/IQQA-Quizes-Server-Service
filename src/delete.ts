import { DeleteHandler } from '../lib/classes/crud/DeleteHandler.class'
import { IDeleteRequest } from '../lib/interfaces/icrud/IDeleteRequest.interface'
import { IResponse } from '../lib/classes/lambdahandler/Response.class'
import { Context, Callback } from 'aws-lambda'


export function handler(incomingRequest:IDeleteRequest, context:Context, callback:Callback) {

  class HandlerObject extends DeleteHandler {
    protected request:IDeleteRequest
    protected response:IResponse


    constructor(incomingRequest:IDeleteRequest, context:Context, callback:Callback) {
      super(incomingRequest, context, callback)
    }

    protected async performActions() {
      await this.getRecordForExamination()
      this.examineLinksForUnlinking()
      Promise.all([
        this.unlinkRecordPromises,
        this.db.delete(this.makeDeleteSyntax()).promise()
      ])
        .then(result => this.onFirstStageComplete(result))
        .catch(error => this.hasFailed(error))
    }




        private onFirstStageComplete(result) {
          this.requestRemoveScheduledJobs()
          this.hasSucceeded(result)
        }




            private requestRemoveScheduledJobs() {
              this.lambda.invoke({
                FunctionName: `Schedule-${ process.env.stage }-remove-boundTo`,
                Payload: JSON.stringify({
                  accountId: this.request.accountId,
                  id: this.request.id
                })
              }).promise()
            }


  } // End Handler Class ---------

  new HandlerObject(incomingRequest, context, callback)

} // End Main Handler Function -------
