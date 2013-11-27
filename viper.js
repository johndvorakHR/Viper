var viper = function(json) {
    var hydraUrl = "http://purl.org/hydra/core",
        error = function(code, desc) {
            return { error: code, desc: desc };
        };
    // check for context
    if(!json["@context"]) { return error(1, "No @context"); }
    var context = json["@context"],
        prefix = ""; 
    // checks if a given var is a valid hydra IRI
    var isHydra = function(str) { 
            return (typeof str === "string" 
                 && str.slice(0,hydraUrl.length) === hydraUrl );
    };
    // check if the context has a hydra url or if the hydra url is in a property 
    if(!isHydra(context)) {
        for (var prop in context) {
            if ( isHydra(context[prop]) ) { 
                prefix = prop + ':';
                break;
            }
        }
        // its an error if prefix is still "" by now, because this context
        // is not an hydra vocab
        if(prefix === "") { 
            return error(2, "Hydra IRI not found in @context");
        }
        // check if hydra is a json-ld @ property or a namespace property
        if(prefix[0] === '@') {
            // if its an @ property then use the default prefix of ""
            prefix = "";
        }
    }
    // check if the the properties we are going to need from the context
    // have a dif. name than the default,
    // by now we should be safe to assume the defaults if these properties
    // are not defined in the context
    var docP         = prefix + "ApiDocumentation",
        propP        = prefix + "property",
        readonlyP    = prefix + "readonly",
        writeonlyP   = prefix + "writeonly",
        classesP     = prefix + "supportedClasses",
        propsP       = prefix + "supportedProperties",
        opsP         = prefix + "supportedOperations",
        methodP      = prefix + "method",
        expectsP     = prefix + "expects",
        returnsP     = prefix + "returns",
        statusCodesP = prefix + "statusCodes",
        codeP        = prefix + "statusCode";
        classP       = prefix + "Class";
    for (var prop in context) {
        var value = context[prop];
        if(typeof value === "object" && value["@type"] === "@id") {
            // check to see if this is the common case of specifying a
            // json-ld @id, otherwise do nothing
            value = value["@id"];
        }
        switch(value) {
            case docP: docP = prop; break;
            case propP: propP = prop; break;
            case readonlyP: readonlyP = prop; break;
            case writeonlyP: writeonlyP = prop; break;
            case classesP: classesP = prop; break;
            case propsP: propsP = prop; break;
            case opsP: opsP = prop; break;
            case methodP: methodP = prop; break;
            case expectsP: expectsP = prop; break;
            case returnsP: returnsP = prop; break;
            case statusCodesP: statusCodesP = prop; break;
            case codeP: codeP = prop; break;
            case classP: classP = prop; break;
        }
    }
    // check if type is a valid "ApiDocumentation" type
    if(!json["@type"] === docP) {
        return error(3, "@type is not a valid ApiDocumentation, needed: " + 
                    docP + ", found: " + json["@type"] ); 
    }
    // TODO: check if there is an entrypoint
    //
    // the name that viper uses for classes/operations/properties is made by 
    // the contents after the '/' or the ':' characters of the string
    var getName = function(n) { return n.split('/').pop().split(':').pop(); };

    // create a class
    var createClass = function(classObj) {
        var id = classObj["@id"],
            name = getName(id),
            obj = {};

        // is this class one of the hydra supplied classes ?
        if(isHydra(id)) {
            // TODO: ignore ?
            // break it at the '#' and keep the name after it
            var l = id.split('#')[1],
            if(l) { return { classId: l, className: name };  } 
            else  { return { classId: id, className: name }; }
        }
    };
    // fetch the classes
    if(json[classesP]) {
        for (var i = 0; i < json[classesP].length; i++) { 
        }
    }
};

/*
     var debugProps = function() {
        console.log("docP: " + docP);
        console.log("propP: " + propP);
        console.log("readonlyP: " + readonlyP);
        console.log("writeonlyP: " + writeonlyP);
        console.log("classesP: " + classesP);
        console.log("propsP: " + propsP);
        console.log("opsP: " + opsP);
        console.log("methodP: " + methodP);
        console.log("expectsP: " + expectsP);
        console.log("returnsP: " + returnsP);
        console.log("statusCodesP: " + statusCodesP);
        console.log("codeP: " + codeP);
        console.log("classP: " + classP);
    };
    debugProps();


*/
