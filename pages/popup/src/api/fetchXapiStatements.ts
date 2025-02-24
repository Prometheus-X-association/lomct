import { IReviewStatement } from '@/types/reviewStatement';
import { IStatement } from '@/types/statement';
import { userDataStorage } from '@chrome-extension-boilerplate/storage';

// export const fetchXapiStatements = async (method: 'GET' | 'POST', params: string) => {
export const fetchXapiStatements = async (
  args: { method?: 'GET' | 'POST'; params?: URLSearchParams; data?: IStatement | IReviewStatement } | undefined,
) => {
  const { method = 'GET', params, data } = args || {};
  const userData = await userDataStorage.get();
  if (!userData) {
    throw new Error('userDataStorage is not defined');
  }

  const sources = [
    {
      endpoint: userData.primarySourceLink + '/statements?' + new URLSearchParams(params).toString(),
      authToken: userData.primarySourceBasicAuth,
    },
  ];
  if (userData?.secondarySourceLink && userData.isSecondaryLinkActive) {
    sources.push({
      endpoint: userData.secondarySourceLink + '/statements?' + new URLSearchParams(params).toString(),
      authToken: userData.secondarySourceBasicAuth,
    });
  }

  try {
    const responses = await Promise.all(
      sources.map(({ endpoint, authToken }) =>
        fetch(endpoint, {
          method: method || 'GET',
          headers: {
            Authorization: `Basic ${authToken}`,
            'X-Experience-API-Version': '1.0.3',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }),
      ),
    );

    const responsesData = [];
    for await (const resp of responses) {
      if (!resp.ok) {
        const data = await resp.json();
        console.log('resp', resp);
        console.log('data', data);

        alert(data?.message || 'Something went wrong. Please check all fields and try again.');
        throw new Error(resp);
      }

      const r = await resp.json();
      responsesData.push(r);
    }
    return responsesData;
  } catch (error) {
    console.error('error', error);
    throw error;
  }
};
