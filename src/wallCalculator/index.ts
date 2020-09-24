import { string } from "yargs";

const BEAM_WIDTH = 3.5;
const BOARD_LENGTH = 8 * 12;
const WASTE_MULTIPLIER = 0.1;
const STUDS_OFFSET = 16;

// beams are required every 20 feet at minimum
const BEAMS_REQUIRED_EVERY_INCHES = 20 * 12;
const FULL_BOARDS_IN_SECTION = Math.floor(
    BEAMS_REQUIRED_EVERY_INCHES / BOARD_LENGTH
);
const FULL_BOARD_SECTION_SIZE = FULL_BOARDS_IN_SECTION * BOARD_LENGTH;

function convertFeetToInches(feet: number) {
    return feet * 12;
}

function getPlatesInLength(inches: number) {
    // devide the length by 96 inches (8 feet) and round up
    // multiply by two because we're doing the top and bottom in one calculation
    return Math.ceil(inches / BOARD_LENGTH)* 2;
}

function getStudsInLength(inches: number) {
    // calculate the studs across
    // round up to account for the last one
    const studs = Math.ceil(inches / STUDS_OFFSET);

    // make sure we add an end piece if we have a perfect multiple of 16
    const isNotPerfectWidth = Math.min(inches % STUDS_OFFSET, 1);
    const perfectWidthExtension = isNotPerfectWidth * -1 + 1;
    return studs + perfectWidthExtension  ;
}

function getBoardsInLength(inches: number) {
    const plates = getPlatesInLength(inches);
    const studs = getStudsInLength(inches);

    return {
        plates:plates, 
         studs:studs
    };
}

function getRequiredBeamsInLength(inches: number) {
    // for every 20 feet, we need one beam
    // we know our wall is at least 20 feet, so calculate the required beams for the REST of the wall
    // if our wall is under 20 feet, this will return zero
    const wallLengthOverMinRequired = getWallLengthOverMinimumRequiredBeforeBeam(
        inches
    );
    const wallLengthPlusBeam = BEAMS_REQUIRED_EVERY_INCHES + BEAM_WIDTH;
    const requiredBeams = Math.ceil(
        wallLengthOverMinRequired / wallLengthPlusBeam
    );

    return requiredBeams;
}

function getWallLengthOverMinimumRequiredBeforeBeam(inches: number): number {
    return Math.max(inches - BEAMS_REQUIRED_EVERY_INCHES, 0);
}

// any number of inches past BEAMS_REQUIRED_EVERY_INCHES will return 1
// any number of inches below or equal to BEAMS_REQUIRED_EVERY_INCHES return 0
function isBeamRequired(inches: number): number {
    // negative numbers are zero
    const wallLengthOverMinRequired = Math.max(
        inches - BEAMS_REQUIRED_EVERY_INCHES,
        0
    );

    // remove decimals
    const wholeNumber = Math.ceil(wallLengthOverMinRequired);

    // returns 1 (at least one beam required ) or 0 (no beams required)
    const isBeamRequired = Math.min(wholeNumber, 1);

    return isBeamRequired;
}

function getFullSections(inches: number, beams: number) {
    // how many inches will we remove from a section between beams to get to the last full board
    const inchesReducedPerSection =
        BEAMS_REQUIRED_EVERY_INCHES - FULL_BOARD_SECTION_SIZE;

    // how big is the last section if all beams are at BEAMS_REQUIRED_EVERY_INCHES
    const lastSectionSize =
        inches - beams * (BEAMS_REQUIRED_EVERY_INCHES + BEAM_WIDTH);

    // how many inches of boards can we add to the last section before it will add an additional beam to the structure
    const remainingBeforeNewBeam =
        BEAMS_REQUIRED_EVERY_INCHES - lastSectionSize;

    // how many complete portions of the inchesReducedPerSection can we move to the last section
    let fullSections = Math.floor(
        remainingBeforeNewBeam / inchesReducedPerSection
    );

    // even if we can FIT fullSections moved into the last portion, we might not HAVE them in our length
    fullSections = Math.min(fullSections, beams);

    // safeguard inches not requiring a beam and return value
    fullSections = fullSections * isBeamRequired(inches);

    return fullSections;
}

