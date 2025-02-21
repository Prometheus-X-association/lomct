import TextMuted from '@/components/ui/TextMuted';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function AddReviewSuccess() {
  const navigate = useNavigate();
  return (
    <div className="h-[496px] mt-2 py-4 px-6 flex flex-col gap-2 rounded-2xl bg-white">
      <div className="flex flex-col gap-2 text-base font-bold items-center">
        <h3 className="mr-2">Success</h3>
        <TextMuted variant="m">Thanks for sharing your review!</TextMuted>
      </div>
      <div className="h-full flex flex-col items-center justify-center gap-2">
        <img src={chrome.runtime.getURL('popup/add-review-success.png')} alt="no reviews." />
        <Button onClick={() => navigate('/')} size="lg">
          Ok
        </Button>
      </div>
    </div>
  );
}

export default AddReviewSuccess;
