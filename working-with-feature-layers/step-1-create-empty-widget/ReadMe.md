# Description

This widget is a template for starting our own widget. It just initializes a simple widget with a simple property called featureCount initialized to 0. The value of the the property `featureCount` is then displayed at runtime.

# Screenshot

Here is the widget, next to a map widget.

![Widget Starting Point](https://github.com/fabanc/esri-canada-uc-experience-builder-widgets/blob/master/working-with-feature-layers/images/feature-count-ex1.PNG)


# Code Description

1. Like any Experience Builder Widget, this widget inherit the class `BaseWidget`. The base widget, just like any Read Component expect a json object that contains the property of the widget.

2. The property `featureCount` valus is part of the state. This is using the read setState component built-in function. More info on the React website [here](https://reactjs.org/docs/react-component.html  
)

3. There is a render method, just like a react component, that simply renders a `div` element with the default value for `featureCount`. Note the syntax for using javascript variable within JSX.

```typescript
  render(){
    return <div className="widget-demo jimu-widget" style={{overflow: 'auto'}}>
      {defaultMessages.featuresDisplayed} : {this.state.featureCount}
    </div>;
  }
```