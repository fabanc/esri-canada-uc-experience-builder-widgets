# Description

This exercise shows how to to make a widget data source configurable from Experience Builder UI.

# Steps
## Use the out-of-the-box DataSource chooser in file Settings.tsx

```javascript
  render(){
    return <div className="widget-setting-demo">
            <DataSourceChooser
              types={Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.FeatureQuery])}
              selectedDataSourceIds={Immutable((this.props.useDataSources && this.props.useDataSources[0]) ? [this.props.useDataSources[0].dataSourceId] : [])}
              widgetId={this.props.id} mustUseDataSource={true}/>
    </div>
  }
  ```