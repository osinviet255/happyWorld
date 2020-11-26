import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable()
export class Entities {
    jwtTokenKey: any;
    refreshToken: any;

    constructor(){

    }

    getJwtTokenKey(){
        return this.jwtTokenKey;
    }

    setJwtTokenKey(value){
        this.jwtTokenKey = value;
    }

    getRefreshToken(){
        return this.refreshToken;
    }

    setRefreshToken(value){
        this.refreshToken = value;
    }
}