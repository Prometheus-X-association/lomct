import { useEffect } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
// import { userDataStorage } from '@chrome-extension-boilerplate/storage';
import { useForm } from 'react-hook-form';
import { useStatementsStore } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LinkIcon, ResearchIcon } from '@/assets/icons';
import Information from '../information/Information';
import Reviews from '../reviews/Reviews';

const formSchema = z.object({
  statementId: z
    .string({
      required_error: 'Source link is required',
    })
    .url({
      message: 'Link should be valid.',
    }),
});
function Main() {
  const fetchStatements = useStatementsStore(state => state.fetchStatements);
  const isLoaded = useStatementsStore(state => state.isLoaded);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      statementId: '',
    },
    mode: 'onSubmit',
  });

  const setCurrentTabUrl = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const currentTab = tabs[0]; // there will be only one in this array
      setTimeout(() => {
        if (currentTab.url) {
          form.setValue('statementId', currentTab.url || '');
          fetchStatements(currentTab.url);
        }
      }, 100);
    });
  };

  useEffect(() => {
    try {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0].id && !tabs[0]?.url?.includes('://www.youtube.com')) {
          chrome.tabs.sendMessage(tabs[0].id, { data: 'canonical' }, href => {
            if (href) {
              form.setValue('statementId', href);
              fetchStatements(href);
            } else {
              setCurrentTabUrl();
            }
          });
        } else {
          setCurrentTabUrl();
        }
      });
    } catch (error) {
      setCurrentTabUrl();
    }
  }, [form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    fetchStatements(values.statementId);
  };

  return (
    <div
      className={
        isLoaded ? '' : "h-[532px] bg-[url('/illustration.png')] bg-contain bg-[center_top_70px] bg-no-repeat"
      }>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="statementId"
            render={({ field, fieldState }) => (
              <FormItem className="relative px-6 z-10">
                <FormControl>
                  <Input
                    required
                    isError={!!fieldState.error}
                    placeholder="Add a link"
                    startAdornment={<LinkIcon />}
                    endAdornment={
                      <Button
                        type="submit"
                        isLoading={isLoaded === null}
                        disabled={isLoaded === null || form.getValues('statementId') === ''}>
                        <ResearchIcon />
                      </Button>
                    }
                    {...field}
                  />
                </FormControl>
                {!isLoaded && <FormMessage className="absolute" />}
              </FormItem>
            )}
          />
        </form>
      </Form>

      {isLoaded && (
        <>
          <Information />
          <Reviews />
        </>
      )}

      {/* {!isLoaded && (
        <Button
          className="absolute bottom-3 right-3"
          onClick={() =>
            userDataStorage.setUserData({
              name: '',
              biography: '',
              primarySourceLink: '',
              secondarySourceLink: '',
              isAcceptVisibleNameAndBio: true,
              isLogged: false,
            })
          }>
          Logout
        </Button>
      )} */}
    </div>
  );
}

export default Main;
