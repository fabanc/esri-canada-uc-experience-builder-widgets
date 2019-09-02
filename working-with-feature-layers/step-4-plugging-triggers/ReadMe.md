# Steps

## Update the manifest file

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

  Modify the create options to pass use a spatial extent.

  ```javascript
  function createQuery(props: AllWidgetProps<IMConfig>, ds: DataSource, options?: QueryOptions): any{  
    let q = {
        where: '1=1',
        outFields: ['*'],
        returnGeometry: true,
        ...(options || {}) // New element to use the parameter passed using the parameter options.
    } as any;
    
    return q;
  }
  ```

The create a new method to get the queryOptions. This will read the spatial extent from the properties. The extent is an inherited property automatically passed when calling the widget.

```javascript
  getQueryOptions = (): QueryOptions => {
    const options: QueryOptions = {}
    const {config, stateProps} = this.props
    if(stateProps && stateProps.queryExtent){
      options.geometry = stateProps.queryExtent
    }
    return Object.keys(options).length > 0 ? options : undefined
  }
```


Update the renderCount method, so that it includes the additional parameters passed the by component `DataQueryComponent`.

```javascript
  renderCount (ds: DataSource, queryStatus: DataSourceStatus, records: DataRecord[]) {
    let featureCount = 0;
    if(isDsConfigured(this.props)){
      featureCount = records.length
    }
    return <span>{defaultMessages.featuresDisplayed} : {featureCount}</span>
  }
```


Then modify the render function so that it pass a spatial extent as parameters.

```javascript
  render(){
    const {useDataSources} = this.props;
    const {datasource} = this.state;
    const queryOptions: QueryOptions = this.getQueryOptions();
    let query = createQuery(this.props, datasource, queryOptions);
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
```