function getLastSectionSize(inches: number, beams: number) {
    const fullSections = getFullSections(inches, beams);
    const lastSectionSize =
        inches - beams * BEAM_WIDTH - fullSections * FULL_BOARD_SECTION_SIZE;

    return lastSectionSize;
}

export function buildWall(inches: number) {
    // get required beams
    const requiredBeams = getRequiredBeamsInLength(inches);
    const fullSections = getFullSections(inches, requiredBeams);
    const lastSectionSize = getLastSectionSize(inches, requiredBeams);
    const studs =
        getBoardsInLength(FULL_BOARD_SECTION_SIZE).studs * fullSections +
        getBoardsInLength(lastSectionSize).studs;

    const plates = 
        getBoardsInLength(FULL_BOARD_SECTION_SIZE).plates * fullSections +
        getBoardsInLength(lastSectionSize).plates;

    return {
        function: "buildWall",
        inches,
        studs: studs,
        beams: requiredBeams,
        plates: plates,
    };
}

function accountForWaste(items: number): number {
    const waste = Math.ceil(items * WASTE_MULTIPLIER);
    return waste + items;
}


export function calculateHouseRequirements(
    widthInFeet: number,
    lengthInFeet: number,
    inches: boolean
) {
    let outerWidthOfHouse = 0;
    let outerLengthOfHouse = 0;
        if(inches){
            console.log("inches")
            outerWidthOfHouse = widthInFeet;
            outerLengthOfHouse = lengthInFeet;
        }
        else{
            outerWidthOfHouse = convertFeetToInches(widthInFeet);
            outerLengthOfHouse = convertFeetToInches(lengthInFeet);
        }
       
    

    //   const outerWidthOfHouse = returnInIches(widthInFeet);
    //   const outerLengthOfHouse = returnInIches(lengthInFeet);


    // calculate the space inbetween corner beams
    const innerWidthOfHouse = outerWidthOfHouse - BEAM_WIDTH * 2;
    const innerLengthOfHouse = outerLengthOfHouse - BEAM_WIDTH * 2;

    const wall1 = buildWall(innerWidthOfHouse);
    const wall2 = buildWall(innerLengthOfHouse);

    const studs = accountForWaste((wall1.studs + wall2.studs) * 2);
    const beams = accountForWaste((wall1.beams + wall2.beams) * 2 + 4);
    const plates = accountForWaste((wall1.plates + wall2.plates) * 2);

    return {
        studs: studs,
        posts: beams,
        plates:plates,
    };
}

// // **************************************
// //to check if the Geralds number by unites or not and return a true flag for unites
// function isUnites(length:String){

//     let isItUnites:boolean = false;

//     length.includes("ft") && length.includes("in")? isItUnites = true: isItUnites = false;
   
//     console.log(isItUnites)

// return isItUnites;
// }

// //to get inches and feet from geralds house dimensions
// function splitFeetInches(aliceFeet:string, aliceInches:string, length:string){

//     let lengthInfeet = length.split(aliceFeet)[0];

//     let lengthInInches = length.split(aliceFeet)[1];
//     lengthInInches = lengthInInches.split(aliceInches)[0];

//   return{
//       inches:lengthInInches,
//       feet:lengthInfeet          
//   }  
// }

// //return the length in inches
// //example: 6ft5in => 77 in
// function returnInIches(length:number) {
    
//     let totalLengthInInches = 0;
//     //to have only lower case for unites check flag
//     // length = length.toLowerCase(); 

  
//     // if (isUnites(length)){
//     //     //in case the dimensions by inches and feet
//     //     let lengthInfeet = splitFeetInches("ft","in",String(length)).feet;

//     //     let lengthInInches = splitFeetInches("ft","in",String(length)).inches;
        

//     //     totalLengthInInches = Number( lengthInfeet) * 12 +  Number(lengthInInches);
//     //     console.log(lengthInInches, lengthInfeet);
        
//     // }else{
//     //     //in case without unites 
//     //     totalLengthInInches = Number( length ) * 12;
//     // }
//     // console.log(totalLengthInInches);
//     // return totalLengthInInches; 
// }

// *********************************************
