function right() {
    pins.digitalWritePin(DigitalPin.P15, 0)
    pins.digitalWritePin(DigitalPin.P13, 1)
    basic.pause(500)
    pins.digitalWritePin(DigitalPin.P15, 1)
    pins.digitalWritePin(DigitalPin.P13, 0)
    basic.pause(200)
    pins.digitalWritePin(DigitalPin.P15, 0)
    pins.digitalWritePin(DigitalPin.P13, 0)
    basic.pause(100)
}

function left() {
    pins.digitalWritePin(DigitalPin.P4, 0)
    pins.digitalWritePin(DigitalPin.P10, 1)
    basic.pause(500)
    pins.digitalWritePin(DigitalPin.P4, 1)
    pins.digitalWritePin(DigitalPin.P10, 0)
    basic.pause(200)
    pins.digitalWritePin(DigitalPin.P4, 0)
    pins.digitalWritePin(DigitalPin.P10, 0)
    basic.pause(100)
}

const red = { red: 145, green: 82, blue: 80 };
const yellow = { red: 143, green: 80, blue: 49 };
const colors: { [key: string]: any } = { red, yellow };

function getMatchingColor() {
    let colorFromSensor = TCS34725.getSensorRGB();
    for (let colorName of Object.keys(colors)) {
        let color = colors[colorName];
        if (getColorDistance(color, colorFromSensor) < 20) {
            return colorName;
        }
    }
    return null;
}

function testColorDistance() {
    let colorFromSensor = TCS34725.getSensorRGB();
    for (let colorName of Object.keys(colors)) {
        let color = colors[colorName];
        serial.writeValue(colorName, getColorDistance(color, colorFromSensor));
    }
}

function getColorDistance(a: any, b: any) {
    return Math.sqrt((a.red - b.red) ** 2 +
        (a.green - b.green) ** 2 +
        (a.blue - b.blue) ** 2);
}

input.onButtonPressed(Button.A, function on_button_pressed_a() {
    left()
})
function test() {
    serial.writeLine(getMatchingColor());
}
function calibrate() {
    let colorFromSensor = TCS34725.getSensorRGB();
    serial.writeValue("red", colorFromSensor.red);
    serial.writeValue("green", colorFromSensor.green);
    serial.writeValue("blue", colorFromSensor.blue);
}

input.onButtonPressed(Button.B, function on_button_pressed_b() {
    right()
})
function detect() {
    let color = getMatchingColor();
    if (color === "red") {
        left();
    } else if (color === "yellow") {
        right();
    }
}

basic.showIcon(IconNames.Happy)
led.enable(false)
TCS34725.start(TCS34725_ATIME.TIME_100_MS, TCS34725_AGAIN.GAIN_60X)
basic.forever(function on_forever() {
    //calibrate();
    //testColorDistance();
    test()
    detect()
})
