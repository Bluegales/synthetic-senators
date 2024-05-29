const go = async () => {
    // get list of proposals
    const query = `
        query Proposals($chainId: ChainID!, $pagination: Pagination, $sort: ProposalSort) {
        proposals(chainId: $chainId, pagination: $pagination, sort: $sort) {
        id
        title
        description
        eta
        governor {
          name
        }
        voteStats {
          support
          weight
          votes
          percent
        }
        }
      }
      `;
    const variables = {
        chainId: "eip155:1",
        pagination: { limit: 1, offset: 0 },
        sort: { field: "START_BLOCK", order: "DESC" },
    };
    const url = 'https://api.tally.xyz/query';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Api-Key': apiKey,
        },
        body: JSON.stringify({
            query: query,
            variables: variables,
        }),
    });

    // This is could be an option if the many requests to the api are a problem
    // const response = await Lit.Actions.runOnce({ waitForResponse: true, name: "txnSender" }, async () => {
    //     return await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",
    //             'Api-Key': apiKey,
    //         },
    //         body: JSON.stringify({
    //             query: query,
    //             variables: variables,
    //         }),
    //     });
    // });

    if (!response.ok) {
        LitActions.setResponse({ response: "Network response was not ok" });
        throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();

    if (data.errors) {
        LitActions.setResponse({ response: "Error when fetching data" });
        console.error('Error when fetching data:', data.errors);
        return null;
    }

    console.log(data.data);
};

go();
