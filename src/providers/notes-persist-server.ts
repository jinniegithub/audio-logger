import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { NoteItem } from '../pages/notes/noteitem';
import { UserProfile } from '../pages/loginpage/user-profile';
import PouchDB from 'pouchdb';



/*
 * This is the main server to persist note data to local/server
 * TODO: separate user and note
 */
@Injectable()
export class NotesPersistServer {
    constructor(public http: Http, public storage: Storage) {
        // TODO: Load from config
        this.remoteAddress = '';
        this.localUser = new PouchDB("localuser"); // read local user
        this.syncProgress = null;
        this.currentUserId = null;
    }

    localUser: any;
    localDocumentDb: any;
    remoteDocumentDb: any;
    remoteAddress: any;
    currentUserId: string;

    syncProgress : any;

    offlineUserLogin() {
        return this.storage.ready().then(res=> {
            return this.storage.get('currentUserId').then(val=>{
                this.currentUserId = val;
                console.log('Current user id ' + this.currentUserId);
                if(this.currentUserId) {
                    return this.localUser.get(this.currentUserId).then(res=>{
                        console.log('currentUserId docs output' + JSON.stringify(res));
                        return this.init(res.metadata);
                    }); // or userid?
                }
                else {
                    throw 'No current user id';
                }
            });
        });

    }

    init(details) {

        console.log("init...");
        this.remoteAddress = details.userDBs.audiologger;
        //superlogin client seems to save everything on local storage
        this.remoteDocumentDb = new PouchDB(this.remoteAddress);
        this.localDocumentDb = new PouchDB(details.user_id);

        let options = {
            live: true,
            retry: true,
            continuous: true
        };

        //TODO: async and retrieve results to noteitem
        // Sync never finish until it stop
        return this.localDocumentDb.replicate.from(this.remoteDocumentDb).then(ret=>{
            return this.localDocumentDb.replicate.to(this.remoteDocumentDb).then(ret=>{
                console.log('One single shot sync finished...');
                this.syncProgress = this.localDocumentDb.sync(this.remoteDocumentDb, options);
            });
        });
    }

    logout() {
        console.log("Stop syncing");
        this.syncProgress.cancel();
        return this.syncProgress.then(ret=>{
            return this.localDocumentDb.destroy().then(ret=> {
                console.log("local db removed");
                this.currentUserId = null;
                return this.storage.set("currentUserId", this.currentUserId).then(ret=>{
                    console.log("currentUserId updated");
                });
            });
        });
    }
    promiseToGetAllUsers() {
        return this.localUser.allDocs({
            include_docs: true,
            attachments: true
        }).then((results)=>{
            console.log("All Users: " + JSON.stringify(results));
            return results.rows.map((row)=>{return row.doc;});
        });
    }

    setUser(details) {
        console.log(JSON.stringify(details));
        let user = new UserProfile(details);

        return this.storage.set('currentUserId', user._id).then(ret=>{
            console.log(user._id + "saved in local storage");
            // https://github.com/pouchdb/upsert
            this.localUser.get(user._id).catch((error)=>{
                // no such user
                return this.localUser.put(user).then(ret=>{

                });
            }); // or userid?
            return this.init(details);
        });

    }

    databaseReady() {
        return this.localUser.info().then(ret=>{
            return this.localDocumentDb.info().then(ret=>{
                //return this.remoteDocumentDb.info().then(ret=>{
                //});
            });
        });
    }
    // Init local database and initial sync with remote
    //initDatabase(user:UserProfile) {
    //	console.log("Database Initialize and Sync");
    //    this.localDocumentDb = new PouchDB("test"); // should be user.hashToken
    //	this.remoteDocumentDb = new PouchDB(this.remoteAddress + "/test");

    //	let options = {
    //		live: true,
    //		retry: true,
    //		continuous: true
    //	};

    //	//TODO: async and retrieve results to noteitem
    //	console.log("Start to syncing!...");
    //    this.localDocumentDb.sync(this.remoteDocumentDb, options);
    //}

    addNoteItem(note: NoteItem) {
        return this.databaseReady().then(ret=>{
            console.log("Get JSON Note " + JSON.stringify(note));
            return this.localDocumentDb.post(note);
        }).catch(err=>{
            console.log('Database not ready!');
        });
    }

    promiseToGetNoteItems() {
        return this.databaseReady().then(ret=>{
            return this.localDocumentDb.allDocs({
                include_docs: true,
                attachments: true,
                descending: true
            }).then((response) => {
                return response.rows.map((x)=>{return x.doc;});;
            });
        }).catch(err=>{
        });
        //if (err) { return console.log(err); }
    }
}
