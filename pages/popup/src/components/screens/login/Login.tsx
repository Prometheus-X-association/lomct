import { useEffect } from 'react';
import { KeyRound, Mail } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStorageSuspense } from '@chrome-extension-boilerplate/shared';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { fetchXapiStatements } from '@/api/fetchXapiStatements';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AccountIcon, FolderIcon, LinkIcon, LogoutIcon } from '@/assets/icons';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { userDataStorage } from '@chrome-extension-boilerplate/storage';
import CFormField from '@/components/ui/CFormField';

const formSchema = z.object({
  name: z
    .string({
      required_error: 'User name is required',
    })
    .max(30, {
      message: 'The username must not exceed 30 characters.',
    }),
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
  actorEmail: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('Email should be valid.')
    .max(255, { message: 'The email must not exceed 255 characters.' }),
  primarySourceBasicAuth: z.string().length(108, { message: 'This field has to be 108 characters.' }),
  isAcceptVisibleNameAndBio: z.boolean().refine(val => val === true, {
    message: 'Please accept to log in.',
  }),
});

export function Login() {
  const userData = useStorageSuspense(userDataStorage);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData?.name || '',
      biography: userData?.biography || '',
      primarySourceLink: userData?.primarySourceLink || '',
      actorEmail: userData?.actorEmail || '',
      primarySourceBasicAuth: userData?.primarySourceBasicAuth || '',
      isAcceptVisibleNameAndBio: userData?.isAcceptVisibleNameAndBio ?? true,
    },
  });

  useEffect(() => {
    const subscription = form.watch(value => {
      userDataStorage.setUserData(value);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await fetchXapiStatements({ params: `limit=1` });
      userDataStorage.setUserData({ ...values, isLogged: true });
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 bg-white shadow-containerShadow rounded-2xl">
      <h3 className="text-base font-bold">To begin with, enter your informations</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-2">
            <CFormField
              control={form.control}
              name="name"
              labelText="My username"
              placeholder="Add my username"
              startAdornment={<AccountIcon />}
              required
              tooltipText="This is the username that will be visible to the whole community if they edit metadata or add a review."
            />

            <CFormField
              control={form.control}
              name="actorEmail"
              labelText="Email"
              placeholder="Add my email"
              startAdornment={<Mail width={16} height={16} stroke="#999999" />}
              required
              tooltipText="Please enter your email to set up your account."
              tooltipClassName="w-[209px]"
            />
          </div>

          <CFormField
            control={form.control}
            name="biography"
            labelText="My biography"
            placeholder="Add my biography"
            startAdornment={<FolderIcon />}
            tooltipText="The biography can be the work, career, hobby, educational background to build rapport, credibility
            and trust with other users. It will be visible to the whole community if they edit metadata or add a
            review."
          />

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
            tooltipText="Enter the key for the organization where your feedback will be sent."
          />

          <FormField
            control={form.control}
            name="isAcceptVisibleNameAndBio"
            render={({ field }) => (
              <FormItem className="flex items-top gap-2 px-2">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={checked => field.onChange(checked)} />
                </FormControl>
                <FormLabel className="text-xs font-normal" aria-required>
                  l accept that my username and biography are visible when I edit a resource and add a review
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              disabled={form.formState.isSubmitting}
              isLoading={form.formState.isSubmitting}>
              Log in{' '}
              <span className="py-0.5 mx-2 h-full">
                <Separator orientation="vertical" />
              </span>{' '}
              <LogoutIcon />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Login;
