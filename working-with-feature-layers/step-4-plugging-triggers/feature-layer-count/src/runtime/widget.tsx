/** @jsx jsx */
import {IMState, BaseWidget, classNames, FormattedMessage, defaultMessages as jimuCoreDefaultMessage, 
  LayoutInfo, IMAppConfig, AppMode, BrowserSizeMode, DataSourceComponent} from 'jimu-core';
import {AllWidgetProps, css, jsx, styled} from 'jimu-core';
import {DataRecord, DataSource, DataSourceTypes, FeatureQueryDataSource} from 'jimu-core';
import {IMConfig} from '../config';
import {FeatureLayerDataSource, FeatureLayerViewDataSource } from 'jimu-arcgis/arcgis-data-source';
import defaultMessages from './translations/default';

interface Props{
  selection: LayoutInfo,
  appConfig: IMAppConfig,
  appMode: AppMode,
  draggingWidget: any,
  browserSizeMode: BrowserSizeMode,
  currentPageId: string
}

interface States {
  datasource: FeatureLayerDataSource | FeatureQueryDataSource | FeatureLayerViewDataSource
}

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig> & Props, States>{

  isDsConfigured = () => {
    if (this.props.useDataSources &&
      this.props.useDataSources.length === 1) {
      return true;
    }
    return false;
  }
  
  query = () => {
    if (!this.isDsConfigured()) {
      return;
    }

    let geometry = (this.props.stateProps && this.props.stateProps.EXTENT_CHANGE) ? this.props.stateProps.EXTENT_CHANGE: null;

    return {
      where: '1=1',
      outFields: ['*'],
      geometry: geometry
    }

  }

  constructor(props){
    super(props);

    let stateObj: States = {
		  datasource: undefined
    };

    this.state = stateObj;
  }

  render(){

    const {useDataSources, stateProps} = this.props;
    const {datasource} = this.state;
	  let query = this.query();
    return <div className="widget-demo jimu-widget" style={{overflow: 'auto'}}>
      {
        <DataSourceComponent query={query} widgetId={this.props.id} useDataSource={useDataSources[0]} onDataSourceCreated={this.onDs}>
        {this.renderCount.bind(this)}
        </DataSourceComponent>
      }
    </div>;
	
  }

  renderCount (ds: DataSource, queryStatus: DataSourceStatus, records:DataRecord[], toto:any) {
    let featureCount = 0;
    if(this.isDsConfigured()){
		  featureCount = ds.getRecords().length;
    }
    return <span>{defaultMessages.featuresDisplayed} : {featureCount}</span>
  }

  onDs = (ds) => {
    this.setState({
      datasource: ds
    })
  }
}
