# Description

This exercise shows how to plug your widget with a feature layer data source. This time, we will be counting the numbers of features from a feature layer. The widget will return the total numbers of records returned with the feature layer.

# Steps
## Render the number of object in the feature layer.
### Update the render method to add a data source component

The first thing to do is to import a react component: `import {DataQueryComponent} from 'jimu-core';`

Having a look at the definition, we can see that this component is a ReactCompoment:  `DataQueryComponent: React.ComponentClass<DataSourceComponentProps, any>`

 ```javascript
  render(){
    const {useDataSources} = this.props;
    const {datasource} = this.state;
    return <div className="widget-demo jimu-widget" style={{overflow: 'auto'}}>
      {
        
        <DataSourceComponent 
        defaultQuery={createQuery(this.props, datasource)} 
        useDataSource={useDataSources && useDataSources[0]}
        onDataSourceCreated={this.onDs}
        >
          {this.renderCount.bind(this)}
        </DataSourceComponent>
      }
    </div>;
  }
  ```

### Creating a query
  The code relies on a query that will be refined when counting the features only during the current map extent.
  ```javascript
  function createQuery(props: AllWidgetProps<IMConfig>, ds: DataSource, options?: QueryOptions): any{  
  let q = {
    where: '1=1',
    outFields: ['*'],
    returnGeometry: true
  } as any;
  
   return q;
}
  ```

In order for the widget to work, we need to import the load the data in the widget. From the documentation on SSR (Server Side Rendering):

## Loading Data
From the documentation: 
> It's difficult for a widget to render async data. To make it easy, you can define a static method preloadData in your widget. In this method, you can fetch data and then return the desired props, which will be injected to your widget's this.props.`

In our code that translated into the following:

```javascript
  static preloadData = (state: IMState, allProps: AllWidgetProps<IMConfig> & Props, dataSources: {[dsId: string]: DataSource}): Promise<any> => {
    if(!isDsConfigured(allProps)){
      return Promise.resolve([]);
    }

    return loadRecords(allProps, dataSources[allProps.useDataSources[0].dataSourceId]).then(records => {
      return []
    });
  };
```

This relies on an external function:
```javascript
function loadRecords(props: AllWidgetProps<IMConfig>, ds: DataSource): Promise<DataRecord[]>{
  if(!ds)return Promise.resolve([]);

  let q = createQuery(props, ds);

  if(ds.type === ArcGISDataSourceTypes.FeatureLayer){
    return (ds as FeatureLayerDataSource).load(q);
  }else if(ds.type === DataSourceTypes.FeatureQuery){
    return (ds as FeatureQueryDataSource).load(q);
  }
}
```

