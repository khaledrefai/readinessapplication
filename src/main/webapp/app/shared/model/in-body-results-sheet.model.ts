import { Moment } from 'moment';

export interface IInBodyResultsSheet {
  id?: number;
  userId?: number;
  datetimes?: Moment;
  orderDate?: Moment;
  inbodyImage?: string;
}

export class InBodyResultsSheet implements IInBodyResultsSheet {
  constructor(
    public id?: number,
    public userId?: number,
    public datetimes?: Moment,
    public orderDate?: Moment,
    public inbodyImage?: string
  ) {}
}
