/** @jsx jsx */
import {IMState, BaseWidget, classNames, FormattedMessage, defaultMessages as jimuCoreDefaultMessage, 
  LayoutInfo, IMAppConfig, AppMode, BrowserSizeMode, DataSourceComponent} from 'jimu-core';
import {AllWidgetProps, css, jsx, styled} from 'jimu-core';
import {DataRecord, DataSource, DataSourceTypes, FeatureQueryDataSource} from 'jimu-core';
import {IMConfig} from '../config';
import {ArcGISDataSourceTypes} from 'jimu-arcgis';
import {FeatureLayerDataSource, FeatureLayerViewDataSource } from 'jimu-arcgis/arcgis-data-source';
import Query = require('esri/tasks/support/Query');

import { TabContent, TabPane, Nav, NavItem, NavLink, Button} from 'jimu-ui';
import defaultMessages from './translations/default';

interface Props{
  selection: LayoutInfo,
  appConfig: IMAppConfig,
  appMode: AppMode,
  draggingWidget: any,
  browserSizeMode: BrowserSizeMode,
  currentPageId: string,
}

interface States {
  datasource: FeatureLayerDataSource | FeatureQueryDataSource | FeatureLayerViewDataSource;
}

function isDsConfigured(props: AllWidgetProps<IMConfig>): boolean{
  return props.useDataSources && !!props.useDataSources[0];
}

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig> & Props, States>{

  componentDidMount(){
    const q = new Query({
      where: '1 = 1',
      outFields: ['*'],
      returnGeometry: true
    })
    this.setState({query: q})
  }

  constructor(props){
    super(props);

    let stateObj: States = {
      datasource: undefined, 
    };

    this.state = stateObj;
  }

  render(){
    const {useDataSources} = this.props;
    const {datasource} = this.state;
	console.log("State: ", this.state);
    return <div className="widget-demo jimu-widget" style={{overflow: 'auto'}}>
      {
        
        <DataSourceComponent 
        query={this.state.query}
		widgetId={this.props.id}
        useDataSource={useDataSources && useDataSources[0]}
        onDataSourceCreated={this.onDs}
        >
        {this.renderCount.bind(this)}
        </DataSourceComponent>
      }
    </div>;
	
  }

  renderCount (ds: DataSource, queryStatus: DataSourceStatus, records:DataRecord[]) {
    let featureCount = 0;
    if(isDsConfigured(this.props)){
      featureCount = ds.getRecords().length
    }
    return <span>{defaultMessages.featuresDisplayed} : {featureCount}</span>
  }

  onDs = (ds) => {
    this.setState({
      datasource: ds
    })
  }
}
