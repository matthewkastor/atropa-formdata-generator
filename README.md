#atropa-formdata-generator

Generates a function to produce FormData objects based on a given HTML form.

## Where do I get it?

You can download it from github at 
[https://github.com/matthewkastor/atropa-formdata-generator]
(https://github.com/matthewkastor/atropa-formdata-generator) 
or, if you have node installed you can get it from npm

`npm install atropa-formdata-generator`

## Usage

### In Browser

Using this module in your browser is as simple as including it in your page. 
See [example.html]
(http://matthewkastor.github.io/atropa-formdata-generator/example.html)
 in the root directory of this package.

```
// include atropa-formdata-generator.js in your page.
// generate a function that accepts a single options object.
var takesOptions = formdataGenerator(
    document.forms[0], // the form to process
    'myFormDataFunction', // the name for your generated function
    true // whether to use a single options arg, or to use many named args.
);

// generate a function that takes named parameters.
var takesNames = formdataGenerator(
    document.forms[0],
    'myFormDataFunction'
);

console.log(takesOptions);
```

## Docs

Documentation is in the [docs/jsdoc](http://matthewkastor.github.io/atropa-formdata-generator/docs/jsdoc/symbols/_global_.html) folder.
Visual Studio intellisense files are in [docs/vsdocs](https://github.com/matthewkastor/atropa-formdata-generator/blob/gh-pages/docs/vsdoc/OpenLayersAll.js)

## Tests

Run the tests in your browser by opening [atropa-formdata-generator tester.html](http://matthewkastor.github.io/atropa-formdata-generator/atropa-formdata-generator%20tester.html).