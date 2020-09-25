import { Arguments, Argv } from "yargs";
import { findByName } from "../house/search";
import { argv } from "process";

export function findCustomerByName(yargs: Argv): void {
    // create a new yargs "command"
    yargs.command(
        // name the command with no spaces
        "find-customer-by-name",

        // describe the command so that the --help flag is helpful
        "get a house from saved houses by customer name",

        // define the parameters we need for our command
        {
            search:{
                type:"string",
                alias: "name",
                description: "customer name, -n",
            },     
 
            
        },
       
        // define the function we want to run once the arguments are parsed
        function (
            args: Arguments<{
                search: any;
            }>
        ) {      
            console.log(args.search)
            const customerByName =  findByName(args.search);
            
            console.log(customerByName);
          //  console.log(args);
        }
    )
}
