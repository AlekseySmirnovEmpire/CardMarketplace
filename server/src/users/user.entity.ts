import { compare, hash } from 'bcryptjs';
import * as process from 'process';

export class User {
  private _password: string;
  constructor(
    private readonly _email: string,
    private readonly _firstName: string,
    private readonly _lastName: string,
    private readonly _nickName: string,
    passwordHash?: string,
  ) {
    if (passwordHash) {
      this._password = passwordHash;
    }
  }

  get email(): string {
    return this._email;
  }

  get lastName(): string {
    return this._lastName;
  }

  get nickName(): string {
    return this._nickName;
  }

  get firstName(): string {
    return this._firstName;
  }

  get password(): string {
    return this._password;
  }

  public async setPassword(pass: string): Promise<void> {
    this._password = await hash(pass, parseInt(process.env.SALT));
  }

  public async comparePassword(pass: string): Promise<boolean> {
    return await compare(pass, this._password);
  }
}
