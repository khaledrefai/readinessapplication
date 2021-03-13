export interface IInbodyData {
  id?: number;
  userID?: number;
  columnName?: string;
  columnValue?: string;
}

export class InbodyData implements IInbodyData {
  constructor(public id?: number, public userID?: number, public columnName?: string, public columnValue?: string) {}
}
