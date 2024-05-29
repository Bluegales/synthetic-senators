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
	  const apiKey = 'd0c4916e4e60c95b3c77a22eb83e158638109a937c76210eafca951a3e950f5d'; // Replace with your actual API key
	  
	  const response = await fetch(url, {
		method: 'POST',
		headers: {
		"Content-Type": "application/json",
		'Api-Key': apiKey, // If an API key is required
		},
		body: JSON.stringify({
		query: query,
		variables: variables,
		}),
	  });
	  
	  
	  
	  if (!response.ok) {
		// LitActions.setResponse({ response: "Network response was not ok" });
		throw new Error('Network response was not ok ' + response.statusText);
	  }
	  
	  const data = await response.json();
	  
	  if (data.errors) {
		// LitActions.setResponse({ response: "Error when fetching data"});
		console.error('Error when fetching data:', data.errors);
		return null;
	  }
	  
	  console.log(data.data);

	  return data.data;

	// this requests a signature share from the Lit Node
	// the signature share will be automatically returned in the HTTP response from the node
	// all the params (toSign, publicKey, sigName) are passed in from the LitJsSdk.executeJs() function
	// const sigShare = await LitActions.signEcdsa({ toSign, publicKey , sigName });
};

go();