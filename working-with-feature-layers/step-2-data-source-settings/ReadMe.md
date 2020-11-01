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
			<DataSourceSelector 
			      types={Immutable([AllDataSourceTypes.FeatureLayer])}
            useDataSourcesEnabled={true} /*onToggleUseDataEnabled={this.onToggleUseDataEnabled}*/ mustUseDataSource={true}
            useDataSources={this.props.useDataSources}
            onChange={this.onDataSourceChange}
			      widgetId={this.props.id}
          />
    </div>
  }
  ```


