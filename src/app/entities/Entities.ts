import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable()
export class Entities {
    jwtTokenKey: any;
    refreshToken: any;
    verificationId: any;
    confirmationResult: any;
    mobileRegister: any;
    username: any;
    roomName: any;
    lstUserStock: [];

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

    getverificationId(){
        return this.verificationId;
    }

    setverificationId(value){
        this.verificationId = value;
    }

    getconfirmationResult(){
        return this.confirmationResult;
    }
    setconfirmationResult(value){
        this.confirmationResult = value;
    }

    getMobileRegister(){
        return this.mobileRegister;
    }

    setMobileRegister(value){
        this.mobileRegister = value;
    }

    getUsername(){
        return this.username;
    }

    setUsername(value){
        this.username = value;
    }

    getRoomName(){
        return this.roomName;
    }

    setRoomName(value){
        this.roomName = value;
    }

    getLstUserStock(){
        return this.lstUserStock;
    }

    setLstUserStock(value){
        this.lstUserStock = value;
    }
}