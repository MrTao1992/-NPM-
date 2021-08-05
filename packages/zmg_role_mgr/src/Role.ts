
class Role implements zmgRoleMgr.IRole {
    static _ins: Role;
    static getIns(): Role {
        if (!this._ins) {
            this._ins = new Role();
        }
        return this._ins;
    }
    static killAll(): void {
        console.log('杀死所有人！');
    }
    public hello(): void {
        console.log("Say hello");
    }
}

export let people = Role.getIns();