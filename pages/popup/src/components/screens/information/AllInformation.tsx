import BackButton from '@/components/common/BackButton';
import React from 'react';
import Information from './Information';
import SuggestedEdits from './SuggestedEdits';

function AllInformation() {
  const [isSuggestedEditsOpen, setIsSuggestedEditsOpen] = React.useState(false);
  return (
    <>
      <div className="mb-4">
        <BackButton />
      </div>

      <Information isAllInfo maxHeight={isSuggestedEditsOpen ? 162 : 360} />
      <div className="mt-2">
        <SuggestedEdits isOpen={isSuggestedEditsOpen} onOpenClick={() => setIsSuggestedEditsOpen(isOpen => !isOpen)} />
      </div>
    </>
  );
}

export default AllInformation;
