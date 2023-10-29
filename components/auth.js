import {makeAutoObservable} from "mobx";

class Auth{
    auth = false;

    constructor() {
        makeAutoObservable(this)
    }
    setTrue(){
        this.auth = true;
    }
    setFalse(){
        this.auth = false;
    }
}
export default new Auth()