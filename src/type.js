
    let app = document.getElementById("app");
    let typewriter = new Typewriter(app, {
        loop: false,
        delay: 60,
    });

    function msg(message) {
        typewriter.pauseFor(300).typeString(message).pauseFor(300).start();
    }
    function clearMsg() {

        typewriter.deleteAll(10);
    }


export { msg, clearMsg };
