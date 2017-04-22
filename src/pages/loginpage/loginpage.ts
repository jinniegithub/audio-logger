import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

declare var window: any;

@Component({
    templateUrl: 'loginpage.html'
})

export class LoginPage {

    public constructor(public navCtrl: NavController, private platform: Platform) {

    }

    public login() {
        this.platform.ready().then(() => {
            this.facebookLogin().then(success => {
                alert(success.access_token);
            }, (error) => {
                alert(error);
            });
        });
    }

    public facebookLogin(): Promise<any> {
        return new Promise(function(resolve, reject) {
            var CLIENT_ID_HERE = 292180714546839;
            var browserRef = window.cordova.InAppBrowser.open("https://www.facebook.com/v2.0/dialog/oauth?client_id=" + CLIENT_ID_HERE + "&redirect_uri=http://localhost/callback&response_type=token&scope=email", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
            browserRef.addEventListener("loadstart", (event) => {
                if ((event.url).indexOf("http://localhost/callback") === 0) {
                    browserRef.removeEventListener("exit", (event) => {});
                browserRef.close();
                var responseParameters = ((event.url).split("#")[1]).split("&");
                var parsedResponse = {};
                for (var i = 0; i < responseParameters.length; i++) {
                    parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                }
                if (parsedResponse["access_token"] !== undefined && parsedResponse["access_token"] !== null) {
                    resolve(parsedResponse);
                } else {
                    reject("Problem authenticating with Facebook");
                }
                }
            });
            browserRef.addEventListener("exit", function(event) {
                reject("The Facebook sign in flow was canceled");
            });
        });
    }

}

