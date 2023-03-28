import ProtonApplication from '../decorators/ProtonApplication.js';

@ProtonApplication()
export default class Application {
  public static start: () => void;
}
