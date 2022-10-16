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

function getClosestColor() {
    
    red = TCS34725.getSensorData(RGB.RED)
    green = TCS34725.getSensorData(RGB.GREEN)
    blue = TCS34725.getSensorData(RGB.BLUE)
    color = [red, green, blue]
    yellow = [255, 255, 0]
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

input.onButtonPressed(Button.A, function on_button_pressed_a() {
    left()
})
function test() {
    serial.writeValue("r", TCS34725.getSensorData(RGB.RED))
}

input.onButtonPressed(Button.B, function on_button_pressed_b() {
    right()
})
function detect() {
    
    red2 = TCS34725.getSensorData(RGB.RED)
    if (red2 > 130 && red2 < 160) {
        left()
    }
    
    if (red2 > 160 && red2 < 200) {
        right()
    }
    
}

let red2 = 0
let yellow : number[] = []
let color : number[] = []
let blue = 0
let green = 0
let red = 0
basic.showIcon(IconNames.Heart)
led.enable(false)
TCS34725.start(TCS34725_ATIME.TIME_24_MS, TCS34725_AGAIN.GAIN_60X)
basic.forever(function on_forever() {
    test()
    detect()
})
