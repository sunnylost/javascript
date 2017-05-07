import { ObjectCreate } from './method/object'

export default class Realm {
}

function CreateIntrinsics( realmRec ) {
    let intrinsics          = {}
    realmRec.__Intrinsics__ = intrinsics

    let objProto                          = ObjectCreate( null )
    intrinsics[ '__%ObjectPrototype%__' ] = objProto
    /*
     Let objProto be ObjectCreate(null).
     Set intrinsics.[[%ObjectPrototype%]] to objProto.
     Let throwerSteps be the algorithm steps specified in 9.2.7.1 for the %ThrowTypeError% function.
     Let thrower be CreateBuiltinFunction(realmRec, throwerSteps, null).
     Set intrinsics.[[%ThrowTypeError%]] to thrower.
     Let noSteps be an empty sequence of algorithm steps.
     Let funcProto be CreateBuiltinFunction(realmRec, noSteps, objProto).
     Set intrinsics.[[%FunctionPrototype%]] to funcProto.
     Call thrower.[[SetPrototypeOf]](funcProto).
     Perform AddRestrictedFunctionProperties(funcProto, realmRec).
     Set fields of intrinsics with the values listed in Table 7 that have not already been handled above. The field names are the names listed in column one of the table. The value of each field is a new object value fully and recursively populated with property values as defined by the specification of each object in clauses 18-26. All object property values are newly created object values. All values that are built-in function objects are created by performing CreateBuiltinFunction(realmRec, <steps>, <prototype>, <slots>) where <steps> is the definition of that function provided by this specification, <prototype> is the specified value of the function's [[Prototype]] internal slot and <slots> is a list of the names, if any, of the function's specified internal slots. The creation of the intrinsics and their properties must be ordered to avoid any dependencies upon objects that have not yet been created.
     */
    return intrinsics
}

Realm.CreateRealm = () => {
    let realmRec = {
        __Intrinsics__  : undefined, //TODO
        __GlobalObject__: undefined,
        __GlobalEnv__   : undefined,
        __TemplateMap__ : [],
        __HostDefined__ : undefined
    }

    CreateIntrinsics( realmRec )
    return realmRec
}

Realm.SetRealmGlobalObject = ( realm, global, thisValue ) => {

}
