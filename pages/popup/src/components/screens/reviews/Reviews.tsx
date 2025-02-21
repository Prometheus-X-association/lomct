import { format } from 'date-fns';
import { PlusIcon, RightArrowIcon } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import ReviewItem from './ReviewItem';
import BackButton from '@/components/common/BackButton';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import NoReviews from './NoReviews';
import { useStatementsStore } from '@/store/store';
import GeneralRating from './GeneralRating';

function Reviews({ isAllReviews }: { isAllReviews?: boolean }) {
  const reviewedStatements = useStatementsStore(state => state.reviewedStatements);
  const navigate = useNavigate();

  if (!reviewedStatements.length) return <NoReviews />;

  const reviewsToShow = isAllReviews ? reviewedStatements : reviewedStatements.slice(0, 3);

  return (
    <>
      {isAllReviews && (
        <div className="mb-4">
          <BackButton />
        </div>
      )}
      <div
        className={cn(
          'mt-2 pt-4 px-6 flex flex-col rounded-2xl bg-white',
          isAllReviews ? 'max-h-[496px] pb-4' : 'h-[255px]',
        )}>
        <div className="flex justify-between items-center mb-2">
          <GeneralRating />
          <span className="group">
            <Button onClick={() => navigate('/add-review')} variant="link" size="xs">
              Add review <PlusIcon />
            </Button>
          </span>
        </div>
        <ScrollArea className="flex flex-col">
          <div className="flex flex-col gap-2">
            {reviewsToShow.map((review, i) => (
              <ReviewItem
                key={i}
                bio={review.context.extensions['http://schema.prometheus-x.org/extension/biography']}
                date={format(review.stored, 'PP')}
                name={review.context.extensions['http://schema.prometheus-x.org/extension/username']}
                rating={review.result.score.raw}
                review={review.result.response}
                actorEmail={review.actor.mbox?.slice(7)}
              />
            ))}
            {!isAllReviews && reviewedStatements.length > 3 && (
              <div className="flex justify-center group z-10">
                <Button onClick={() => navigate('/all-reviews')} variant="ghost" size="s">
                  View more <RightArrowIcon />
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}

export default Reviews;
