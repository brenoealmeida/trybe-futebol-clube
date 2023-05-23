export default class InvalidFomatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidFomatError';
    this.stack = '401';
  }
}
