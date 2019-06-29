import Assert from './assert'

let Abstract = {}

//7.1 Type Conversion
Abstract.ToPrimitive = (input, PreferredType) => {
    if (typeof input === 'object') {
        let hint

        if (!PreferredType) {
            hint = 'default'
        } else if (PreferredType === 'String') {
            hint = 'string'
        } else if (PreferredType === 'Number') {
            hint = 'number'
        }
    } else {
        return input
    }
}

//7.2 Testing and Comparison Operations
Abstract.IsPropertyKey = argument => {}

//7.3 Operations on Objects
Abstract.GetMethod = (V, P) => {
    Assert(Abstract.IsPropertyKey(P))
}
export default Abstract
