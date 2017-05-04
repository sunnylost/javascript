export default class Realm {

}

function CreateIntrinsics( realmRec ) {
    let intrinsics          = {}
    realmRec.__Intrinsics__ = intrinsics

    let objProto = ObjectCreate( null )
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
}

Realm.SetRealmGlobalObject = ( realm, global, thisValue ) => {

}
