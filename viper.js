var viper = function(json) {
    var error = function(code, desc) {
        return { error: code, desc: desc };
    };
    // check for context
    if(!json["@context"]) { return error(1, "No @context"); }
    var context = json["@context"],
        prefix = ""; 
    // checks if a given var is a valid hydra IRI
    var isHydra = function(str) { 
            var hydra = "http://purl.org/hydra/core";
            return (typeof str === "string" 
                 && str.slice(0,hydra.length) === hydra );
    };
    // check if the context has a hydra url or if the hydra url is in a property 
    if(!isHydra(context)) {
        for (var prop in context) {
            var str = context[prop];
            if ( isHydra(str) ) { 
                prefix = prop;
                break;
            }
        }
        if(prefix === "") { 
            return error(2, "Hydra IRI not found in @context");
        }
        // check if hydra is a json-ld @ property or a namespace property
        if(prefix[0] === '@') {
            // if its an @ property then use the default prefix of ""
            prefix = "";
        }
    }
    // 
};


