import { Rating } from 'react-simple-star-rating';
import TextMuted from '@/components/ui/TextMuted';
import { cn } from '@/lib/utils';
import { EmptyStarIcon, StarIcon } from '@/assets/icons';
import { useStorageSuspense } from '@chrome-extension-boilerplate/shared';
import { userDataStorage } from '@chrome-extension-boilerplate/storage';

function ReviewItem({
  name,
  date,
  bio,
  rating,
  review,
  actorEmail,
}: {
  name: string;
  date: string;
  bio: string | undefined;
  rating: number;
  review: string;
  actorEmail: string;
}) {
  const userData = useStorageSuspense(userDataStorage);
  return (
    <div className={cn('p-3 rounded-xl', actorEmail === userData?.actorEmail ? 'bg-mainBlue01' : ' bg-neutral01')}>
      <div className="flex justify-between items-center">
        <h5 className="text-sm font-semibold">{name}</h5>
        <TextMuted>{date}</TextMuted>
      </div>
      <div className="mt-[5px] flex justify-between items-center flex-row">
        <p className="text-xs font-normal italic">{bio}</p>
        <Rating
          SVGclassName="inline"
          SVGstyle={{ display: 'inline' }}
          fillIcon={<StarIcon />}
          emptyIcon={<EmptyStarIcon />}
          initialValue={rating}
          readonly
          transition
          allowFraction
        />
      </div>
      <p className="mt-2 py-2 px-3 bg-white rounded-[8px] text-xs font-normal">{review}</p>
    </div>
  );
}

export default ReviewItem;
