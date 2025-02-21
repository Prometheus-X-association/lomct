import '@src/Options.css';
import '@src/globals.css';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import { KeyRound, Mail } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { AccountIcon, FolderIcon, LinkIcon, DeviceIcon } from '@/assets/icons';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/hooks/use-toast';
import { userDataStorage } from '@chrome-extension-boilerplate/storage';
import CFormField from '@/components/ui/CFormField';

import * as React from 'react';

const formSchema = z.object({
  name: z
    .string({
      required_error: 'User name is required',
    })
    .max(30, {
      message: 'The username must not exceed 30 characters.',
    }),
  actorEmail: z.string().min(1, { message: 'This field has to be filled.' }).email('Email should be valid.'),
  biography: z
    .string({
      required_error: 'Biography is required',
    })
    .max(60, {
      message: 'The biography must not exceed 60 characters.',
    }),
  primarySourceLink: z
    .string({
      required_error: 'Source link is required',
    })
    .url({
      message: 'Link should be valid.',
    }),
  primarySourceBasicAuth: z.string().min(1, { message: 'This field has to be filled.' }).or(z.literal('')),
  secondarySourceLink: z
    .string()
    .url({
      message: 'Link should be valid.',
    })
    .optional()
    .or(z.literal('')),
  secondarySourceBasicAuth: z.string().optional().or(z.literal('')),
  isSecondaryLinkActive: z.boolean(),
});

