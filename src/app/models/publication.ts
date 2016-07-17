export class Publication {
    constructor(
        public _id?: string,
        public _rev?: string,
        public author?: string,
        public title?: string,
        public print?: string,
        public year?: number,
        public type?: string,
        public price?: number) {}
}