import { IStatement } from './statement';

export interface IReviewStatement extends IStatement {
  result: {
    score: {
      scaled?: 1;
      raw: number;
      min?: 0;
      max?: 5;
    };
    response: string;
  };
}
