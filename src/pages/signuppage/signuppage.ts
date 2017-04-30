import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController } from 'ionic-angular';
import { Notes } from '../notes/notes';
import { NotesPersistServer } from '../../providers/notes-persist-server';
import { UserProfile } from './user-profile';
import { LoginPage } from '../loginpage/loginpage';
import superlogin from 'superlogin-client';

@Component({
  selector: 'signup-page',
  templateUrl: 'signuppage.html'
})
export class SignupPage {
 
  constructor(public nav: NavController, public http: Http, private notesPersister:NotesPersistServer) {
 
  }
 
  register(
      name:string,
      username:string, 
      email:string,
      password:string,
      confirmPassword:string
      ){
 
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
 
      let user = {
        name: name,
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      };
 
      superlogin.register(user).then(res=>{
		this.nav.setRoot(LoginPage);
      }).catch(error=> {
          console.log(JSON.stringify(error));
      });

  }
 
}
