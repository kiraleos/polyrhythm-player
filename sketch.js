
function preload() {
    click1 = loadSound("assets/metronome-click1.mp3");
    click2 = loadSound("assets/metronome-click2.mp3");
}

let met1;
let met2;

function setup() {
    noCanvas();

    txtBox1 = createInput('80', "number");
    txtBox2 = createInput('80', "number");

    bpm1 = createP("BPM 1: " + txtBox1.value());
    bpm2 = createP("BPM 2: " + txtBox2.value());
    polyrhythm = createP("Polyrhythm: " + dec2frac(txtBox1.value() / txtBox2.value()));

    btnStart = createButton("Start / Sync");
    btnStart.mouseClicked(startMetronomes);
    btnStop = createButton("Stop");
    btnStop.mouseClicked(stopMetronomes);

}

function dec2frac(d) {
    if (isNaN(d) || d == Infinity) {
        return 0;
    }
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

function beat1() {
    click1.play();
}
function beat2() {
    click2.play();
}

function metronome(bpm, beat) {
    if (bpm != 0 && bpm != '') {
        console.log("Playing metronome with bpm: " + bpm);
        return setInterval(beat, 60000 / bpm);
    }
    else {
        console.log("BPM can't be 0 or empty.");
    }
}

function stopMetronomes() {
    clearInterval(met1);
    clearInterval(met2);
}

function startMetronomes() {
    clearInterval(met1);
    clearInterval(met2);
    met1 = metronome(txtBox1.value(), beat1);
    met2 = metronome(txtBox2.value(), beat2);
}



function draw() {
    // TODO memory leak
    bpm1.html("BPM1: " + txtBox1.value());
    bpm2.html("BPM2: " + txtBox2.value());

    txtBox1.changed(() => {
        clearInterval(met1);
        clearInterval(met2);
        met1 = metronome(txtBox1.value(), beat1);
        met2 = metronome(txtBox2.value(), beat2);
        polyrhythm.html("Polyrhythm: " + dec2frac(txtBox1.value() / txtBox2.value()));

    });

    txtBox2.changed(() => {
        clearInterval(met1);
        clearInterval(met2);
        met1 = metronome(txtBox1.value(), beat1);
        met2 = metronome(txtBox2.value(), beat2);
        polyrhythm.html("Polyrhythm: " + dec2frac(txtBox1.value() / txtBox2.value()));

    });


}