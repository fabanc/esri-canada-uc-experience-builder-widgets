import {AbstractMessageAction, MessageType, Message, getAppStore, appActions, ExtentChangeMessage} from 'jimu-core';

export default class QueryAction extends AbstractMessageAction{
  filterMessageType(messageType: MessageType): boolean{
    return messageType === MessageType.ExtentChange;
  }

  filterMessage(message: Message): boolean{return true; }

  onExecute(message: Message, actionConfig?: any): Promise<boolean> | boolean{
	console.log('Extent Change: ', message.type);
    switch(message.type){
      case MessageType.ExtentChange:
		console.log('Dispatch Change');
        const extent = (message as ExtentChangeMessage).extent;
        getAppStore().dispatch(
          appActions.widgetStatePropChange(this.widgetId, MessageType.ExtentChange, {
          type: extent.type,
          ...extent?.toJSON()
        }));
        break;
    }
    
    return true;
  }
}