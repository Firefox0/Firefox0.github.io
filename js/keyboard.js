export default class Keyboard {
    static addListeners(dict) {
        document.onkeydown = (e) => {
            for (let key in dict) {
                if (e.key === key) {
                    dict[key]();
                }
            }
        } 
    }
}
