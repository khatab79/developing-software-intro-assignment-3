// example from locatation relative to index.ts
import { Houses } from './house/houses'

import { IHouse, IHouseProperties, IWallCalculatorResponse } from "./house/interface";

import { buildWall } from "./wallCalculator/index";


export class MyHouse extends Houses {
    
    private  calculator: (
        inches: number
        
    ) => IWallCalculatorResponse = function (): IWallCalculatorResponse {
        let x = buildWall(this.inches);

        return {
            posts: x.beams,
            studs: x.studs,
            plates: x.plates,
        };
    };
}

const house  = new MyHouse();
// const khatab = house.create()
console.log(house);