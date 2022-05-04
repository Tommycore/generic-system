# Generic System

### Building
Clone the project, run `npm i` to install dependencies and either `npm run build` to build once or `npm run build:watch` to continously build the project.

### Installing
The project gets build to the `build` folder. You can either copy the `build` folder to your `Data/systems` folder and rename it gs, or create a symlink.

### Notes
Throughout the project there are comments in the form of `// NOTE: [...]`. These are areas I commented that I deemed especially interesting and/or confusing.

### What to do once installed
1. Start a new world with the `Generic System`.
1. Create an item.
1. Click the `Add Stat` button on the item sheet.
1. You should see a message in the console telling you that the item validated.
1. Close the item sheet. That should throw an error.
