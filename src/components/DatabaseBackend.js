
const firebase_obj = require('../FirebaseConfig');

class DatabaseBackend {
    constructor() {
        this.state = {'ref':''};
        this.database = firebase_obj.database;
        this.createRoom = this.createRoom.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.setSeek = this.setSeek.bind(this);
        this.getRef = this.getRef.bind(this);
    }

    async createRoom(room_info){
        let ref = await this.database.collection('rooms').doc();
        await ref.set(room_info);
        this.state.ref = ref;
        return ref
    }

    async getRef(room_id){
        console.log(`getting ref ${room_id}`)
        let ref = await this.database.collection(`rooms`).doc(room_id);
        this.state.ref = ref;
        return ref;

    }



    async togglePlay(state){
        this.state.ref.update({"mode":state});
    }

    async setSeek(time){
        await this.state.ref.update({"time":time});
        console.log("Updated")
    }

}

export default DatabaseBackend;