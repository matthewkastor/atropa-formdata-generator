/*jslint
    white: true,
    vars: true,
    plusplus: true
*/
/*globals
    HTMLDocument,
    HTMLFormElement,
    document,
    module
*/

/**
 * @fileOverview atropa-formdata-generator: generates a function to produce
 *  FormData objects based on a given HTML form.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 */

/**
 * A function generator that takes an HTML form and writes an equivalent
 *  function which will produce a formData object. The function can be generated
 *  to accept multiple parameters or a single options object.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {HTMLFormElement} form A DOM reference to a form.
 * @param {String} funcName Optional. The name you want to give your generated
 *  function. Defaults to <code>prettyPinkBike</code>
 * @param {Boolean} useOptionsObj Optional. Set to true if you want the
 *  generated function to accept a single options object instead of multiple
 *  parameters.
 * @param {String} tab Optional. The string specified here will be used as tabs.
 *  Defaults to four spaces.
 * @param {String} eol Optional. The string specified here will be used as the
 *  end of line character. Defaults to <code>\r\n</code>.
 * @returns {String} Returns a JavaScript function as a string. This function
 *  will accept parameters representing the data which would be entered into the
 *  form elements, and will return a FormData object.
 */
function formdataGenerator (
    form, funcName, useOptionsObj, tab, eol
) {
    "use strict";
    if(!(form instanceof HTMLFormElement)) {
        throw new TypeError('form must be an HTMLFormElement');
    }
    var defaultsQueue = [];
    // easier to look at vars than quotes and punctuation.
    var c = ',';
    var q = "'";
    var sp = ' ';
    var sc = ';';
    // configurable for the whiny sorts.
    tab = tab || '    ';
    eol = eol || '\r\n';
    // why do they insist on giving us useless data structures from the dom?
    var elementsArray = Array.prototype.slice.call(form.elements, 0);
    
    funcName = funcName || 'prettyPinkBike';
    // avoid stupid collisions with inherited properties.
    var funcArgsObj = Object.create(null);
    if (useOptionsObj) {
        funcArgsObj.options = 1;
    }
    
    var funcBody = tab+'var formData = new FormData()'+sc+eol+eol;
    
    /**
     * escapes strings so they can be boxed.
     * @param {String} str the string to escape.
     * @returns {String} Returns the escaped string.
     */
    function esc (str) {
        str = str || '';
        return str.replace('\\', '\\\\').replace('\'', '\\\'');
    }
    /**
     * adds an argument to the funcArgsObj for use when the generated function
     *  is not using an options argument.
     * @param {String} arg The argument to add.
     */
    function addArg (arg) {
        // Adds property to null object so args are guaranteed to be unique.
        // Takes everything that comes before the first open brace to be the
        // name of the argument. Boxed values attached to this name would be
        // properties of the argument and I have no intention of flattening
        // them.
        funcArgsObj[arg.split('[')[0]] = 1;
    }
    /**
     * Gets the current value of the form element and generates a default value
     *  from it.
     * @param {HTMLElement} formElement The form element to process.
     * @returns {String} Returns a string representing a method of assigning
     *  the "default value" of the element.
     */
    function getDefaultValue (val, formElement) {
        var out = val+sp+'='+sp+q+esc(formElement.value)+q+sc;
        var fakeFile = "new Blob(['here is a simple text file']," +
                        "{ 'type' : 'text/plain' })"
        ;
        switch (formElement.type) {
            case 'file':
                out = '//'+sp+val+sp+'='+sp+fakeFile+sc;
                break;
            case 'checkbox':
                out = formElement.checked ? out : '//'+sp+out;
                break;
            default:
                break;
        }
        return out;
    }
    /**
     * Generates a javascript comment containing information about the
     *  attributes of the given element.
     * @param {HTMLElement} element The HTML element to document.
     * @param {String} tabs The string to use as tabs, this allows for padding
     *  the left side of the comment arbitrarily.
     * @returns {String} Returns the comment as a string.
     */
    function commentGenerator (element, tabs) {
        tabs = tabs || '';
        var elAttrs = (
                Array.prototype.slice.call(element.attributes, 0).
                map(function (item) {
                    return item.name + ' : ' + item.value;
                }).
                join(eol+tabs+sp+'*'+sp)
            );
        var out = 
            '/**'+eol+tabs+
            sp+'*'+sp+element.tagName+' attributes: '+eol+tabs+
            sp+'*'+sp+elAttrs+eol+tabs+
            sp+'*/'+eol;
        return out;
    }
    /**
     * Generates a line for the function body based on properties of the form
     *  element given.
     * @param {HTMLElement} The form element to process.
     * @returns {String} Returns the line as a string.
     */
    function generateLine (formElement) {
        var name = formElement.name;
        var key = name;
        var val = name;
        var line;
        // this sets up the initial value for the map reduce function
        // if the user wants a single options arg then everything must be boxed
        // otherwise, this will be an opitons or array argument for the final
        // function, if it contain boxes.
        var p = (funcArgsObj.options === 1) ? 'options' : null;
        // if there are boxes in the name we need to quote the name and box it
        // for proper access as a javascript identifier.
        if(name.indexOf('[') !== -1) {
            // split on left square bracket
            val = name.split('[').map(function (item) {
                // remove the right square bracket from every element in the
                // array.
                return item.replace(']', '');
                // reduce the array to a single string value.
            }).reduce(function (prev, curr) {
                var out;
                // in the initial case, if p is 'options' then concat 'options'
                // with the boxed representation of the first array element.
                // subsequent elements will be boxed and quoted.
                if (prev) {
                    out = prev + '[\'' + esc(curr) + '\']';
                    // otherwise, the first element does not need boxing.
                    // subsequent elements will be boxed and quoted.
                } else {
                    out = curr;
                }
                return out;
            }, p);
            // if there are no boxes in the name but the user has specified
            // that the function should accept a single options object, then
            // everything needs to be boxed and quoted anyway.
        } else if (funcArgsObj.options === 1) {
            val = 'options[\'' + esc(name) + '\']';
        }
        // the key is the unaltered name of the form element, the val is an
        // identifier corresponding to one of the generated functions arguments.
        line =
            tab+commentGenerator(formElement, tab)+
            tab+'formData.append('+q+key+q+c+sp+val+')'+sc+eol;
        defaultsQueue.push(getDefaultValue(val, formElement));
        return line;
    }
    /**
     * Reducer function used to process the array of form elements into a string
     *  representing the generated function's body.
     * @param {String} prev The accumulated value of reduction so far.
     * @param {String} curr The current information to process and add to
     *  `prev`.
     * @returns {String} Returns the value of reduction so far, to be fed into
     *  the next invocation of this function.
     */
    function reducer (prev, curr) {
        // carrying over the previous value of the function body.
        var out = prev;
        // if the current element doesn't have a name then it wouldn't submit
        // usable data from the form, so skip it.
        if(curr.name) {
            if(!useOptionsObj) {
                // if not generating a function using an options object,
                // concatenate the form element name into the list of function
                // args being genrated in the parent scope.
                addArg(curr.name);
            }
            // append a new line to the function body.
            out += generateLine(curr);
        }
        // return the function body in it's current state.
        return out;
    }
    /**
     * Generates the function and defaults for output.
     * @returns {String} Returns the string value of a javascript function
     *  which will accept arguments and generate a FormData representation of
     *  the form processed.
     */
    function generateFunction () {
        var lints = '/*jslint white: true, sub: true*/'+eol+eol+
            '/*globals FormData */'+eol+eol;
        var strict = tab+'"use strict"'+sc+eol;
        // beginning with the function body, reduce the elements array to a
        // single value using the reducer function. Replace the current function
        // body with these results.
        funcBody = elementsArray.reduce(reducer, funcBody);
        // append a return statement to the function body.
        funcBody += tab+eol+tab+'return formData'+sc+eol;
        var formInfo = commentGenerator(form);
        var n = funcName;
        var b = strict+funcBody;
        var a = Object.keys(funcArgsObj).reduce(function (prev, curr) {
            var arg;
            if(prev !== '') {
                arg = prev+c+sp+curr;
            } else {
                arg = curr;
            }
            return arg;
        }, '');
        var defaults = defaultsQueue.sort().join(eol);
        var generated = lints+formInfo+'function'+sp+n+sp+'('+a+')'+sp+
            '{'+eol+b+'}'+eol+eol+defaults;
        return generated;
    }
    
    return generateFunction();
}

// atropaFormdataGenerator (form, funcName, true);

try {
    module.exports = formdataGenerator;
    //module.exports.forEveryForm = forEveryForm;
} catch (ignore) {
    // module.exports does not exist.
}



