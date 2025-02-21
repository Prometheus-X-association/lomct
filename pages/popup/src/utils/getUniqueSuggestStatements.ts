// Filter and indexOf to get unique objects
export const getUniqueSuggestStatements = (statements: IStatement[]) =>
  statements.filter((obj, index, arr) => {
    return (
      arr.findIndex(o => {
        return (
          JSON.stringify({
            ...o.object,
            ...o.context.extensions,
            'http://schema.prometheus-x.org/extension/biography': '',
            'http://schema.prometheus-x.org/extension/username': '',
          }) ===
          JSON.stringify({
            ...obj.object,
            ...obj.context.extensions,
            'http://schema.prometheus-x.org/extension/biography': '',
            'http://schema.prometheus-x.org/extension/username': '',
          })
        );
      }) === index
    );
  });
