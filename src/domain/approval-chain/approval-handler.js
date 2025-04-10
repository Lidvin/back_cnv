class ApprovalHandler {
    constructor() {
      this.nextHandler = null;
    }
  
    setNext(handler) {
      this.nextHandler = handler;
      return handler;
    }
  
    async handle(request) {
      if (this.nextHandler) {
        return await this.nextHandler.handle(request);
      }
      return request;
    }
  }
  
  module.exports = ApprovalHandler;