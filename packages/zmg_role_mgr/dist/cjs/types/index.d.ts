declare module 'zmg_role_mgr/src/Role' {
	 class Role implements zmgRoleMgr.IRole {
	    static _ins: Role;
	    static getIns(): Role;
	    static killAll(): void;
	    hello(): void;
	}
	export let people: Role;
	export {};

}
declare module 'zmg_role_mgr/src/interfaces' {
	 global {
	    namespace zmgRoleMgr {
	        interface IRole {
	            hello(): void;
	        }
	    }
	}
	export {};

}
declare module 'zmg_role_mgr' {
	export * from 'zmg_role_mgr/src/interfaces';
	export * from 'zmg_role_mgr/src/Role';

}
