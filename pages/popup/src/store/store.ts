import { create } from 'zustand';
import { fetchXapiStatements } from '@/api/fetchXapiStatements';
import { IStatement } from '@/types/statement';
import { IReviewStatement } from '@/types/reviewStatement';
import { getUniqueSuggestStatements } from '@/utils/getUniqueSuggestStatements';

interface StatementsState {
  suggestStatements: IStatement[];
  reviewedStatements: IReviewStatement[];
  authorityStatement: IStatement | null;
  fetchStatements: (primarySourceLink: string) => Promise<void>;
  addReviewStatement: (data: IReviewStatement) => void;
  statementId: string;
  isLoaded: boolean | null; // null stands for loading procces
}

export const useStatementsStore = create<StatementsState>(set => ({
  suggestStatements: [],
  reviewedStatements: [],
  authorityStatement: null,
  statementId: '',
  isLoaded: false,
  fetchStatements: async (statementId: string) => {
    set(() => ({ isLoaded: null }));
    try {
      const urlParam = new URLSearchParams({ activity: statementId });
      const [{ statements: primaryStatements }, secondary] = (await fetchXapiStatements({
        params: urlParam,
      })) as {
        statements: IStatement[];
      }[];
      const secondaryStatements = secondary && secondary.statements;

      const suggestStatements: IStatement[] = [],
        reviewedStatements: IReviewStatement[] = [],
        reviewAuthors: string[] = [];
      let authorityStatement = null,
        isPrimarySourceAuthorityExists = false;

      for (let index = 0; index < primaryStatements.length; ++index) {
        const statement = primaryStatements[index];
        if (statement.verb.id === 'http://id.tincanapi.com/verb/reviewed') {
          if (reviewAuthors.findIndex(author => author === statement.actor.mbox) !== -1) {
            continue;
          }
          reviewAuthors.push(statement.actor.mbox);
          reviewedStatements.push(statement as IReviewStatement);
          continue;
        }

        if (
          statement.context.extensions['http://schema.prometheus-x.org/extension/username'] ===
            statement.authority.name &&
          statement.verb.id === 'https://w3id.org/xapi/dod-isd/verbs/proposed'
        ) {
          if (!authorityStatement) {
            authorityStatement = statement;
            isPrimarySourceAuthorityExists = true;
            continue;
          }

          if (new Date(statement.stored) > new Date(authorityStatement.stored)) {
            authorityStatement = statement;
            continue;
          }
          continue;
        }

        suggestStatements.push(statement);
      }

      if (secondaryStatements) {
        for (let index = 0; index < secondaryStatements.length; ++index) {
          const secondaryStatement = secondaryStatements[index];
          if (secondaryStatement.verb.id === 'http://id.tincanapi.com/verb/reviewed') {
            if (reviewAuthors.findIndex(author => author === secondaryStatement.actor.mbox) !== -1) {
              continue;
            }
            reviewAuthors.push(secondaryStatement.actor.mbox);
            reviewedStatements.push(secondaryStatement as IReviewStatement);
            continue;
          }

          if (
            secondaryStatement.context.extensions['http://schema.prometheus-x.org/extension/username'] ===
              secondaryStatement.authority.name &&
            secondaryStatement.verb.id === 'https://w3id.org/xapi/dod-isd/verbs/proposed'
          ) {
            if (isPrimarySourceAuthorityExists) {
              continue;
            }

            if (!authorityStatement) {
              authorityStatement = secondaryStatement;
              continue;
            }

            if (new Date(secondaryStatement.stored) > new Date(authorityStatement.stored)) {
              authorityStatement = secondaryStatement;
              continue;
            }
            continue;
          }

          suggestStatements.push(secondaryStatement);
        }
      }

      const uniqueSuggestStatements = getUniqueSuggestStatements(suggestStatements);

      set(() => ({
        authorityStatement,
        suggestStatements: uniqueSuggestStatements,
        reviewedStatements,
        statementId,
        isLoaded: true,
      }));
    } catch (error) {
      set(() => ({ isLoaded: false }));
      console.log(error);
      alert(error?.message || 'Something went wrong. Please check all fields and try again.');
    }
  },
  addReviewStatement: (review: IReviewStatement) =>
    set(({ reviewedStatements }) => {
      reviewedStatements.forEach(({ actor: { mbox } }, index) => {
        if (mbox === review.actor.mbox) {
          return { reviewedStatements: [review, ...reviewedStatements.splice(index, 1)] };
        }
      });
      return { reviewedStatements: [review, ...reviewedStatements] };
    }),
  addSugestedStatement: (statement: IStatement) =>
    set(state => ({
      suggestStatements: getUniqueSuggestStatements([statement, ...state.suggestStatements]),
    })),
}));
