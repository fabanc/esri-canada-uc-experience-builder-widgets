import {React, FormattedMessage, Immutable, DataSource, DataSourceSchema, FieldSchema} from 'jimu-core';
import {AllDataSourceTypes, BaseWidgetSetting, AllWidgetSettingProps, DataSourceChooser} from 'jimu-for-builder';
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
  setDatasource = (ds: DataSource) => {
    let schema = ds && ds.getSchema();
    this.setState({
      datasource: ds,
      fields: (schema as DataSourceSchema).fields as { [jimuName: string]: FieldSchema }
    });
  }

  onDsCreate = ds => {
    this.setDatasource(ds)
  };



  render(){
    return <div className="widget-setting-demo">
            <DataSourceChooser
              types={Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.FeatureQuery])}
              selectedDataSourceIds={Immutable((this.props.useDataSources && this.props.useDataSources[0]) ? [this.props.useDataSources[0].dataSourceId] : [])}
              widgetId={this.props.id} mustUseDataSource={true}/>
    </div>
  }
}