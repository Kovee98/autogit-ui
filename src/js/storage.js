/**
 * Storage Engine Abstraction
 *
 * @param   {String}  type            storage engine
 *
 * @return  {Object}                  storage engine api wrapper
 */
 function store(type = 'sessionStorage') {
    return {
        get (key, fallback = false) {
            let data = JSON.parse(window[type].getItem(key));

            return data ? data : fallback;
        },

        getAll () {
            const keys = Object.keys(window[type]);
            const session = {};

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                session[key] = JSON.parse(window[type].getItem(key));
            }

            return session;
        },

        set (key, value) {
            window[type].setItem(key, JSON.stringify(value));

            return value;
        },

        update (key, json) {
            const updated = Object.assign(this.get(key, {}), json);

            window[type].setItem(key, JSON.stringify(updated));

            return updated;
        },

        remove (key) {
            return window[type].removeItem(key);
        },

        clear () {
            return window[type].clear();
        }
    };
}

// create based on Storage Engine
export const local   = store('localStorage');
export const session = store('sessionStorage');

export default store('sessionStorage');
