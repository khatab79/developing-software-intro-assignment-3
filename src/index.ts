// import yargs to re-use code from someone else that has already 
import yargs = require( 'yargs' );

//import funtion calcWoodNeeded
import { calcWoodNeeded } from './commands/calc-wood-needed';

//import funtion findCustomerByName
import { findCustomerByName } from './commands/find-customer-by-name'

//to calculate total wood required ( studs, posts, plates )
calcWoodNeeded( yargs );

//to recall prior house builds without knowing their dimensions
findCustomerByName( yargs );

// tell yargs to include the --help flag
yargs.help();

// tell yargs to parse the parameters
yargs.parse();