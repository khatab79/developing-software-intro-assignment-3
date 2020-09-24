import { Arguments, Argv } from "yargs";
import { calculateHouseRequirements } from "../wallCalculator";
import { argv } from "process";

export function calcWoodNeeded(yargs: Argv): void {
    // create a new yargs "command"
    yargs.command(
        // name the command with no spaces
        "calc-wood-needed",

        // describe the command so that the --help flag is helpful
        "Calculate the number of studs required to stick frame a house for Gerald",

        // define the parameters we need for our command
        {
            width: {
                type: "number",
                alias: "w",
                description: "The width of the house",                
            },

            length: {
                type: "number",
                alias: "l",
                description: "The length of the house",
            },
            //using a flag for having the calculation in inches unite
            // or by feet 
            inches: {
                type:"boolean",
                alias: "i",
                description: "length unites in inches",
            },      
            
        },
       
        // define the function we want to run once the arguments are parsed
        function (
            args: Arguments<{
                width: number;
                length: number;
                inches: boolean;
         
                
                // w: number;
                // l: number;
            }>
        ) {      

            const requirements = calculateHouseRequirements(
                args.width,
                args.length,
                args.inches
            );


            console.log(requirements);
          //  console.log(args);
        }
    )
}
