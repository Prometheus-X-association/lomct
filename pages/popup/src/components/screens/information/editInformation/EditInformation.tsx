import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Clock3 } from 'lucide-react';

import { fetchXapiStatements } from '@/api/fetchXapiStatements';
import { Button } from '@/components/ui/button';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  BarGraphIcon,
  BookIcon,
  BooksIcon,
  BrainIcon,
  CategoryIcon,
  CellsIcon,
  ClockIcon,
  ContentIcon,
  DocumentsIcon,
  FolderUploadIcon,
  HashIcon,
  InternetIcon,
  LinkIcon,
  MedalIcon,
  MicIcon,
  MobileIcon,
  MortarBoardIcon,
  NewspaperIcon,
  OfficeBagIcon,
  OpenBookIcon,
  PlayPresentationIcon,
  ReaderIcon,
  SitemapIcon,
  TableIcon,
  VideoCameraIcon,
  BackupIcon,
  ClockCountDownIcon,
} from '@/assets/icons';
import CFormField from '@/components/ui/CFormField';
import EditInputWrapper from './EditInputWrapper';
import BackButton from '@/components/common/BackButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import FormSection from './FormSection';
import EditInfoSuccess from './EditInfoSuccess';
import { useStatementsStore } from '@/store/store';
import { RFC5646_LANGUAGE_TAGS } from '@/const/languageTags';
import { useState } from 'react';
import { useStorageSuspense } from '@chrome-extension-boilerplate/shared';
import { userDataStorage, suggestEditDataStorage } from '@chrome-extension-boilerplate/storage';

const computeDuration = (hours: string, minutes: string, seconds: string) => {
  const hoursPart = hours ? hours + 'h' : '';
  const minutesPart = minutes ? (hours ? ` : ${minutes}m` : `${minutes}m`) : '';
  const secondsPart = seconds ? (hours || minutes ? ` : ${seconds}s` : `${seconds}s`) : '';
  return hoursPart + minutesPart + secondsPart;
};

const formSchema = z
  .object({
    title: z.string().max(300, {
      message: 'The title must not exceed 300 characters.',
    }),
    bloom: z.string(),
    level: z.string().max(60, {
      message: 'The level must not exceed 60 characters.',
    }),
    license: z
      .string()
      .url({
        message: 'Link should be valid.',
      })
      .optional()
      .or(z.literal('')),
    type: z.string(),
    keywords: z.string(),
    language: z.string(),
    hours: z.string(),
    minutes: z.string(),
    seconds: z.string(),
    provider: z.string(),
    author: z.string(),
    publisher: z.string(),
    description: z.string(),
  })
  .partial();

export const statementTypesAndIcons = {
  app: <MobileIcon />,
  article: <DocumentsIcon />,
  book: <OpenBookIcon />,
  'career-profile': <OfficeBagIcon />,
  'distance-learning': <MortarBoardIcon />,
  ebook: <BookIcon />,
  mooc: <SitemapIcon />,
  podcast: <MicIcon />,
  'safety-sheet': <TableIcon />,
  'serious-game': <BrainIcon />,
  training: <PlayPresentationIcon />,
  tutorial: <BooksIcon />,
  video: <VideoCameraIcon />,
  website: <LinkIcon variant="label" />,
};

