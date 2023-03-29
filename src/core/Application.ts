import ProtonApplication from '../decorators/ProtonApplication';

@ProtonApplication()
export default class Application {
  public static start: () => void;
}
