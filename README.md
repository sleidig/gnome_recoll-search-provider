*Sample Search Provider* provides an outline and example of a GNOME Shell Extension 
to you to integrate custom search providers in GNOME Shell (i.e. the default overlay in GNOME based linux systems).

This project can serve as a tutorial as well as a base project for your custom search providers.



# Build your custom Search Provider Extension

To adapt the project for your needs the following steps are necessary:

## Adapt the basic configuration
This code can also be used to built your own search provider extension for other services:

1. edit "metadata.json": change the relevant information. Note that your folder name must be the same as the `uuid` in your metadata.json
2. edit "extension.js": change the constants under `/** APP CONFIG **/` as needed:
- `APP_NAME`: name that is displayed for your app in the GNOME Shell
- `ICON_NAME`: filename (without filetype extension) of the icon in the "icons" subfolder of your extension
- `SEARCH_TERMS_FILTER`: [`(searchTerms: string[]) => boolean`] function to return true whenever your extension should provide search results based on the search terms entered. (Example: `SEARCH_TERMS_FILTER = (terms => { return (terms[0].substring(0, 2) === 'd:'`)
- `SEARCH_CLIENT`: Import of a script that provides a search api. Must implement a factory method `getSearchClient()`.

## Change settings schema
1. Update the settings schema in xml format in the subfolder "schemas"
2. run `glib-compile-schemas ./schemas` to compile a binary version of your settings

## Implement your search client (retrieving the search results)
1. Copy "search_client_sample.js" to get started and adapt it to conduct the type of search you want.
2. Functions prefixed with `_` (e.g. `_buildQueryUrl()`) are considered private, feel free to change their names or remove them.
3. If you want to use your "search client" implementation without changing the "extension.js" code, your "search client" 
needs to implement at least `function getSearchClient()` to return an object that has the methods `get(searchterm, callback)` and `destroy()`. 
For details see the commented "search_client_sample.js".



# Tipps for development
- To see changes in the code you have to restart GNOME Shell - either press `Alt`+`F2` and type `r` or run `gnome-shell --replace` in a terminal.
- Enable your extension through GNOME Tweak Tool.
- [Looking Glass](https://wiki.gnome.org/Projects/GnomeShell/LookingGlass) helps with debugging and shows the errors in your extension. Simply press `Alt`+`F2` and type `lg` in the command prompt.



# Documentation about GNOME Shell Extensions & search providers
- [Basics of creating an Extension (gnome.org wiki)](https://wiki.gnome.org/Projects/GnomeShell/Extensions)
- [Using GSettings, the settings schema xml file](https://developer.gnome.org/GSettings/)
- [Gnome shell extensions: Getting started writing your own](http://mathematicalcoffee.blogspot.com/2012/09/gnome-shell-extensions-getting-started.html), a fairly good introductory blog post
- [http://smasue.github.io/gnome-shell-tw](http://smasue.github.io/gnome-shell-tw), another, more recent tutorial post