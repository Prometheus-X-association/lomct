import { ScrollArea } from '@/components/ui/scroll-area';
import { DownChevronIcon, EditIcon, UpChevronIcon } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import SuggestItem from './SuggestItem';
import { useStatementsStore } from '@/store/store';
import { useNavigate } from 'react-router-dom';

function SuggestedEdits({
  isOpen,
  onOpenClick,
  isMainPage,
}: {
  isOpen?: boolean;
  onOpenClick?: () => void;
  isMainPage?: boolean;
}) {
  const suggestStatements = useStatementsStore(state => state.suggestStatements);
  const navigate = useNavigate();

  return (
    <div className={cn('rounded-2xl', isMainPage ? 'information-card-subtracted' : 'card-wrapper')}>
      <div className="flex justify-between relative">
        <h3 className="text-base font-bold">Suggested edits</h3>
        {isMainPage ? (
          <span className="group">
            <Button variant="link" size="xs" onClick={() => navigate('/edit-information')}>
              Suggest Edits <EditIcon />{' '}
            </Button>
          </span>
        ) : (
          <span className="group flex items-center">
            <Button variant="link" size="xs" onClick={onOpenClick}>
              <span className={cn('transition-opacity duration-300 absolute', isOpen ? 'opacity-100' : 'opacity-0')}>
                <UpChevronIcon />
              </span>
              <span className={cn('transition-opacity duration-300 absolute', !isOpen ? 'opacity-100' : 'opacity-0')}>
                <DownChevronIcon />
              </span>
            </Button>
          </span>
        )}
      </div>
      <ScrollArea
        className={cn(
          'flex flex-col transition-all duration-300',
          isOpen ? 'max-h-[190px] mt-2' : 'max-h-0',
          isMainPage && 'max-h-[190px]',
        )}>
        <div className="flex flex-col gap-2">
          {suggestStatements.map((item, i) => {
            return (
              <SuggestItem
                key={i}
                name={item.context.extensions['http://schema.prometheus-x.org/extension/username']}
                bio={item.context.extensions['http://schema.prometheus-x.org/extension/biography']}
                date={item.stored}
                author={item.context.extensions['http://schema.prometheus-x.org/extension/author']}
                bloom={item.context.extensions['http://schema.prometheus-x.org/extension/bloom']}
                description={item.object.definition?.description?.en}
                duration={item.context.extensions['http://schema.prometheus-x.org/extension/duration']}
                keywords={item.context.extensions['http://schema.prometheus-x.org/extension/keywords']}
                language={item.context.language}
                level={item.context.extensions['http://schema.prometheus-x.org/extension/level']}
                license={item.context.extensions['http://schema.prometheus-x.org/extension/license']}
                provider={item.context.extensions['http://schema.prometheus-x.org/extension/provider']}
                publisher={item.context.extensions['http://schema.prometheus-x.org/extension/publisher']}
                title={item.object.definition?.name?.en}
                type={item.context.extensions['http://schema.prometheus-x.org/extension/type']}
              />
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

export default SuggestedEdits;
