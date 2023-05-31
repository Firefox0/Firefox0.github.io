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

    static detectWord(word, callback) {
        let buffer = "";
        document.onkeydown = (e) => {
            buffer += e.key;
            if (buffer.length > word.length) {
                buffer = buffer.substring(1);
            }
            if (buffer === word) {
                callback();
            }
        }
    }
}
