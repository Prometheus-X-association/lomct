import BackButton from '@/components/common/BackButton';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import TextMuted from '@/components/ui/TextMuted';
import { Rating } from 'react-simple-star-rating';
import { EmptyStarIcon, StarIcon } from '@/assets/icons';
import { Textarea } from '@/components/ui/textarea';
import AddReviewSuccess from './AddReviewSuccess';
import { useState } from 'react';
import { fetchXapiStatements } from '@/api/fetchXapiStatements';
import { useStatementsStore } from '@/store/store';
import { IReviewStatement } from '@/types/reviewStatement';
import { useStorageSuspense } from '@chrome-extension-boilerplate/shared';
import { userDataStorage } from '@chrome-extension-boilerplate/storage';

const formSchema = z.object({
  comment: z.string().max(1000, {
    message: 'The level must not exceed 1000 characters.',
  }),
  rate: z.number(),
});

function AddReview() {
  const userData = useStorageSuspense(userDataStorage);
  const addReviewStatement = useStatementsStore(state => state.addReviewStatement);
  const statementId = useStatementsStore(state => state.statementId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rate: 0,
      comment: '',
    },
  });
  const [isSuccessful, setIsSuccessful] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      context: {
        extensions: {
          'http://schema.prometheus-x.org/extension/username': userData?.name || '',
          'http://schema.prometheus-x.org/extension/biography': userData?.biography || '',
        },
        language: 'en',
      },
      actor: {
        objectType: 'Agent',
        name: userData?.name || '',
        mbox: 'mailto:' + userData?.actorEmail,
      },
      object: { id: statementId },
      verb: { id: 'http://id.tincanapi.com/verb/reviewed', display: { 'en-US': 'reviewed' } },
      result: { score: { raw: values.rate }, response: values.comment },
      stored: new Date().toISOString(),
    } as IReviewStatement;

    const [respData] = await fetchXapiStatements({
      method: 'POST',
      data,
    });

    setIsSuccessful(true);
    addReviewStatement({ ...data, id: respData[0] });
    // setIsSuccessful(true);
    // userDataStorage.setUserData(values);
  }

  return (
    <>
      <div className="mb-4">
        <BackButton />
      </div>
      {isSuccessful ? (
        <AddReviewSuccess />
      ) : (
        <div className="h-[496px] p-4 flex flex-col gap-4 bg-white shadow-containerShadow rounded-2xl">
          <h3 className="text-base font-bold ">Add review</h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-full space-y-4">
              <div className="h-full flex flex-col gap-3">
                <div className="h-full flex flex-col gap-2 p-3 bg-neutral01 rounded-2xl">
                  <div className="p-3 flex flex-col gap-3 bg-white rounded-2xl">
                    <div className="flex justify-between">
                      <b className="font-semibold text-sm">Rate the source</b>
                      <TextMuted variant="s">
                        {form.watch('rate')} star{form.watch('rate') > 1 || form.watch('rate') === 0 ? 's' : ''}
                      </TextMuted>
                    </div>
                    <FormField
                      control={form.control}
                      name="rate"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <div className="flex justify-center">
                              <Rating
                                SVGclassName="inline"
                                SVGstyle={{ display: 'inline' }}
                                fillIcon={<StarIcon size="m" />}
                                emptyIcon={<EmptyStarIcon size="m" />}
                                initialValue={0}
                                transition
                                allowFraction
                                onClick={(value: number) => {
                                  field.onChange(value);
                                }}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="h-full p-3 flex flex-col gap-3 bg-white rounded-2xl">
                    <div>
                      <b className="font-semibold text-sm">Leave a comment</b>
                    </div>
                    <FormField
                      control={form.control}
                      name="comment"
                      render={({ field }) => (
                        <FormItem className="h-full">
                          <FormControl>
                            <Textarea
                              required
                              placeholder="Type your review"
                              className="h-full resize-none"
                              {...field}
                              onBlur={() => {
                                form.setValue('comment', field.value.trim(), { shouldDirty: true });
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    size="lg"
                    isLoading={form.formState.isSubmitting}
                    disabled={!form.formState.isDirty || form.formState.isSubmitting}>
                    Submit review
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}

export default AddReview;
