import "reflect-metadata"
import {plainToClass} from 'class-transformer'
import {} from 'class-validator'

import { ProductSectionTwelve } from "product.model";

const p1 = new ProductSectionTwelve('A Book', 12.99);

console.log(p1.getInformation())