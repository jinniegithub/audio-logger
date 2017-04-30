import { Component } from '@angular/core';
import { NavController, Platform, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Notes } from '../notes/notes';
import { NotesPersistServer } from '../../providers/notes-persist-server';
import { UserProfile } from './user-profile';
import { SignupPage } from '../signuppage/signuppage';
import superlogin from 'superlogin-client';
import { APP_CONFIG } from '../../config/appconfig';

@Component({
    selector: 'login-page',
    templateUrl: 'loginpage.html'
})

export class LoginPage {
    users : Array<UserProfile>;

    error : string;
    errorMessage: string;
    loader : any;
    existLogin: boolean;

    // Given user's id, get token
    routeToHomePage() {
        // check if current user is valid for offline login
        if(superlogin.authenticated()) { //.then(res=>{
            //loader.dismiss();
            this.nav.setRoot(Notes);
            this.loader.dismiss();
        }
        else {
            console.log("Cannot login due to internet connection");
        }
        //});
    }

    public constructor(public nav: NavController, private http: Http, private notesPersister:NotesPersistServer, public loadingCtrl: LoadingController) {
        this.existLogin = true;
        this.loader = this.loadingCtrl.create({
            content: "Login...",
        });
        // TODO: Support multiple users
        //this.users = <Array<UserProfile>> 
        //this.users = [];

        //this.notesPersister.promiseToGetAllUsers().then((data)=> {
        //	//console.log("All Docs " + JSON.stringify(data));
        //	this.users = <Array<UserProfile>> data;
        //});
        superlogin.configure(APP_CONFIG.superloginClientConfig);

        this.notesPersister.offlineUserLogin().then(ret=>{
            this.nav.setRoot(Notes);
        }).catch(error => {
            console.log('Cannot log offline!' + JSON.stringify(error));
            this.existLogin = false;
        });
        // If user logged in, we move forward to next page
    }

    //TODO: argument
    login(username: string, password: string){
        this.loader.present();
        let credentials = {
            username: username,
            password: password
        };

        superlogin.login(credentials).then((res) => {
            console.log(JSON.stringify(res));
            this.notesPersister.setUser(res).then(ret=>{
                console.log('login page ' + JSON.stringify(ret));
                this.routeToHomePage();
            });
        })
        .catch((res) => {
            this.loader.dismiss();
            this.error = res.error;
            this.errorMessage = res.message;
            console.log(JSON.stringify(res));
        })
        this.existLogin = true;
    }

    launchSignup(){
        this.nav.push(SignupPage);
    }



}

