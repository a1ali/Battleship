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

function startMsg() {
    msg('Admiral we are under attack!');
    typewriter.pauseFor(700);
    clearMsg();
    msg('Deploy your fleet by dragging and dropping ships on to the grid!')
}

function stopMsg() {
    typewriter.stop();
}

export { msg, clearMsg, startMsg, stopMsg};
