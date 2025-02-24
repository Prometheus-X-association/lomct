import { StarIcon } from '@/assets/icons';
import TextMuted from '@/components/ui/TextMuted';

import NoReviews from './NoReviews';
import { useStatementsStore } from '@/store/store';

function GeneralRating() {
  const reviewedStatements = useStatementsStore(state => state.reviewedStatements);

  const rating = reviewedStatements.reduce((acc, curr) => acc + curr.result.score.raw, 0) / reviewedStatements.length;

  if (!reviewedStatements.length) return <NoReviews />;
  return (
    <div className="flex items-center text-base font-bold ">
      <h3 className="mr-2">Reviews</h3>
      <div className="flex items-center px-2 py-0.5 bg-yellow03 rounded-[8px]">
        <StarIcon /> <span className="ml-2 mr-1">{rating.toFixed(2)}</span>
        <TextMuted>({reviewedStatements.length})</TextMuted>
      </div>
    </div>
  );
}

export default GeneralRating;
