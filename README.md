# Experience Builder: Custom Widget Tutorial

This a set of examples used at our Esri Canada User Conferences about developing widget with Experience Builder.

## Working with feature layers

This folder contains 4 exercises that walk you from:
 - 1 Starting an empty widget
 - 2 Adding a configuration item to set a data source
 - 3 Reference a data source
 - 4 Connect the widget with a trigger, and modify its content based on the current extent.
 
## Useful tips:

### Existing code: 

When you download Experience builder, get inspired :
 
  - the samples that already exists: `@ExperienceBuilderLocation\client\dist\widgets\samples`
  - the widgets that already exists: `@ExperienceBuilderLocation\client\dist\widgets\common`
  - the tutorials: `https://developers.arcgis.com/labs/browse/?product=experience-builder&topic=any`
  - the demos: `https://developers.arcgis.com/experience-builder/sample-code/widgets/demo/`
  
### Tests

Exprience Builder lets you define unit tests for each widget. Simply run the command `npm test` in the directory `client` to run all you unit tests.

![GitHub Logo](https://github.com/fabanc/esri-canada-uc-experience-builder-widgets/blob/master/working-with-feature-layers/images/npm-test.png)

Each widget should have its own folder called `tests`. Check out the tests unit that comes with Experience Builder at the path `client\your-extensions\widgets\simple\tests`

![GitHub Logo](https://github.com/fabanc/esri-canada-uc-experience-builder-widgets/blob/master/working-with-feature-layers/images/npm-test-2.png)

### Use your own repo

Experience Builder comes with its own folder to create your own widget, named “your-extensions”. Any new widget you create has to go there according to the documentation. But if you want create your own repository of custom widgets, or themes, and add it into your favorite source control system (GitHub, Bitbucket, Azure DevOps), you can make a copy of this default folder, name it to your liking, and upload to your GitHub, or whatever you’re using. This way, you can share your work with other Experience Builder users, teammates, and you will never lose it.

In the screenshot below, I have made a copy of the default folder `your-extensions` named `fabien-widget-repo`

![GitHub Logo](working-with-feature-layers\images\custom-repo-1.png)
  
 It is important you keep the file `manifest.json`. This is what Webpack check to determine if this folder contains cutom widget / themes or not.

![GitHub Logo](working-with-feature-layers\images\custom-repo-2.png)