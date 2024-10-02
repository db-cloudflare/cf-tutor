/*export interface Env {
	// If you set another name in wrangler.toml as the value for 'binding',
	// replace "DB" with the variable name you defined.
	DB: D1Database;
  }
  
  export default {
	async fetch(request, env): Promise<Response> {
	  const { pathname } = new URL(request.url);
  
	  if (pathname === "/api/companies") {
		// If you did not use `DB` as your binding name, change it here
		const { results } = await env.DB.prepare(
		  "SELECT EmployeeID, EmployeeName, CompanyName FROM Employees JOIN Companies ON Employees.CompanyID = Companies.CompanyID;"
		)
		
		  .all();
		return Response.json(results);
	  }
  
	  return new Response(
		"Call /api/companies to view a joined list of all employees from the Employees table along with the name of the company they work for from the Companies table"
	  );
	},
  } satisfies ExportedHandler<Env>;
   */