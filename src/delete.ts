import { DeleteHandler, TApiDeleteRequest } from '../lib/LambdaClasses/AbstractDeleteOperation'
import { TApiResponse } from '../lib/LambdaClasses/Response.class'
import { Context, Callback } from 'aws-lambda'


export function handler(incomingRequest:TApiDeleteRequest, context:Context, callback:Callback) {

  class HandlerObject extends DeleteHandler {
    protected request:TApiDeleteRequest
    protected response:TApiResponse


    constructor(incomingRequest:TApiDeleteRequest, context:Context, callback:Callback) {
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
