'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Role = /** @class */ (function () {
    function Role() {
    }
    Role.getIns = function () {
        if (!this._ins) {
            this._ins = new Role();
        }
        return this._ins;
    };
    Role.killAll = function () {
        console.log('杀死所有人！');
    };
    Role.prototype.hello = function () {
        console.log("Say hello");
    };
    return Role;
}());
var people = Role.getIns();

exports.people = people;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Sb2xlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5jbGFzcyBSb2xlIGltcGxlbWVudHMgem1nUm9sZU1nci5JUm9sZSB7XHJcbiAgICBzdGF0aWMgX2luczogUm9sZTtcclxuICAgIHN0YXRpYyBnZXRJbnMoKTogUm9sZSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zID0gbmV3IFJvbGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lucztcclxuICAgIH1cclxuICAgIHN0YXRpYyBraWxsQWxsKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfmnYDmrbvmiYDmnInkurrvvIEnKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBoZWxsbygpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNheSBoZWxsb1wiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGxldCBwZW9wbGUgPSBSb2xlLmdldElucygpOyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0E7SUFBQTtLQWNDO0lBWlUsV0FBTSxHQUFiO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7U0FDMUI7UUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDcEI7SUFDTSxZQUFPLEdBQWQ7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3pCO0lBQ00sb0JBQUssR0FBWjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDNUI7SUFDTCxXQUFDO0FBQUQsQ0FBQyxJQUFBO0lBRVUsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNOzs7OyJ9
