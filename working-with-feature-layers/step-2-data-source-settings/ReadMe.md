# Description

This exercise shows how to to make a widget data source configurable from Experience Builder UI.

# Screenshot

The updated configuration item will add the following in the configuration page when your widget is loaded.

  ![Data Source Settings](https://github.com/fabanc/esri-canada-uc-experience-builder-widgets/blob/master/working-with-feature-layers/images/add-data.PNG)


# Code Description

We are leveraging the out-of-the-box DataSource chooser in the file `Settings.tsx`

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


