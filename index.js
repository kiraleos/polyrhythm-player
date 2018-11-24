// TODO Choose a polyrhythm to play instead of BPM
// TODO Add a sketch to play along metronomes
function preload() {
    click1 = loadSound("assets/metronome-click1.mp3");
    click2 = loadSound("assets/metronome-click2.mp3");
}

let met1;
let met2;

function setup() {
    noCanvas();

    txtBox1 = select("#txtBox1");
    txtBox2 = select("#txtBox2");


    polyrhythm = select("#polyrhythm");
    polyrhythm.html("Polyrhythm: " + dec2frac(txtBox1.value() / txtBox2.value()));


    btnStart = select("#btnStart");
    btnStart.mouseClicked(startMetronomes);

    btnStop = select("#btnStop");
    btnStop.mouseClicked(stopMetronomes);


    txtBox1.input(() => {
        if (txtBox1.value() <= 0 || txtBox1.value() > 500) {
            return;
        }
        startMetronomes();
    });

    txtBox2.input(() => {
        if (txtBox2.value() <= 0 || txtBox2.value() > 500) {
            return;
        }
        startMetronomes();
    });

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


function metronome(bpm, beat) {
    if (bpm > 0 && bpm <= 500) {

        return setInterval(() => {
            if (beat === 1)
                click1.play();
            else
                click2.play();
        }, 60000 / bpm);

    }
}

function stopMetronomes() {
    clearInterval(met1);
    clearInterval(met2);
}

function startMetronomes() {
    clearInterval(met1);
    clearInterval(met2);
    met1 = metronome(txtBox1.value(), 1);
    met2 = metronome(txtBox2.value(), 2);
    prhythm = dec2frac(txtBox1.value() / txtBox2.value()) + '';
    tokens = prhythm.split('/');
    if (tokens[0] !== '0' && tokens[1] !== '0') {
        polyrhythm.html("Polyrhythm: " + prhythm);
    }
}
