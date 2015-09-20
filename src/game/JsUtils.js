function extend( subConstructor, superConstructor )
{
  var constructor =
  {
    constructor:
    {
      value: subConstructor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  };
  
  subConstructor.prototype = Object.create( superConstructor.prototype, constructor );
}

window['extend'] = extend;
