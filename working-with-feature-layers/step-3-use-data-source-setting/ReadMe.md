# Description

This exercise shows how to plug your widget with a feature layer data source. This time, we will be counting the numbers of features from a feature layer. The widget will return the total numbers of records returned with the feature layer, regardless of what is displayed in the current map extent.

# Screenshots

![Display all features](https://github.com/fabanc/esri-canada-uc-experience-builder-widgets/blob/master/working-with-feature-layers/images/feature-count-ex3.PNG)

# Code Description
## Render the number of object in the feature layer.
### Update the render method to add a data source component

The first thing to do is to import a react component: `import {DataSourceComponent} from 'jimu-core';`

Having a look at the documentation, we can see that this component is a ReactCompoment:  http://localhost/experience-builder/api-reference/jimu-core/DataSourceComponent 

We're delegating the rendering into two different method. 

 - `render` is in charge of calling the data source component with the appropriate query.
 - `renderCount` is in charge of printing the results returned by the query.

 Because for now, the query is unrelate to the extent of the map, the query will always return the same number of features.

 ```javascript

  render(){
    const {useDataSources} = this.props;
    const {datasource} = this.state;
	console.log("State: ", this.state);
    return <div className="widget-demo jimu-widget" style={{overflow: 'auto'}}>
      {
        
        <DataSourceComponent 
        query={this.state.query}
		widgetId={this.props.id}
        useDataSource={useDataSources && useDataSources[0]}
        onDataSourceCreated={this.onDs}
        >
        {this.renderCount.bind(this)}
        </DataSourceComponent>
      }
    </div>;
	
  }

  renderCount (ds: DataSource, queryStatus: DataSourceStatus, records:DataRecord[]) {
    let featureCount = 0;
    if(isDsConfigured(this.props)){
      featureCount = ds.getRecords().length
    }
    return <span>{defaultMessages.featuresDisplayed} : {featureCount}</span>
  }
  }
  ```

### Creating a query

  The code relies on a query that will be refined when counting the features only during the current map extent.
  ```javascript
  componentDidMount(){
    const q = new Query({
      where: '1 = 1',
      outFields: ['*'],
      returnGeometry: true
    })
    this.setState({query: q})
  }
}
  ```

In order for the widget to work, we need to import the load the data in the widget. From the documentation on SSR (Server Side Rendering):


