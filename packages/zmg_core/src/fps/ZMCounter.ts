export class ZMCounter {
    protected _id: string;
    protected _opts: any;
    protected _value: number;
    protected _total: number;
    protected _averageValue: number;
    protected _accumValue: number;
    protected _accumSamples: number;
    protected _accumStart: number;
    constructor(id: string, opts, now) {
        this._id = id;
        this._opts = opts || {};

        this._value = 0;
        this._total = 0;
        this._averageValue = 0;
        this._accumValue = 0;
        this._accumSamples = 0;
        this._accumStart = now;
    }

    public get value(): number {
        return this._value;
    }
    public set value(value: number) {
        this._value = value
    }

    protected _average(v: number, now: number) {
        if (this._opts.average) {
            this._accumValue += v;
            ++this._accumSamples;

            let t = now;
            if (t - this._accumStart >= this._opts.average) {
                this._averageValue = this._accumValue / this._accumSamples;
                this._accumValue = 0;
                this._accumStart = t;
                this._accumSamples = 0;
            }
        }
    }

    protected sample(now: number) {
        this._average(this._value, now);
    }

    protected human(): number {
        let v = this._opts.average ? this._averageValue : this._value;
        return Math.round(v * 100) / 100;
    }

    protected alarm(): boolean {
        return (
            (this._opts.below && this._value < this._opts.below) ||
            (this._opts.over && this._value > this._opts.over)
        );
    }
}