import Assert from '../assert'
import { Type, SameValue } from '../method/abstract'

let __GetPrototypeOf__ = function() {
        return this.__Prototype__
    },

    __SetPrototypeOf__ = function( V ) {
        let O = this
        Assert( Type( V ) === 'Object' || Type( O ) === 'Null' )

        let extensible = O.__Extensible__,
            current    = O.__Prototype__

        if ( SameValue( V, current ) ) {
            return true
        }

        if ( !extensible ) {
            return false
        }

        let p    = V,
            done = false

        while ( !done ) {
            if ( p === null ) {
                done = true
            } else if ( SameValue( p, O ) ) {
                return false
            } else {
                if ( p.__GetPrototypeOf__ !== __GetPrototypeOf__ ) {
                    done = true
                } else {
                    p = p.__Prototype__
                }
            }
        }

        O.__Prototype__ = V
        return true
    }

export {
    __GetPrototypeOf__,
    __SetPrototypeOf__
}