function EditInformation() {
  const userData = useStorageSuspense(userDataStorage);
  const authorityStatement = useStatementsStore(state => state.authorityStatement);
  const statementId = useStatementsStore(state => state.statementId);
  const addSugestedStatement = useStatementsStore(state => state.addSugestedStatement);
  const suggestEditData = useStorageSuspense(suggestEditDataStorage);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: suggestEditData?.title || '',
      bloom: suggestEditData?.bloom || '',
      level: suggestEditData?.level || '',
      license: suggestEditData?.license || '',
      type: suggestEditData?.type || '',
      keywords: suggestEditData?.keywords || '',
      language: suggestEditData?.language || 'en',
      hours: suggestEditData?.hours || '',
      minutes: suggestEditData?.minutes || '',
      seconds: suggestEditData?.seconds || '',
      provider: suggestEditData?.provider || '',
      author: suggestEditData?.author || '',
      publisher: suggestEditData?.publisher || '',
      description: suggestEditData?.description || '',
    },
  });

  const [isSuccessful, setIsSuccessful] = useState(false);

  useEffect(() => {
    const subscription = form.watch(value => {
      suggestEditDataStorage.setSuggestEditData(value);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const statement = {
      context: {
        extensions: {
          'http://schema.prometheus-x.org/extension/username': userData.name || '',
          'http://schema.prometheus-x.org/extension/biography': userData.biography || '',
          'http://schema.prometheus-x.org/extension/bloom': values.bloom,
          'http://schema.prometheus-x.org/extension/provider': values.provider,
          'http://schema.prometheus-x.org/extension/license': values.license,
          'http://schema.prometheus-x.org/extension/keywords': values.keywords ? values.keywords.split(',') : [],
          'http://schema.prometheus-x.org/extension/publisher': values.publisher,
          'http://schema.prometheus-x.org/extension/author': values.author,
          'http://schema.prometheus-x.org/extension/duration': computeDuration(
            values.hours,
            values.minutes,
            values.seconds,
          ),
          'http://schema.prometheus-x.org/extension/type': values.type,
          'http://schema.prometheus-x.org/extension/level': values.level,
        },
        language: values.language,
      },
      actor: {
        objectType: 'Agent',
        name: userData?.name || '',
        mbox: 'mailto:' + userData?.actorEmail,
      },
      verb: {
        //it is the verb that implies it is a metadata edit proposal
        id: 'https://w3id.org/xapi/dod-isd/verbs/proposed',
        display: {
          'en-US': 'proposed',
        },
      },
      object: {
        id: statementId,
        definition: {
          name: {
            en: values.title,
          },
          description: {
            en: values.description,
          },
        },
        objectType: 'Activity',
      },
    };

    const [respData] = await fetchXapiStatements({
      method: 'POST',
      data: statement,
    });
    addSugestedStatement({ ...statement, id: respData[0], stored: new Date() });
    suggestEditDataStorage.removeEditDataStorage();
    setIsSuccessful(true);
  }

  return (
    <>
      <div className="mb-4">
        <BackButton />
      </div>
      {isSuccessful ? (
        <EditInfoSuccess />
      ) : (
        <div className="p-4 flex flex-col gap-4 bg-white shadow-containerShadow rounded-2xl">
          <h3 className="text-base font-bold ">Edit</h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <ScrollArea className="flex flex-col max-h-[424px]">
                <div className="flex flex-col gap-3">
                  <FormSection title="General information">
                    <EditInputWrapper
                      titleIcon={<NewspaperIcon variant="label" />}
                      title="Title"
                      value={authorityStatement ? authorityStatement.object.definition?.name?.en : ''}>
                      <CFormField
                        control={form.control}
                        name="title"
                        placeholder="Suggest title"
                        startAdornment={<NewspaperIcon variant="input" />}
                      />
                    </EditInputWrapper>

                    <EditInputWrapper
                      titleIcon={<CellsIcon variant="label" />}
                      title="Bloom"
                      value={
                        authorityStatement
                          ? authorityStatement.context.extensions['http://schema.prometheus-x.org/extension/bloom']
                          : ''
                      }>
                      <FormField
                        control={form.control}
                        name="bloom"
                        render={({ field }) => (
                          <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={<span className="text-neutral06">Suggest bloom</span>} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'].map(bloom => (
                                  <SelectItem key={bloom} value={bloom}>
                                    <div className="flex items-center gap-1">{bloom}</div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </EditInputWrapper>

                    <EditInputWrapper
                      titleIcon={<BarGraphIcon variant="label" />}
                      title="Level"
                      value={
                        authorityStatement
                          ? authorityStatement.context.extensions['http://schema.prometheus-x.org/extension/level']
                          : ''
                      }>
                      <FormField
                        control={form.control}
                        name="level"
                        render={({ field }) => (
                          <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={<span className="text-neutral06">Suggest level</span>} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {['novice', 'amateur', 'intermediate', 'confirmed', 'expert'].map(level => (
                                  <SelectItem key={level} value={level}>
                                    <div className="flex items-center gap-1">{capitalizeFirstLetter(level)}</div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </EditInputWrapper>

                    <EditInputWrapper
                      titleIcon={<MedalIcon variant="label" />}
                      title="License"
                      value={
                        authorityStatement
                          ? authorityStatement.context.extensions['http://schema.prometheus-x.org/extension/license']
                          : ''
                      }>
                      <CFormField
                        control={form.control}
                        name="license"
                        placeholder="Suggest license"
                        startAdornment={<LinkIcon />}
                      />
                    </EditInputWrapper>

                    <EditInputWrapper
                      titleIcon={<CategoryIcon variant="label" />}
                      title="Type"
                      value={
                        authorityStatement
                          ? [
                              {
                                icon: statementTypesAndIcons[
                                  authorityStatement.context.extensions['http://schema.prometheus-x.org/extension/type']
                                ],
                                text: capitalizeFirstLetter(
                                  authorityStatement.context.extensions[
                                    'http://schema.prometheus-x.org/extension/type'
                                  ],
                                ),
                              },
                            ]
                          : ''
                      }>
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder={<span className="text-neutral06">Suggest type</span>} />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.keys(statementTypesAndIcons).map(type => (
                                  <SelectItem key={type} value={type}>
                                    <div className="flex items-center gap-1">
                                      {statementTypesAndIcons[type as keyof typeof statementTypesAndIcons]}{' '}
                                      {capitalizeFirstLetter(type)}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </EditInputWrapper>
                  </FormSection>

                  <FormSection title="Linguistic taxonomy">
                    <EditInputWrapper
                      titleIcon={<HashIcon variant="label" />}
                      title="Keywords"
                      value={
                        authorityStatement
                          ? authorityStatement.context.extensions[
                              'http://schema.prometheus-x.org/extension/keywords'
                            ].map(keyWord => ({ text: keyWord }))
                          : ''
                      }>
                      <CFormField
                        control={form.control}
                        name="keywords"
                        placeholder="Suggest keywords splited by comma"
                        startAdornment={<HashIcon variant="input" />}
                      />
                    </EditInputWrapper>

                    <EditInputWrapper
                      titleIcon={<InternetIcon variant="label" />}
                      title="Language"
                      value={authorityStatement ? authorityStatement.context.language : ''}>
                      <FormField
                        control={form.control}
                        name="language"
                        render={({ field }) => (
                          <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={<span className="text-neutral06">Suggest language</span>} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.keys(RFC5646_LANGUAGE_TAGS).map(lang => (
                                  <SelectItem key={lang} value={lang}>
                                    <div className="flex items-center gap-1">{RFC5646_LANGUAGE_TAGS[lang]}</div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </EditInputWrapper>
                  </FormSection>

                  <FormSection title="Timeframe attributes">
                    <EditInputWrapper
                      titleIcon={<ClockIcon variant="label" />}
                      title="Duration"
                      value={
                        authorityStatement
                          ? [
                              {
                                text: authorityStatement.context.extensions[
                                  'http://schema.prometheus-x.org/extension/duration'
                                ],
                              },
                            ]
                          : ''
                      }>
                      <div className="flex gap-1">
                        <CFormField
                          control={form.control}
                          type="number"
                          min={1}
                          name="hours"
                          placeholder="Hours"
                          startAdornment={<BackupIcon />}
                        />
                        <CFormField
                          control={form.control}
                          type="number"
                          min={1}
                          max={59}
                          name="minutes"
                          placeholder="Minutes"
                          startAdornment={<ClockCountDownIcon />}
                        />
                        <CFormField
                          control={form.control}
                          type="number"
                          min={1}
                          max={59}
                          name="seconds"
                          placeholder="Seconds"
                          startAdornment={<Clock3 width={16} height={16} stroke="#999999" />}
                        />
                      </div>
                    </EditInputWrapper>
                  </FormSection>

                  <FormSection title="Origin details">
                    <EditInputWrapper
                      titleIcon={<LinkIcon variant="label" />}
                      title="Provider"
                      value={
                        authorityStatement
                          ? authorityStatement.context.extensions['http://schema.prometheus-x.org/extension/provider']
                          : ''
                      }>
                      <CFormField
                        control={form.control}
                        name="provider"
                        placeholder="Suggest provider"
                        startAdornment={<LinkIcon variant="input" />}
                      />
                    </EditInputWrapper>

                    <EditInputWrapper
                      titleIcon={<ReaderIcon variant="label" />}
                      title="Author"
                      value={
                        authorityStatement
                          ? authorityStatement.context.extensions['http://schema.prometheus-x.org/extension/author']
                          : ''
                      }>
                      <CFormField
                        control={form.control}
                        name="author"
                        placeholder="Suggest author"
                        startAdornment={<ReaderIcon variant="input" />}
                      />
                    </EditInputWrapper>

                    <EditInputWrapper
                      titleIcon={<FolderUploadIcon variant="label" />}
                      title="Publisher"
                      value={
                        authorityStatement
                          ? authorityStatement.context.extensions['http://schema.prometheus-x.org/extension/publisher']
                          : ''
                      }>
                      <CFormField
                        control={form.control}
                        name="publisher"
                        placeholder="Suggest publisher"
                        startAdornment={<FolderUploadIcon variant="input" />}
                      />
                    </EditInputWrapper>
                  </FormSection>

                  <FormSection title="Additional info">
                    <EditInputWrapper
                      titleIcon={<ContentIcon variant="label" />}
                      title="Description"
                      isDescription
                      value={
                        authorityStatement
                          ? [
                              {
                                text: authorityStatement.object.definition?.description?.en,
                              },
                            ]
                          : ''
                      }>
                      <CFormField
                        control={form.control}
                        name="description"
                        placeholder="Suggest description"
                        startAdornment={<ContentIcon variant="input" />}
                      />
                    </EditInputWrapper>
                  </FormSection>

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={form.formState.isSubmitting}
                      isLoading={form.formState.isSubmitting}>
                      Save edits
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}

export default EditInformation;
