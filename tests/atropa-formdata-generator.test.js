/*jslint
    white: true,
    nomen: true
*/
/*globals
    pad,
    afterEach,
    beforeEach,
    describe,
    expect,
    isCommonJS,
    it,
    jasmine,
    runs,
    spyOn,
    waits,
    waitsFor,
    xdescribe,
    xit,
    dummy
*/

describe('atropa-formdata-generator', function padSpecs () {
    "use strict";
    
    it('will not trim input while padding left',
    function willNotTrimInputLeft () {
        expect(pad(1, 'wee', 'um')).toEqual('wee');
    });

    it('will not trim input while padding right',
    function willNotTrimInputRight () {
        expect(pad(1, 'wee', 'um', true)).toEqual('wee');
    });

    it('pads left to the specified length with the given padding string',
    function padsLeftToSpecifiedLength () {
        expect(pad(6, 'wee', 'um')).toEqual('umuwee');
    });

    it('pads right to the specified length with the given padding string',
    function padsRightToSpecifiedLength () {
        expect(pad(6, 'wee', 'um', true)).toEqual('weeumu');
    });
    
// end describe
});



