// import houses from houses
import { Houses } from './houses';
//import IHouseProperties from interface
import { IHouseProperties } from "./interface";
//import buildwall from wallCalculat
import { buildWall} from "../wallCalculator"


//to create and save house to the list of houses, its just to have list for searching,
function newHouseToSave(name:string, width?:number, length?:number){

    //creat a house with customer name
    const house = Houses.create(name);
    
    //enter dimensions 
    house.width = width;
    house.length = length;

    //calculate wood required for a house
    Houses.setWallSuppliesCalculator((inches) => buildWall(inches));  

    //save the house 
    Houses.save( house );


}


// this function to find and return a customer dimensions by using his name
// from the save houses
export function findByName( search:string ){

    // create houses for search -- list --
    newHouseToSave("Khatab",99,50);
    newHouseToSave("Bradley",80,70);
    newHouseToSave("Derek", 200,150);
    // ********************************

    //recall all saved houses
    const savedHouses = Houses.getAll();

    // find the house by customer name or return error msg 
    if(!savedHouses.get( search )){
        return `${search}, is not in the list. Pls check it and try again! or new calculation`;

    } else{
        //recall the house dimensions
        console.log(`${search}, is in the customer list, check it below`)
        let houses = [...savedHouses.values()];
        let customerHouse = houses.find( (element: any)  => element.name === search );
        return customerHouse;
    }
  
}