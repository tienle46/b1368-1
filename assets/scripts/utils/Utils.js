/**
 * Created by Thanh on 8/27/2016.
 */

export default class Utils {

    static isNull(val) {
        return val == undefined || val == null;
    }

    static isEmpty(str) {
        return !str || (Utils.isString(str) && str.trim().length == 0);
    }

    static isEmptyArray(arr) {
        return !arr || arr.length == 0;
    }

    static isArray(arr) {
        return arr instanceof Array;
    }

    static isNumber(value) {
        return typeof value === 'number';
    }

    static isFunction(value) {
        return typeof value === 'function';
    }

    static isBoolean(value) {
        return typeof value === 'boolean';
    }

    static isString(value) {
        return typeof value === 'string';
    }

    static isObject(value) {
        return typeof value === 'object';
    }

    static isNull(value) {
        return value === null;
    }

    static disable(node) {
        if (!node) return;

        if (node instanceof cc.Node) {
            node.enabled = false;
        } else {
            node.node && (node.node.enabled = false);
        }
    }

    static enable(node) {
        if (!node) return;

        if (node instanceof cc.Node) {
            node.enabled = true;
        } else {
            node.node && (node.node.enabled = true);
        }
    }

    static active(node, opacity) {
        this.setActive(node, true);
        if (opacity) {
            //TODO
        }
    }

    static deactive(node, opacity) {
        this.setActive(node, false);

        if (opacity) {
            //TODO
        }
    }

    static setActive(node, active) {
        if (!node) return;

        if (node instanceof cc.Node) {
            node.active = active;
        } else {
            node.node && (node.node.active = active);
        }
    }

    static setVisible(node, visible) {
        this.setActive(node, visible);
    }

    static hide(node, action = cc.hide()) {
        node = node && (node.node || node);
        node && node.runAction && node.runAction(action);
    }

    static show(node) {
        node = node.node || node;
        node && node.runAction && node.runAction(cc.show());
    }

    static loadComponent(componentPath, parent) {
        cc.loader.loadRes(componentPath, (error, prefab) => {
            let prefabObj = cc.instantiate(prefab);
            prefabObj.parent = this.playerLayer;
        });
    }

    static getVariable(obj, key, defaultValue) {
        return (obj && obj.containsVariable && obj.containsVariable(key) && obj.getVariable && obj.getVariable(key).value) || defaultValue;
    }

    static getValue(mapObj, key, defaultValue) {
        if (mapObj && mapObj.hasOwnProperty(key)) {
            return mapObj[key];
        }
        return defaultValue;
    }

    static getGameCode(room) {
        return room && room.isGame && room.name.substring(0, 3);
    }

    static cloneProperties(dest, src) {

        Object.getOwnPropertyNames(src).forEach(key => {

            log("Check: ", dest[key], src[key], !dest[key] && src[key]);
            if (!dest[key] && src[key]) {
                dest[key] = src[key];
            }
        });

        // dest.node && src.node && (src.node.children.forEach(node => {
        //     node.parent = null;
        //     dest.node.addChild(node)
        // }));
    }

    static getAllKeys(...args) {
        return args.map(arg => this.isObject(arg) ? Object.keys(arg) : []).reduce((keys, keyArr) => { return [...keys, ...keyArr] }, []);
    }

}