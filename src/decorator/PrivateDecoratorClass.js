import {
  classWithPrivateMethods,
  privateMethod,
  extendClassWithPrivateMethods
} from 'class-private-method-decorator';

@classWithPrivateMethods
class FooWithPrivate {
  public1(text) {
    return `example public1:${text}`
  }

  @privateMethod
  private2(text) {
    return `example private2:${text}`
  }
}

export default FooWithPrivate;
