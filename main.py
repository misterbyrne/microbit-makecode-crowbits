def right():
    pins.digital_write_pin(DigitalPin.P15, 0)
    pins.digital_write_pin(DigitalPin.P13, 1)
    basic.pause(500)
    pins.digital_write_pin(DigitalPin.P15, 1)
    pins.digital_write_pin(DigitalPin.P13, 0)
    basic.pause(200)
    pins.digital_write_pin(DigitalPin.P15, 0)
    pins.digital_write_pin(DigitalPin.P13, 0)
    basic.pause(100)
def getClosestColor():
    global red, green, blue, color, yellow
    red = TCS34725.get_sensor_data(RGB.RED)
    green = TCS34725.get_sensor_data(RGB.GREEN)
    blue = TCS34725.get_sensor_data(RGB.BLUE)
    color = [red, green, blue]
    yellow = [255, 255, 0]
def left():
    pins.digital_write_pin(DigitalPin.P4, 0)
    pins.digital_write_pin(DigitalPin.P10, 1)
    basic.pause(500)
    pins.digital_write_pin(DigitalPin.P4, 1)
    pins.digital_write_pin(DigitalPin.P10, 0)
    basic.pause(200)
    pins.digital_write_pin(DigitalPin.P4, 0)
    pins.digital_write_pin(DigitalPin.P10, 0)
    basic.pause(100)

def on_button_pressed_a():
    left()
input.on_button_pressed(Button.A, on_button_pressed_a)

def test():
    serial.write_value("r", TCS34725.get_sensor_data(RGB.RED))

def on_button_pressed_b():
    right()
input.on_button_pressed(Button.B, on_button_pressed_b)

def detect():
    global red2
    red2 = TCS34725.get_sensor_data(RGB.RED)
    if red2 > 130 and red2 < 160:
        left()
    if red2 > 160 and red2 < 200:
        right()
red2 = 0
yellow: List[number] = []
color: List[number] = []
blue = 0
green = 0
red = 0
basic.show_icon(IconNames.HEART)
led.enable(False)
TCS34725.start(TCS34725_ATIME.TIME_24_MS, TCS34725_AGAIN.GAIN_60X)

def on_forever():
    test()
    detect()
basic.forever(on_forever)
