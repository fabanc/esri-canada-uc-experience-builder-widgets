/** @jsx jsx */
import {IMState, BaseWidget, classNames, FormattedMessage, defaultMessages as jimuCoreDefaultMessage, 
  LayoutInfo, IMAppConfig, AppMode, BrowserSizeMode, DataSourceComponent, DataQueryComponent, DataSourceStatus} from 'jimu-core';
import {AllWidgetProps, css, jsx, styled} from 'jimu-core';
import {DataRecord, DataSource, DataSourceTypes, FeatureQueryDataSource} from 'jimu-core';
import {IMConfig} from '../config';
import {ArcGISDataSourceTypes} from 'jimu-arcgis/arcgis-data-source-type';
import {FeatureLayerDataSource, FeatureLayerViewDataSource } from 'jimu-arcgis/arcgis-data-source';

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

interface QueryOptions {
  geometry?: any,
  sortField?: string,
  sortOrder?: string, 
  orderByFields?: string | string[],
  start?: number, 
  num?: number
}

interface States {
  datasource: FeatureLayerDataSource | FeatureQueryDataSource | FeatureLayerViewDataSource;
}

function createQuery(props: AllWidgetProps<IMConfig>, ds: DataSource, options?: QueryOptions): any{  
  let q = {
    where: '1=1',
    outFields: ['*'],
    returnGeometry: true,
    ...(options || {})
  } as any;
  
  return q;
}

function loadRecords(props: AllWidgetProps<IMConfig>, ds: DataSource): Promise<DataRecord[]>{
  if(!ds)return Promise.resolve([]);

  let q = createQuery(props, ds);

  console.log("Query: ", q);

  if(ds.type === ArcGISDataSourceTypes.FeatureLayer){
    console.log("Feature Layer ...");
    return (ds as FeatureLayerDataSource).load(q);
  }else if(ds.type === DataSourceTypes.FeatureQuery){
    console.log("Feature Query Data Source ...");
    return (ds as FeatureQueryDataSource).load(q);
  }
}

function isDsConfigured(props: AllWidgetProps<IMConfig>): boolean{
  return props.useDataSourcesEnabled && props.useDataSources && !!props.useDataSources[0];
}


export default class Widget extends BaseWidget<AllWidgetProps<IMConfig> & Props, States>{

  static preloadData = (state: IMState, allProps: AllWidgetProps<IMConfig> & Props, dataSources: {[dsId: string]: DataSource}): Promise<any> => {
    if(!isDsConfigured(allProps)){
      return Promise.resolve([]);
    }

    return loadRecords(allProps, dataSources[allProps.useDataSources[0].dataSourceId]).then(records => {
      return []
    });
  };

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
    const queryOptions: QueryOptions = this.getQueryOptions();
    let query = createQuery(this.props, datasource, queryOptions);
    console.log("Geometry: ", query.geometry);

    return <div className="widget-demo jimu-widget" style={{overflow: 'auto'}}>
      {        

        <DataQueryComponent 
        query={query} 
        useDataSource={useDataSources && useDataSources[0]}
        onDataSourceCreated={this.onDs}
        >
          {this.renderCount}
        </DataQueryComponent>
      }
    </div>;
  }

  renderCount (ds: DataSource, queryStatus: DataSourceStatus, records: DataRecord[]) {
    let featureCount = 0;
    // if(isDsConfigured(this.props)){
      featureCount = records.length
    // }

    // console.log("Data Source: DataQueryComponent");
    return <span>{defaultMessages.featuresDisplayed} : {featureCount}</span>
  }

  onDs = (ds) => {
    this.setState({
      datasource: ds
    })
  }

  getQueryOptions = (): QueryOptions => {
    const options: QueryOptions = {}
    const {config, stateProps} = this.props
    if(stateProps && stateProps.queryExtent){
      options.geometry = stateProps.queryExtent
    }
    return Object.keys(options).length > 0 ? options : undefined
  }
}
