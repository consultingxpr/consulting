import {AbstractControl} from '@angular/forms';
import { isError } from 'util';

export function passValidation(control : AbstractControl){
    if(control && (control.value !== null || control.value !== undefined)){
      const cpass =  control.value ;
      const pass = control.root.get('password');
      if(pass){
        const passVal = pass.value ;
        if(passVal != cpass ){
          return {
            isError : true
          }
        }
      }else{
        return{ 
        isError : false
        }
      }
  
    }
    return null ; 
  }


  export function emailValidation(control : AbstractControl){
    if(control && (control.value !== null || control.value !== undefined)){
      const regex = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
      if(!regex.test(control.value)){
          return {
            isError : true
          }
        }
      
  
    }
    return null ; 
  }
  
  export function cinValidation(control : AbstractControl){
    if(control && (control.value !== null || control.value !== undefined)){
      const regex = new RegExp(/^\d{4}-?\d{4}$/);
      if(!regex.test(control.value)){
          return {
            isError : true
          }
        }  
    }
    return null ; 
  }

  
  export function ribValidation(control : AbstractControl){
    if(control && (control.value !== null || control.value !== undefined)){
      const regex = new RegExp(/^\d{10}-?\d{10}$/);
      if(!regex.test(control.value)){
          return {
            isError : true
          }
        }  
    }
    return null ; 
  }