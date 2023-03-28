export default function ProtonApplication() {
  return function (target: any): any {
    class Application extends target {
      public name: string;

      constructor(...args: any[]) {
        super(...args);
      }
    }

    return Application;
  };
}
