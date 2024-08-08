
// Todo - Check requests for a pre-shared secret


// Todo - authorize the secret


export default {
	async fetch(request, env, ctx) {
	  const url = new URL(request.url);
	  const key = url.pathname.slice(1);
	//Todo - forbid unauthorized requests
	  
  
	  switch (request.method) {
		//Todo - PUT method 

		//Todo - GET method 

		//Todo - DELETE method 
		
		default:
		//Todo - handle unsupported methods.
			
	  }
	},
  };