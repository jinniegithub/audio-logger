import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NoteItem } from '../pages/notes/noteitem';
import { UserProfile } from '../pages/loginpage/user-profile';
import PouchDB from 'pouchdb';
import 'rxjs/add/operator/map';

/*
 * This is the main server to persist note data to local/server
 * TODO: separate user and note
*/
@Injectable()
export class NotesPersistServer {
    constructor(public http: Http) {
		// TODO: Load from config
        this.remoteAddress = 'http://admin:couchdblover1@ec2-54-169-88-67.ap-southeast-1.compute.amazonaws.com:5984';
		this.localUser = new PouchDB("localuser"); // read local user
    }

	localUser: any;
    localDocumentDb: any;
	remoteDocumentDb: any;
    remoteAddress: any;
	currentUser: UserProfile;

	promiseToGetAllUsers() {
		return this.localUser.allDocs({
			include_docs: true,
			attachments: true
		}).then((results)=>{
			console.log("All Users: " + JSON.stringify(results));
			return results.rows.map((row)=>{return row.doc;});
		});
	}

	setUser(user:UserProfile) {
		console.log("User Profile: " + user);
		this.currentUser = user;
		// https://github.com/pouchdb/upsert
		let data = JSON.stringify(user);
		this.localUser.get(user._id).catch((error)=>{
			// no such user
			console.log("Stringify data: " + data);
			this.localUser.put(user);
		}); // or userid?
	}
    
    // Init local database and initial sync with remote
    initDatabase(user:UserProfile) {
		console.log("Database Initialize and Sync");
        this.localDocumentDb = new PouchDB("test"); // should be user.hashToken
		this.remoteDocumentDb = new PouchDB(this.remoteAddress + "/test");

		let options = {
			live: true,
			retry: true,
			continuous: true
		};

		//TODO: async and retrieve results to noteitem
		console.log("Start to syncing!...");
        //this.localDocumentDb.sync(this.remoteDocumentDb, options);
    }

	addNoteItem(note: NoteItem) {
		console.log("Get JSON Note " + JSON.stringify(note));
		this.localDocumentDb.post(note);
	}

	promiseToGetNoteItems() {
		return this.localDocumentDb.allDocs({
			include_docs: true,
			attachments: true,
			descending: true
		}).then((response) => {
			return response.rows.map((x)=>{return x.doc;});;
		});
		//if (err) { return console.log(err); }
	}
}
