
  
/* vsdoc for _global_ */

(function (window) {
    

    window._global_ = {
        /// <summary></summary>
        /// <returns type="_global_"/>
                
        formdataGenerator: function(form, funcName, useOptionsObj, tab, eol) {
            /// <summary>A function generator that takes an HTML form and writes an equivalent
            ///  function which will produce a formData object. The function can be generated
            ///  to accept multiple parameters or a single options object.</summary>
            /// <param name="form" type="HTMLFormElement">A DOM reference to a form.</param>
            /// <param name="funcName" type="String">Optional. The name you want to give your generated
            ///  function. Defaults to &lt;code&gt;prettyPinkBike&lt;/code&gt;</param>
            /// <param name="useOptionsObj" type="Boolean">Optional. Set to true if you want the
            ///  generated function to accept a single options object instead of multiple
            ///  parameters.</param>
            /// <param name="tab" type="String">Optional. The string specified here will be used as tabs.
            ///  Defaults to four spaces.</param>
            /// <param name="eol" type="String">Optional. The string specified here will be used as the
            ///  end of line character. Defaults to &lt;code&gt;\r\n&lt;/code&gt;.</param>
            /// <returns type="String">Returns a JavaScript function as a string. This function
            ///  will accept parameters representing the data which would be entered into the
            ///  form elements, and will return a FormData object.</returns>
        }
        
    };

    var $x = window._global_;
    $x.__namespace = "true";
    $x.__typeName = "_global_";
})(this);

  

