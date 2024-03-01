
var yearMS = 365.2422 * 86400 * 1000;
var kaliYear = 3102 + (new Date()).getFullYear();
var mahaYugaFrac = ((3888000 + kaliYear) % 4320000) / 4320000;
var manvantaraFrac = ((27 + mahaYugaFrac) % 71) / 71;
var kalpaFrac = ((6 + manvantaraFrac) % 14) / 14;
var armRadius = 0.98;
var outerRadius = 0.93;
var innerRadius = 0.87;
var notchRadius = 0.81;
var longNotchRadius = 0.69;
var defGrad = [[0.0, "#99ccff", 0.5, "#99ccff"], 
               [0.5, "#99ccff", 1.0, "#ffffff"]];
var moonGrad = [[0.0, "#ffffff", 0.5, "#888888"], 
                [0.5, "#888888", 1.0, "#ffffff"]];
var vertNightDayGrad = [[0.2, "#4466aa", 0.3, "#ffff55"], 
                        [0.3, "#ffff55", 0.7, "#ffff55"], 
                        [0.7, "#ffff55", 0.8, "#4466aa"], 
                        [0.8, "#4466aa", 1.2, "#4466aa"]];
var horizNightDayGrad = [[0.9, "#4466aa", 0.1, "#ffff55"], 
                         [0.1, "#ffff55", 0.4, "#ffff55"], 
                         [0.4, "#ffff55", 0.6, "#4466aa"], 
                         [0.6, "#4466aa", 0.9, "#4466aa"]];
var mahaYugaGrad = [[0.0, "#f0f8ff", 0.4, "#f0f8ff"], 
                    [0.4, "#ff0000", 0.7, "#ff0000"], 
                    [0.7, "#4466aa", 0.9, "#4466aa"], 
                    [0.9, "#ffff00", 1.0, "#ffff00"]];
var dayText = [[0.0, "Midnight", true], [0.5, "Midday", true]];
var moonText = [[0.0, "Purnima", true], [0.5, "Amavasya", true]];
var yearText = [[0.0, "Winter", true], [0.5, "Summer", true]];
var yugaText = [[0.20, "Satya yuga", true], [0.55, "Treta yuga", true], [0.80, "Dvapara", true], [0.95, "Kali", true]];
var kalpaText = [[0.01, "Partial creation", false], [0.51, "Partial devastation", false]];
var creatText = [[0.01, "Creation", false]];
var canvases = [
    {"id": "c1",  "notches": 1,  "ms": 1600 / 2700,     "pos": 0,                "grad": defGrad,           "text": null},
    {"id": "c2",  "notches": 100,"ms": 1600 / 27,       "pos": 0,                "grad": null,              "text": null},
    {"id": "c3",  "notches": 3,  "ms": 1600 / 9,        "pos": 0,                "grad": defGrad,           "text": null},
    {"id": "c4",  "notches": 3,  "ms": 1600 / 3,        "pos": 0,                "grad": defGrad,           "text": null},
    {"id": "c5",  "notches": 3,  "ms": 1600,            "pos": 0,                "grad": defGrad,           "text": null},
    {"id": "c6",  "notches": 5,  "ms": 8000,            "pos": 0,                "grad": defGrad,           "text": null},
    {"id": "c7",  "notches": 15, "ms": 2 * 60 * 1000,   "pos": 0,                "grad": defGrad,           "text": null},
    {"id": "c8",  "notches": 15, "ms": 30 * 60 * 1000,  "pos": 0,                "grad": defGrad,           "text": null},
    {"id": "c9",  "notches": 2,  "ms": 3600 * 1000,     "pos": 0,                "grad": defGrad,           "text": null},
    {"id": "c10", "notches": 3,  "ms": 3 * 3600 * 1000, "pos": 0,                "grad": defGrad,           "text": null},
    {"id": "c11", "notches": 8,  "ms": 86400 * 1000,    "pos": 0,                "grad": vertNightDayGrad,  "text": dayText},
    {"id": "c12", "notches": 15, "ms": yearMS / 24,     "pos": 0,                "grad": defGrad,           "text": null},
    {"id": "c13", "notches": 2,  "ms": yearMS / 12,     "pos": 0,                "grad": moonGrad,          "text": moonText},
    {"id": "c14", "notches": 2,  "ms": yearMS / 6,      "pos": 0,                "grad": defGrad,           "text": null},
    {"id": "c15", "notches": 3,  "ms": yearMS / 2,      "pos": 0,                "grad": defGrad,           "text": null},
    {"id": "c16", "notches": 2,  "ms": yearMS,          "pos": 0,                "grad": vertNightDayGrad,  "text": yearText},
    {"id": "c17", "notches": 0,  "ms": 0, "pos": (kaliYear % 360) / 360,         "grad": defGrad,           "text": null},
    {"id": "c18", "notches": 0,  "ms": 0, "pos": mahaYugaFrac,                   "grad": mahaYugaGrad,      "text": yugaText},
    {"id": "c19", "notches": 71, "ms": 0, "pos": manvantaraFrac,                 "grad": null,              "text": null},
    {"id": "c20", "notches": 14, "ms": 0, "pos": kalpaFrac,                      "grad": defGrad,           "text": null},
    {"id": "c21", "notches": 2,  "ms": 0, "pos": kalpaFrac / 2,                  "grad": horizNightDayGrad, "text": kalpaText},
    {"id": "c22", "notches": 30, "ms": 0, "pos": kalpaFrac / (2 * 30),           "grad": moonGrad,          "text": null},
    {"id": "c23", "notches": 12, "ms": 0, "pos": kalpaFrac / (2 * 30 * 12),      "grad": vertNightDayGrad,  "text": null},
    {"id": "c24", "notches": 50, "ms": 0, "pos": kalpaFrac / (2 * 30 * 12 * 50), "grad": null,              "text": null},
    {"id": "c25", "notches": 2,  "ms": 0, "pos": 0.5,                            "grad": defGrad,           "text": creatText}
];

