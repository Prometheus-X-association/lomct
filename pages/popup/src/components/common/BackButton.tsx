import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BackChevronIcon } from '@/assets/icons';

function BackButton() {
  const navigate = useNavigate();
  return (
    <div className="group">
      <Button onClick={() => navigate(-1)} variant="link" size="xs">
        <BackChevronIcon /> Back
      </Button>
    </div>
  );
}

export default BackButton;
