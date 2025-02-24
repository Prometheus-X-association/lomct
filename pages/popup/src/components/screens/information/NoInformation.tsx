import { useNavigate } from 'react-router-dom';
import { EditIcon } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import TextMuted from '@/components/ui/TextMuted';
import './information.css';

function NoInformation() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2 rounded-2xl information-card-subtracted">
      <div className="flex justify-between">
        <h3 className="text-base font-bold">Information</h3>
        <span className="group">
          <Button variant="link" size="xs" onClick={() => navigate('/edit-information')}>
            Suggest Edits <EditIcon />
          </Button>
        </span>
      </div>
      <div className="h-[170px] flex flex-col items-center justify-center gap-2 pb-4">
        <img src={chrome.runtime.getURL('popup/no-information.png')} alt="no information" />
        <span>
          <TextMuted variant="m">We are not familiar with this educational resource yet. </TextMuted>
          <TextMuted variant="m">Be the first to describe it by clicking on the edit button!</TextMuted>
        </span>
      </div>
    </div>
  );
}

export default NoInformation;
