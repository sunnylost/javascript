export default function( truth, msg ) {
    if ( !truth ) {
        throw Error( msg || 'error arised.' )
    }
}
