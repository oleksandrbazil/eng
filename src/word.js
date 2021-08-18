export class Word {
    constructor(
        v1 = '',
        t1 = '',
        v2 = '',
        t2 = '',
        v3 = '',
        t3 = '',
        meaning = '',
        group = 1,
        extended = false
    ) {
        this.group = group;
        this.v1 = v1;
        this.t1 = t1;
        this.v2 = v2;
        this.t2 = t2;
        this.v3 = v3;
        this.t3 = t3;
        this.meaning = meaning;
        this.extended = extended;
    }
}

export default Word;
