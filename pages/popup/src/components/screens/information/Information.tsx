import {
  BarGraphIcon,
  CellsIcon,
  EditIcon,
  MedalIcon,
  NewspaperIcon,
  RightArrowIcon,
  UpperRightArrowIcon,
  InternetIcon,
  HashIcon,
  CategoryIcon,
  ClockIcon,
  CalendarIcon,
  VideoCameraIcon,
  ReaderIcon,
  FolderUploadIcon,
  LinkIconSmall,
  DocumentLayoutIcon,
} from '@/assets/icons';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { Button } from '@/components/ui/button';
import './information.css';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import NoInformation from './NoInformation';
import SuggestedEdits from './SuggestedEdits';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useStatementsStore } from '@/store/store';
import { format } from 'date-fns';

function Information({ isAllInfo, maxHeight }: { isAllInfo?: boolean; maxHeight?: number }) {
  const authorityStatement = useStatementsStore(state => state.authorityStatement);
  const suggestStatements = useStatementsStore(state => state.suggestStatements);
  const navigate = useNavigate();

  if (!authorityStatement && suggestStatements.length === 0) return <NoInformation />;

  if (!authorityStatement && suggestStatements.length !== 0) return <SuggestedEdits isMainPage />;

  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-2xl',
        isAllInfo ? 'card-wrapper' : 'information-card-subtracted',
        // maxHeight && 'max-h-[' + maxHeight + 'px]',
      )}>
      <div className="flex justify-between mb-2">
        <h3 className="text-base font-bold">Information</h3>
        <span className="group">
          <Button variant="link" size="xs" onClick={() => navigate('/edit-information')}>
            Suggest Edits <EditIcon />{' '}
          </Button>
        </span>
      </div>
      <ScrollArea
        className="flex flex-col p-3 bg-neutral01 rounded-xl transition-all duration-300"
        style={{ maxHeight: maxHeight }}>
        <ul className="flex flex-col gap-1">
          <li className="flex gap-2 items-start">
            <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
              <NewspaperIcon />
              <span>Title:</span>
            </div>
            <div className="line-clamp-1">{capitalizeFirstLetter(authorityStatement.object.definition?.name?.en)}</div>
          </li>
          <li className="flex gap-2 items-start">
            <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
              <CellsIcon />
              <span>Bloom:</span>
            </div>
            <div className="">
              {capitalizeFirstLetter(
                authorityStatement?.context.extensions['http://schema.prometheus-x.org/extension/bloom'],
              )}
            </div>
          </li>
          <li className="flex gap-2 items-start">
            <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
              <BarGraphIcon />
              <span>Level:</span>
            </div>
            <div className="">
              {capitalizeFirstLetter(
                authorityStatement?.context.extensions['http://schema.prometheus-x.org/extension/level'],
              )}
            </div>
          </li>
          <li className="flex gap-2 items-start">
            <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
              <MedalIcon />
              <span>License:</span>
            </div>
            <div className="w-full max-w-[calc(100%-108px)] pl-2 pr-0.5 py-0.5 bg-[#E6E6E6] rounded-[8px] flex items-center gap-1 justify-between">
              <span className="line-clamp-1">
                {authorityStatement?.context.extensions['http://schema.prometheus-x.org/extension/license']}
              </span>

              <Button
                size="sm"
                variant="icon"
                disabled={!authorityStatement?.context.extensions['http://schema.prometheus-x.org/extension/license']}
                onClick={() => {
                  if (
                    authorityStatement?.context.extensions['http://schema.prometheus-x.org/extension/license'] ===
                    undefined
                  ) {
                    return;
                  }

                  const w = window.open(
                    authorityStatement.context.extensions['http://schema.prometheus-x.org/extension/license'],
                    '_blank',
                  );
                  if (w) {
                    w.focus();
                  }
                }}>
                <UpperRightArrowIcon />
              </Button>
            </div>
          </li>
        </ul>
        {isAllInfo && (
          <>
            {' '}
            <Separator orientation="horizontal" />
            <ul className="flex flex-col gap-1">
              <li className="flex gap-2 items-start">
                <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
                  <HashIcon />
                  <span>Keywords:</span>
                </div>
                <div className="">
                  {}
                  {authorityStatement?.context.extensions['http://schema.prometheus-x.org/extension/keywords']?.map(
                    (keyWord, i) => (
                      <span key={i} className="inline-block bg-white py-0.5 px-2 mr-1 mb-1 rounded-xl">
                        {keyWord}
                      </span>
                    ),
                  )}
                </div>
              </li>
              <li className="flex gap-2 items-start">
                <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
                  <InternetIcon />
                  <span>Language:</span>
                </div>
                <div className="">{authorityStatement?.context.language}</div>
              </li>
            </ul>
            <Separator orientation="horizontal" />
            <ul className="flex flex-col ">
              <li className="flex gap-2 items-start">
                <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
                  <CategoryIcon />
                  <span>Type:</span>
                </div>
                <div className="">
                  <span className="flex items-center gap-1 bg-neutral02 py-0.5 px-2 mr-1 mb-1 rounded-xl">
                    <VideoCameraIcon />{' '}
                    {authorityStatement?.context.extensions['http://schema.prometheus-x.org/extension/type']}
                  </span>
                </div>
              </li>
              <li className="flex gap-2 items-start">
                <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
                  <ClockIcon />
                  <span>Duration:</span>
                </div>
                <div className="">
                  <span className="inline-block bg-neutral02 py-0.5 px-2 mr-1 mb-1 rounded-xl">
                    {authorityStatement?.context.extensions['http://schema.prometheus-x.org/extension/duration']}
                  </span>
                </div>
              </li>
              <li className="flex gap-2 items-start">
                <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
                  <CalendarIcon />
                  <span>Date:</span>
                </div>
                <div className="">
                  <span className="inline-block bg-neutral02 py-0.5 px-2 mr-1 mb-1 rounded-xl">
                    {format(authorityStatement?.stored || '', 'PP')}
                  </span>
                </div>
              </li>
            </ul>
            <Separator orientation="horizontal" />
            <ul className="flex flex-col gap-1">
              <li className="flex gap-2 items-start">
                <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
                  <LinkIconSmall />
                  <span>Provider:</span>
                </div>
                <div className="">
                  {capitalizeFirstLetter(
                    authorityStatement?.context.extensions['http://schema.prometheus-x.org/extension/provider'],
                  )}
                </div>
              </li>
              <li className="flex gap-2 items-start">
                <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
                  <ReaderIcon />
                  <span>Author:</span>
                </div>
                <div className="">
                  {authorityStatement?.context.extensions['http://schema.prometheus-x.org/extension/author']}
                </div>
              </li>
              <li className="flex gap-2 items-start">
                <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
                  <FolderUploadIcon />
                  <span>Publisher:</span>
                </div>
                <div className="">
                  {authorityStatement?.context.extensions['http://schema.prometheus-x.org/extension/publisher']}
                </div>
              </li>
            </ul>
            <Separator orientation="horizontal" />
            <ul className="flex flex-col gap-1">
              <li className="flex flex-col gap-2 items-start">
                <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
                  <DocumentLayoutIcon />
                  <span>Description:</span>
                </div>
                <p className="py-2 px-3 bg-white rounded-xl">
                  {authorityStatement?.object.definition?.description?.en}
                </p>
              </li>
            </ul>
          </>
        )}
      </ScrollArea>
      {!isAllInfo && (
        <div className="flex justify-center group">
          <Button variant="ghost" size="s" onClick={() => navigate('/information')}>
            View more <RightArrowIcon />
          </Button>
        </div>
      )}
    </div>
  );
}

export default Information;
