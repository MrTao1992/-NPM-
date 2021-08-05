class TimeOut {
    private _timerMap: Map<string, NodeJS.Timeout[]> = new Map<string, NodeJS.Timeout[]>()
    public get timerMap(): Map<string, NodeJS.Timeout[]> {
        return this._timerMap
    }

    setTimeout(func: Function, time: number, area?: string) {
        if (!area) {
            area = "system"
        }
        let _time = setTimeout(() => {
            if (func) func();
            clearTimeout(_time);
            this.clearTimeout(_time)
            _time = null;
        }, time);

        if (this.timerMap.has(area)) {
            let arr = this.timerMap.get(area)
            arr.push(_time)
        } else {
            let arr = []
            arr.push(_time)
            this.timerMap.set(area, arr)
        }
        return _time
    }

    setInterval(func: Function, time: number, area?: string) {
        if (!area) {
            area = "system"
        }
        let _time = setInterval(() => {
            if (func) func();
            clearInterval(_time);
            this.clearTimeout(_time)
            _time = null;
        }, time);
        if (this.timerMap.has(area)) {
            let arr = this.timerMap.get(area)
            arr.push(_time)
        } else {
            let arr = []
            arr.push(_time)
            this.timerMap.set(area, arr)
        }
        return _time
    }

    clearTimerByArea(area: string) {
        function fn(map) {
            map.forEach(element => {
                clearTimeout(element)
                clearInterval(element);
            });
        }

        this.timerMap.forEach((element, key) => {
            if (key == area) {
                fn(element)
                this.timerMap.delete(key)
            }
        });
    }

    clearTimeout(t: NodeJS.Timeout) {
        this.timerMap.forEach((element) => {
            for (let index = 0; index < element.length; index++) {
                const time = element[index];
                if (time == t) {
                    clearTimeout(time)
                    clearInterval(time);
                    element.splice(index, 1)
                }
            }
        });
    }

    clearTimer() {
        this.timerMap.forEach((element) => {
            element.forEach(v => {
                clearTimeout(v)
                clearInterval(v);
            });
            element = null
        });
        this.timerMap.clear()
    }

    destroy() {
        this.clearTimer()
        delete this._timerMap
    }
}