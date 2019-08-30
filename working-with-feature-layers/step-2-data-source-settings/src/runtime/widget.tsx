/** @jsx jsx */
import {BaseWidget, classNames, FormattedMessage, defaultMessages as jimuCoreDefaultMessage} from 'jimu-core';
import {AllWidgetProps, css, jsx, styled} from 'jimu-core';
import {IMConfig} from '../config';

import { TabContent, TabPane, Nav, NavItem, NavLink, Button} from 'jimu-ui';
import defaultMessages from './translations/default';

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, any>{
  constructor(props){
    super(props);

    this.state = {
      featureCount: 0
    };
  }

  render(){

    return <div className="widget-demo jimu-widget" style={{overflow: 'auto'}}>
      {defaultMessages.featuresDisplayed} : {this.state.featureCount}
    </div>;
  }
}