const Options = () => {
  const { toast } = useToast();
  const userData = useStorageSuspense(userDataStorage);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData?.name || '',
      actorEmail: userData?.actorEmail || '',
      biography: userData?.biography || '',
      primarySourceLink: userData?.primarySourceLink || '',
      primarySourceBasicAuth: userData?.primarySourceBasicAuth || '',
      secondarySourceLink: userData?.secondarySourceLink || '',
      secondarySourceBasicAuth: userData?.secondarySourceBasicAuth || '',
      isSecondaryLinkActive: userData?.isSecondaryLinkActive ?? false,
    },
  });

  React.useEffect(() => {
    form.reset({
      name: userData?.name || '',
      actorEmail: userData?.actorEmail || '',
      biography: userData?.biography || '',
      primarySourceLink: userData?.primarySourceLink || '',
      primarySourceBasicAuth: userData?.primarySourceBasicAuth || '',
      secondarySourceLink: userData?.secondarySourceLink || '',
      secondarySourceBasicAuth: userData?.secondarySourceBasicAuth || '',
      isSecondaryLinkActive: userData?.isSecondaryLinkActive ?? false,
    });
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const resp = await fetch(values.primarySourceLink + '/statements?limit=1', {
        headers: {
          Authorization: `Basic ${values.primarySourceBasicAuth}`,
          'X-Experience-API-Version': '1.0.3',
        },
      });

      if (!resp.ok) {
        const data = await resp.json();
        console.log('primary resp', resp);
        console.log('primary data', data);

        alert(data?.message || 'Something went wrong with primary source. Please check all fields and try again.');
      }

      if (values.secondarySourceLink && values.isSecondaryLinkActive) {
        const resp = await fetch(values.secondarySourceLink + '/statements?limit=1', {
          headers: {
            Authorization: `Basic ${values.secondarySourceBasicAuth}`,
            'X-Experience-API-Version': '1.0.3',
          },
        });

        if (!resp.ok) {
          const data = await resp.json();
          console.log('secondary resp', resp);
          console.log(' secondary data', data);

          alert(data?.message || 'Something went wrong with secondary source. Please check all fields and try again.');
        }
      }
      userDataStorage.setUserData({ ...userData, ...values });
      form.reset({ ...userData, ...values });
      toast({
        description: 'All data successfully updated',
      });
      return;
    } catch (error) {
      console.error('error', error);
      return;
    }
  }
  return (
    <>
      <header className="px-6 py-2 flex items-center justify-center gap-1 bg-[#D2E8FF]">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 11C11.7348 11 11.4804 11.1054 11.2929 11.2929C11.1054 11.4804 11 11.7348 11 12V15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15V12C13 11.7348 12.8946 11.4804 12.7071 11.2929C12.5196 11.1054 12.2652 11 12 11ZM12 8C11.8022 8 11.6089 8.05865 11.4444 8.16853C11.28 8.27841 11.1518 8.43459 11.0761 8.61732C11.0004 8.80004 10.9806 9.00111 11.0192 9.19509C11.0578 9.38907 11.153 9.56725 11.2929 9.70711C11.4327 9.84696 11.6109 9.9422 11.8049 9.98079C11.9989 10.0194 12.2 9.99957 12.3827 9.92388C12.5654 9.84819 12.7216 9.72002 12.8315 9.55557C12.9414 9.39112 13 9.19778 13 9C13 8.73478 12.8946 8.48043 12.7071 8.29289C12.5196 8.10536 12.2652 8 12 8ZM12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92894 4.92893C3.05357 6.8043 2 9.34784 2 12C1.99126 14.3091 2.7908 16.5485 4.26 18.33L2.26 20.33C2.12125 20.4706 2.02725 20.6492 1.98988 20.8432C1.9525 21.0372 1.97342 21.2379 2.05 21.42C2.13306 21.5999 2.26771 21.7511 2.43685 21.8544C2.60599 21.9577 2.802 22.0083 3 22H12C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2ZM12 20H5.41L6.34 19.07C6.43449 18.9774 6.50966 18.8669 6.56116 18.7451C6.61265 18.6232 6.63945 18.4923 6.64 18.36C6.63625 18.0962 6.52842 17.8446 6.34 17.66C5.03059 16.352 4.21518 14.6305 4.03269 12.7888C3.85021 10.947 4.31195 9.09901 5.33923 7.55952C6.36652 6.02004 7.89579 4.88436 9.66652 4.34597C11.4372 3.80759 13.3399 3.8998 15.0502 4.60691C16.7606 5.31402 18.1729 6.59227 19.0464 8.22389C19.92 9.85551 20.2009 11.7395 19.8411 13.555C19.4814 15.3705 18.5033 17.005 17.0735 18.1802C15.6438 19.3554 13.8508 19.9985 12 20Z"
            fill="#6563FF"
          />
        </svg>
        <h1 className="text-2xl leading-4 font-bold">LOMCT!</h1>
      </header>
      <div className="App-container bg-radialGradient flex items-center gap-x-2.5">
        <div className="relative w-full flex justify-center mt-[50px]">
          <img className="absolute" src={chrome.runtime.getURL('options/group.png')} alt="img" />
          <div className="w-[640px] p-4 flex flex-col gap-4 bg-white shadow-containerShadow rounded-2xl z-10">
            <h3 className="text-base font-bold">Settings</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <CFormField
                  control={form.control}
                  name="name"
                  labelText="My username"
                  placeholder="Add my username"
                  startAdornment={<AccountIcon />}
                  required
                  tooltipText="This is the username that will be visible to the whole community if they edit metadata or add a review"
                />
                <CFormField
                  control={form.control}
                  name="actorEmail"
                  labelText="Email"
                  placeholder="Add my email"
                  startAdornment={<Mail width={16} height={16} stroke="#999999" />}
                  required
                  // onBlur={() => userDataStorage.setUserData({ name: form.getValues('actorEmail') })}
                  tooltipText="Please enter your email to set up your account."
                />
                <CFormField
                  control={form.control}
                  name="biography"
                  labelText="My biography"
                  placeholder="Add my biography"
                  startAdornment={<FolderIcon />}
                  tooltipText="The biography can be the work, career, hobby, educational background to build rapport, credibility
            and trust with other users. It will be visible to the whole community if they edit metadata or add a
            review."
                />{' '}
                <CFormField
                  control={form.control}
                  name="primarySourceLink"
                  labelText="Primary source link"
                  placeholder="Add my primary source link"
                  startAdornment={<LinkIcon variant="input" />}
                  onPasteBtnClick={val => form.setValue('primarySourceLink', val)}
                  required
                  tooltipText="Enter the URL of the organization where you want to share your feedback."
                />
                <CFormField
                  control={form.control}
                  name="primarySourceBasicAuth"
                  labelText="Primary source basic auth"
                  placeholder="Add basic auth"
                  startAdornment={<KeyRound width={16} height={16} stroke="#999999" />}
                  onPasteBtnClick={val => form.setValue('primarySourceBasicAuth', val)}
                  required
                  // onBlur={() => userDataStorage.setUserData({ name: form.getValues('primarySourceBasicAuth') })}
                  tooltipText="Enter the key for the organization where your feedback will be sent."
                />
                <div className="flex gap-[10px]">
                  <CFormField
                    control={form.control}
                    name="secondarySourceLink"
                    labelText="Secondary source link"
                    placeholder="Add my primary source link"
                    startAdornment={<LinkIcon variant="input" disabled={!form.getValues('isSecondaryLinkActive')} />}
                    onPasteBtnClick={val => form.setValue('secondarySourceLink', val)}
                    disabled={!form.getValues('isSecondaryLinkActive')}
                    required={form.getValues('isSecondaryLinkActive')}
                    tooltipText="Enter the URL of the secondary organization where you want to share your feedback."
                  />
                  <FormField
                    control={form.control}
                    name="isSecondaryLinkActive"
                    render={({ field }) => (
                      <FormItem className="relative top-[34px]">
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <CFormField
                  control={form.control}
                  name="secondarySourceBasicAuth"
                  labelText="Secondary source basic auth"
                  placeholder="Add basic auth"
                  startAdornment={<KeyRound width={16} height={16} stroke="#999999" />}
                  onPasteBtnClick={val => form.setValue('secondarySourceBasicAuth', val)}
                  disabled={!form.getValues('isSecondaryLinkActive')}
                  required={form.getValues('isSecondaryLinkActive')}
                  // onBlur={() => userDataStorage.setUserData({ name: form.getValues('primarySourceBasicAuth') })}
                  tooltipText="Enter the key for the secondary organization where your feedback will be sent."
                />
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={!form.formState.isDirty}
                    isLoading={form.formState.isSubmitting}>
                    Save
                    <span className="py-0.5 mx-2 h-full">
                      <Separator orientation="vertical" />
                    </span>
                    <DeviceIcon />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default withErrorBoundary(withSuspense(Options, <div> Loading ... </div>), <div> Error Occur </div>);
