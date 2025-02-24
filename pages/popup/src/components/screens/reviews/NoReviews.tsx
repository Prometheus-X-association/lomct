import { PlusIcon, StarIcon } from '@/assets/icons';
import TextMuted from '@/components/ui/TextMuted';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function NoReviews() {
  const navigate = useNavigate();
  return (
    <div className="mt-2 py-4 px-6 flex flex-col gap-2 rounded-2xl bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center text-base font-bold ">
          <h3 className="mr-2">Reviews</h3>
          <div className="flex items-center px-2 py-0.5 bg-yellow03 rounded-[8px]">
            <StarIcon /> <span className="ml-2 mr-1">0</span>
            <TextMuted className="">(0)</TextMuted>
          </div>
        </div>
        <span className="group">
          <Button onClick={() => navigate('/add-review')} variant="link" size="xs">
            Add review <PlusIcon />
          </Button>
        </span>
      </div>
      <div className="h-[190px] flex flex-col items-center justify-center gap-2">
        <img src={chrome.runtime.getURL('popup/no-reviews.png')} alt="no reviews." />
        <span>
          <TextMuted variant="m">No review yet for this resource.</TextMuted>
          <TextMuted variant="m">Be the first to review it!</TextMuted>
        </span>
      </div>
    </div>
  );
}

export default NoReviews;
