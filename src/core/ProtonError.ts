class ProtonError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProtonError';
  }

  public static throw(message: string): never {
    throw new ProtonError(message);
  }

  public static throwIf(condition: boolean, message: string): void {
    if (condition) {
      throw new ProtonError(message);
    }
  }
}

export default ProtonError;
