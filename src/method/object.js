import * as ObjectInternalSlots from '../internal/object'

let ObjectCreate = (proto, internalSlotsList = []) => {
    let obj = {}

    internalSlotsList.forEach(name => {
        obj[name] = undefined
    })

    for (let key in ObjectInternalSlots) {
        obj[key] = ObjectInternalSlots[key]
    }

    obj.__Prototype__ = proto
    obj.__Extensible__ = true

    return obj
}

export { ObjectCreate }
