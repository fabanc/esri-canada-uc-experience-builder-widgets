import {AbstractMessageAction, MessageType, Message, getAppStore, appActions, ExtentChangeMessage} from 'jimu-core';

export default class QueryAction extends AbstractMessageAction{
  filterMessageType(messageType: MessageType): boolean{
    return messageType === MessageType.ExtentChange;
  }

  filterMessage(message: Message): boolean{return true; }

  onExecute(message: Message, actionConfig?: any): Promise<boolean> | boolean{
    switch(message.type){
      case MessageType.ExtentChange:
        const extent = (message as ExtentChangeMessage).extent;
        getAppStore().dispatch(appActions.widgetStatePropChange(this.widgetId, 'queryExtent', {
          type: extent.type,
          ...(message as ExtentChangeMessage).extent.toJSON()
        }));
        break;
    }
    
    return true;
  }
}