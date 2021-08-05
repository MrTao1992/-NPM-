declare module 'zm_template/src/Template' {
	export class Template implements template.ITemplate {
	    hello(): void;
	}

}
declare module 'zm_template/src/interfaces' {
	 global {
	    namespace template {
	        interface ITemplate {
	            hello(): void;
	        }
	    }
	}
	export {};

}
declare module 'zm_template' {
	export * from 'zm_template/src/interfaces';
	export * from 'zm_template/src/Template';

}
