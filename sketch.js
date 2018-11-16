
function preload() {
    click = loadSound("assets/metronome-click.mp3");
}

let met1;
let met2;

function setup() {
    noCanvas();

    txtBox1 = createInput('60');
    txtBox2 = createInput('60');

    bpm1 = createP("BPM 1: " + txtBox1.value());
    bpm2 = createP("BPM 2: " + txtBox2.value());
    polyrhythm = createP("Polyrhythm: " + dec2frac(txtBox1.value() / txtBox2.value()));

    btnStart = createButton("Start / Sync");
    btnStart.mouseClicked(startMetronomes);
    btnStop = createButton("Stop");
    btnStop.mouseClicked(stopMetronomes);

}

function dec2frac(d) {
    var df = 1;
    var top = 1;
    var bot = 1;

    while (df != d) {
        if (df < d) {
            top += 1;
        }
        else {
            bot += 1;
            top = parseInt(d * bot);
        }
        df = top / bot;
    }
    return top + '/' + bot;
}

function beat() {
    click.play();
}

function metronome(bpm) {
    return setInterval(beat, 60000 / bpm);
}

function stopMetronomes() {
    clearInterval(met1);
    clearInterval(met2);
}

function startMetronomes() {
    clearInterval(met1);
    clearInterval(met2);
    met1 = metronome(txtBox1.value());
    met2 = metronome(txtBox2.value());
}



function draw() {
    // TODO handle desyncing issues
    // TODO memory leak
    bpm1.html("BPM1: " + txtBox1.value());
    bpm2.html("BPM2: " + txtBox2.value());
    polyrhythm.html("Polyrhythm: " + dec2frac(txtBox1.value() / txtBox2.value()));

    txtBox1.changed(() => {
        clearInterval(met1);
        clearInterval(met2);
        met1 = metronome(txtBox1.value());
        met2 = metronome(txtBox2.value());
    })

    txtBox2.changed(() => {
        clearInterval(met1);
        clearInterval(met2);
        met1 = metronome(txtBox1.value());
        met2 = metronome(txtBox2.value());
    });


}