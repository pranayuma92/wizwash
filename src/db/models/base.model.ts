import { Model } from 'objection';

export class BaseModel extends Model {
  readonly id: number;
  created_at: Date;
  updated_at: Date;

  static get idColumn() {
    return 'id';
  }
}