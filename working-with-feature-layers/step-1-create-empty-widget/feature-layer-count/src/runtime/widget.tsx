/** @jsx jsx */
import {BaseWidget} from 'jimu-core';
import {AllWidgetProps, jsx} from 'jimu-core';
import {IMConfig} from '../config';
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
