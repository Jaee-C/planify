import { UserData } from "@/lib/types";

export default class UserInfo {
  private readonly _value: UserData;

  public constructor(value: UserData) {
    this._value = value;
  }
}
