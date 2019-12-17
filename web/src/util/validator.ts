export class Validator {
  sidValidator(sid: string, prefix = 'AC'): boolean {
    const regex = new RegExp(`^${prefix}\\w{32}$`);
    return Boolean(regex.exec(sid));
  }
}

export default new Validator();
