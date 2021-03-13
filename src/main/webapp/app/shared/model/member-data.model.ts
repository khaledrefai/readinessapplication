import { Moment } from 'moment';

export interface IMemberData {
  id?: number;
  testDate?: Moment;
  userId?: number;
  userName?: string;
  userGender?: string;
  userBirthday?: string;
  userAge?: number;
  userHeight?: number;
  orderDate?: Moment;
}

export class MemberData implements IMemberData {
  constructor(
    public id?: number,
    public testDate?: Moment,
    public userId?: number,
    public userName?: string,
    public userGender?: string,
    public userBirthday?: string,
    public userAge?: number,
    public userHeight?: number,
    public orderDate?: Moment
  ) {}
}
