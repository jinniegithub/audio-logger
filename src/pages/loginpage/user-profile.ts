
export class UserProfile {
	_id : string;
    username : string;
    userid : string;
    hashToken : string;
    userImage : string;
    metadata : any;
	constructor(token:string, metadata:string) {
		console.log("we got data token " + token + " and " + metadata);
		this.hashToken = token;
		this._id = this.hashToken;
	}
}
