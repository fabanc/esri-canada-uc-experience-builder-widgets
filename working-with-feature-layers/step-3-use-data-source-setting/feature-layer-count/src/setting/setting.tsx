import {React, FormattedMessage, Immutable, DataSource, DataSourceSchema, FieldSchema} from 'jimu-core';
//import {AllDataSourceTypes, BaseWidgetSetting, AllWidgetSettingProps, DataSourceChooser} from 'jimu-for-builder';
import {BaseWidgetSetting, AllWidgetSettingProps, DataSourceChooser} from 'jimu-for-builder';
import {DataSourceSelector, AllDataSourceTypes} from 'jimu-ui/advanced/data-source-selector';
import {IMConfig} from '../config';
import defaultI18nMessages from './translations/default'

interface State {
  datasource: DataSource;
  fields: { [jimuName: string]: FieldSchema };
}

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<IMConfig> & State> {

  constructor(props){
    super(props);
    this.state = {
      datasource: null,
      fields: {}
    };

  }
  //setDatasource = (ds: DataSource) => {
  //  let schema = ds && ds.getSchema();
  //  this.setState({
  //    datasource: ds,
  //    fields: (schema as DataSourceSchema).fields as { [jimuName: string]: FieldSchema }
  //  });
  //}

  //onDsCreate = ds => {
  //  this.setDatasource(ds)
  //};
  
  onDataSourceChange = (useDataSources: UseDataSource[]) => {
    if(!useDataSources){
      return;
    }

    this.props.onSettingChange({
      id: this.props.id,
      useDataSources: useDataSources
    });
  }


  // Render
  render(){
    return <div className="widget-setting-demo">  
			<DataSourceSelector 
			types={Immutable([AllDataSourceTypes.FeatureLayer])}
            useDataSourcesEnabled={true} /*onToggleUseDataEnabled={this.onToggleUseDataEnabled}*/ mustUseDataSource={true}
            useDataSources={this.props.useDataSources}
            onChange={this.onDataSourceChange}
			widgetId={this.props.id}
          />
    </div>
  }
}