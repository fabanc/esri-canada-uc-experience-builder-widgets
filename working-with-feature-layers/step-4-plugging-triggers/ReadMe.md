# Description

This exercise builds on the previous one, but adds a twist. We have added a listener that can be plugged to any action that returns a map extent. The widget code has also been modified so that the number of features returned by the widget contains only the feature within the map extent.

# Screenshots

This will give you the option to count only the features that are within map extent by connection the map action called `Extent Change` with the feature count widget.

![Map Actions](https://github.com/fabanc/esri-canada-uc-experience-builder-widgets/blob/master/working-with-feature-layers/images/map-action.PNG)

![Display all features](https://github.com/fabanc/esri-canada-uc-experience-builder-widgets/blob/master/working-with-feature-layers/images/feature-count-ex3.PNG)

# Code Description

## Update the manifest file (Done in step 2)

Update the file manifest.json to notify the other widget in your app that this widget can subscribe to specific triggers.

```javascript
  "messageActions": [
    {
      "name": "query",
      "label": "Query by extent",
      "uri": "runtime/actions/query-action"
    }
  ]
  ```

  This line notify the application that the widget can take queries by extent, and therefore can subscribe to triggers that returns a spatial extent, such as a change in the map extent widget.

  If your widget is already loaded in your app, you may need to unload your widget, and restart your build process.


  ## Update the widget code

  Modify the code that created the query use a spatial extent. Because the query is now dynamic, we're going to have a function that generate it dynamically. We want to make sure that the application also has the extent information in its state.

  ```javascript
  query = () => {
    if (!this.isDsConfigured()) {
      return;
    }
	
    let where = '1=1';
    let outFields =  ['*'];
    let geometry = (this.props.stateProps && this.props.stateProps.EXTENT_CHANGE) ? this.props.stateProps.EXTENT_CHANGE: null
    
    return {
      where: '1=1',
      outFields: outFields,
      geometry: geometry
    }
  }
  ```

Then it just take some small update in our render method to use that query:

```javascript
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
```