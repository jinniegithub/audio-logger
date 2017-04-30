export class UserProfile {
	_id : string;
    username : string;
    userid : string;
    hashToken : string;
    userImage : string;
	remoteDbs : string;
	password:string;
	metadata:any;
	constructor(metadata) {
		this.metadata = metadata;
		this.userid = metadata.user_id;
		this.remoteDbs = metadata.userDBs.audiologger;
		this.hashToken = metadata.token;
		this.password = metadata.password;
		this._id = this.userid;
	}
}