function draw(canvas) {
    canvas.ctx.save();
    canvas.ctx.fillStyle = "white"; //"#eeeeff";
    canvas.ctx.fillRect(0, 0, canvas.elem.width, canvas.elem.height);
    canvas.ctx.translate(canvas.elem.width / 2, canvas.elem.height / 2);
    var scale = Math.max(canvas.elem.width / 2, canvas.elem.height / 2);
    canvas.ctx.scale(scale, scale);
    if (canvas.grad) {
        canvas.ctx.lineWidth = outerRadius - innerRadius;
        var midRadius = (innerRadius + outerRadius) / 2;
        for (var j = 0; j < canvas.grad.length; j++) {
            var a1 = 2 * Math.PI * canvas.grad[j][0];
            var a2 = 2 * Math.PI * canvas.grad[j][2];
            var grad = canvas.ctx.createLinearGradient(midRadius * Math.sin(a1), midRadius * -Math.cos(a1),
                                                       midRadius * Math.sin(a2), midRadius * -Math.cos(a2));
            grad.addColorStop(0, canvas.grad[j][1]);
            grad.addColorStop(1, canvas.grad[j][3]);
            canvas.ctx.strokeStyle = grad;
            canvas.ctx.beginPath();
            canvas.ctx.arc(0, 0, midRadius, a1 - Math.PI / 2, a2 - Math.PI / 2);
            canvas.ctx.stroke();
        }
    }
    if (canvas.text) {
        canvas.ctx.save();
        canvas.ctx.scale(1 / 100, 1 / 100);
        canvas.ctx.fillStyle = "black";
        canvas.ctx.font = "12px sans-serif";
        canvas.ctx.textAlign = "center";
        for (var j = 0; j < canvas.text.length; j++) {
            var x = canvas.ctx.measureText(canvas.text[j][1][0]).width / 2; // half of first character
            if (canvas.text[j][2]) {
                // center
                x -= canvas.ctx.measureText(canvas.text[j][1]).width / 2; // half of whole string
            }
            for (var k = 0; k < canvas.text[j][1].length; k++) {
                canvas.ctx.save();
                canvas.ctx.rotate(2 * Math.PI * canvas.text[j][0] + 0.0145 * x);
                canvas.ctx.fillText(canvas.text[j][1][k], 0, -(100 * notchRadius - 12));
                x += canvas.ctx.measureText(canvas.text[j][1][k]).width / 2; // half of this character
                if (k + 1 < canvas.text[j][1].length) {
                    x += canvas.ctx.measureText(canvas.text[j][1][k + 1]).width / 2; // half of next character
                }
                canvas.ctx.restore();
            }
        }
        canvas.ctx.restore();
    }
    canvas.ctx.strokeStyle = "black";
    canvas.ctx.lineWidth = 0.02;
    var a;
    for (var j = 0; j < canvas.notches; j++) {
        a = 2 * Math.PI * j / canvas.notches;
        var beginRadius = (j == 0 && !canvas.grad) ? longNotchRadius : notchRadius;
        canvas.ctx.beginPath();
        canvas.ctx.moveTo(beginRadius * Math.sin(a), beginRadius * -Math.cos(a))
        canvas.ctx.lineTo(outerRadius * Math.sin(a), outerRadius * -Math.cos(a))
        canvas.ctx.stroke();
    }
    if (canvas.ms) {
        a = 2 * Math.PI * (Date.now() % canvas.ms) / canvas.ms;
    } else {
        a = 2 * Math.PI * canvas.pos;
    }
    canvas.ctx.beginPath();
    canvas.ctx.moveTo(0, 0);
    canvas.ctx.lineTo(armRadius * Math.sin(a), armRadius * -Math.cos(a))
    canvas.ctx.stroke();
    canvas.ctx.restore();
}

function start() {
    for (var i = 0; i < canvases.length; i++) {
        canvases[i].elem = document.getElementById(canvases[i].id);
        canvases[i].ctx = canvases[i].elem.getContext("2d");
    }
    window.requestAnimationFrame =
        window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame || window.mozRequestAnimationFrame ||
        function(cb){};
    window.onresize = resizeCallback;
    resizeCallback();
    window.requestAnimationFrame(animationCallback);
}

function resizeCallback() {
    var dpr = window.devicePixelRatio || 1;
    for (var i = 0; i < canvases.length; i++) {
        canvases[i].elem.width = canvases[i].elem.offsetWidth * dpr;
        canvases[i].elem.height = canvases[i].elem.offsetHeight * dpr;
        draw(canvases[i]);
    }
}

function animationCallback() {
    for (var i = 0; i < canvases.length; i++) {
        var bcr = canvases[i].elem.getBoundingClientRect();
        if (bcr.bottom >= 0 && bcr.top <= window.innerHeight && canvases[i].ms) {
            draw(canvases[i]);
        }
    }
    window.requestAnimationFrame(animationCallback);
}
