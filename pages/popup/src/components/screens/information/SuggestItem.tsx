import { format } from 'date-fns';
import {
  BarGraphIcon,
  CalendarIcon,
  CategoryIcon,
  CellsIcon,
  ClockIcon,
  DocumentLayoutIcon,
  FolderUploadIcon,
  HashIcon,
  InternetIcon,
  LinkIconSmall,
  MedalIcon,
  NewspaperIcon,
  ReaderIcon,
  UpperRightArrowIcon,
} from '@/assets/icons';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { RFC5646_LANGUAGE_TAGS } from '@/const/languageTags';
import { statementTypesAndIcons } from '@/components/screens/information/editInformation/EditInformation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { InfoItem } from '@/types/infoItem';

type Props = InfoItem & {
  name: string | undefined;
  bio: string | undefined;
};

function SuggestItem({
  name,
  bio,
  date,
  title,
  level,
  license,
  provider,
  author,
  publisher,
  bloom,
  keywords,
  duration,
  type,
  description,
  language,
}: Props) {
  return (
    <div className={cn('flex flex-col bg-neutral01 rounded-2xl card-wrapper')}>
      <div className="flex justify-between group mb-1">
        <span>
          <h3 className="text-base font-bold">{name}</h3>
          <i className="">{bio}</i>
        </span>
        {format(date || '', 'PP')}
      </div>

      <div className="p-3 bg-white rounded-xl">
        <ul className="flex flex-col gap-1">
          {title && (
            <li className="flex gap-2 items-start">
              <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
                <NewspaperIcon />
                <span>Title:</span>
              </div>
              <div className="">{title}</div>
            </li>
          )}
          <li className="flex gap-2 items-start">
            <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
              <CellsIcon />
              <span>Bloom:</span>
            </div>
            <div>{bloom}</div>
          </li>
          {level && (
            <li className="flex gap-2 items-start">
              <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
                <BarGraphIcon />
                <span>Level:</span>
              </div>
              <div className="">{level}</div>
            </li>
          )}
          {license && (
            <li className="flex gap-2 items-start">
              <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
                <MedalIcon />
                <span>License:</span>
              </div>
              <div className="w-full max-w-[calc(100%-108px)] pl-2 pr-0.5 py-0.5 bg-[#E6E6E6] rounded-[8px] flex items-center gap-1 justify-between">
                <span className="line-clamp-1">{license}</span>

                <Button
                  size="sm"
                  variant="icon"
                  disabled={!license}
                  onClick={() => {
                    if (!license) {
                      return;
                    }

                    const w = window.open(license, '_blank');
                    if (w) {
                      w.focus();
                    }
                  }}>
                  <UpperRightArrowIcon />
                </Button>
              </div>
            </li>
          )}
        </ul>

        <Separator orientation="horizontal" />
        <ul className="flex flex-col gap-1">
          <li className="flex gap-2 items-start">
            <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
              <HashIcon />
              <span>Keywords:</span>
            </div>
            <div className="">
              {keywords?.map((keyWord, i) => (
                <span key={i} className="inline-block bg-neutral02 py-0.5 px-2 mr-1 mb-1 rounded-xl">
                  {keyWord}
                </span>
              ))}
            </div>
          </li>
          <li className="flex gap-2 items-start">
            <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
              <InternetIcon />
              <span>Language:</span>
            </div>
            <div>{RFC5646_LANGUAGE_TAGS[language]}</div>
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
              {type && (
                <span className="flex items-center gap-1 bg-neutral02 py-0.5 px-2 mr-1 mb-1 rounded-xl">
                  {statementTypesAndIcons[type as keyof typeof statementTypesAndIcons]} {capitalizeFirstLetter(type)}
                </span>
              )}
            </div>
          </li>
          <li className="flex gap-2 items-start">
            <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
              <ClockIcon />
              <span>Duration:</span>
            </div>
            <div className="">
              {duration && (
                <span className="inline-block bg-neutral02 py-0.5 px-2 mr-1 mb-1 rounded-xl">{duration}</span>
              )}
            </div>
          </li>
          <li className="flex gap-2 items-start">
            <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
              <CalendarIcon />
              <span>Date:</span>
            </div>
            <div className="">
              <span className="inline-block bg-neutral02 py-0.5 px-2 mr-1 mb-1 rounded-xl">
                {format(date || '', 'PP')}
              </span>
            </div>
          </li>
        </ul>
        {(provider || author || publisher) && (
          <>
            <Separator orientation="horizontal" />
            <ul className="flex flex-col gap-1">
              {provider && (
                <li className="flex gap-2 items-start">
                  <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
                    <LinkIconSmall />
                    <span>Provider:</span>
                  </div>
                  <div className="">{provider}</div>
                </li>
              )}
              <li className="flex gap-2 items-start">
                <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
                  <ReaderIcon />
                  <span>Author:</span>
                </div>
                <div>{author}</div>
              </li>
              <li className="flex gap-2 items-start">
                <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
                  <FolderUploadIcon />
                  <span>Publisher:</span>
                </div>
                <div>{publisher}</div>
              </li>
            </ul>
          </>
        )}
        <Separator orientation="horizontal" />
        <ul className="flex flex-col gap-1">
          <li className="flex flex-col gap-2 items-start">
            <div className="min-w-[100px] flex items-center gap-1 text-neutral06">
              <DocumentLayoutIcon />
              <span>Description:</span>
            </div>
            <p className="px-3 bg-white rounded-xl">{description}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SuggestItem;
