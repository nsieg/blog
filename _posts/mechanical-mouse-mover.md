---
title: 'Keep your mouse moving with Lego motor & RaspberryPi'
coverImage: '/assets/blog/mouse-mover-mec/mouse.webp'
date: '2020-06-01T12:30:00.000Z'
author:
  name: Nils Siegfried
ogImage:
  url: '/assets/blog/mouse-mover-mec/mouse.webp'
tags: raspberrypi,java,spring,api
zaehlmarkeId: '23aa29dd842a43beb6a5b673a907f8e0'
---

When Covid-19 hit the enterprise workforce, many were sent home to work with devices configured for use in an open space office. One of the *features* of these devices typically is to lock the screen after some minutes of idle time. When working from home, this is unconvenient as there is no one who could sniff sensible data while you are in the kitchen. However, you have to log back in with multiple factors after every coffee break.

In this post I am going to present a solution that uses an old USB mouse, a RaspberryPi and some Lego to build a mechanical mouse moving device that keeps your laptop from going idle.

## Solution Preview

Activated over a REST API, a Java application schedules a motor to run for few seconds, which mechanically moves a standard USB mouse contained in a Lego frame and connected to my corporate laptop.

![Mouse mover in action](/assets/blog/mouse-mover-mec/jiggle.mp4)

## API

The central software component on the RaspberryPi provides a RESTful API that allows to configure the movement of the mouse. The parameter `secondsInterval` defines for how long the motor should move the mouse before waiting `secondsDelay` until the next movement. Besides, movement can be started or stopped and the current configuration can be retrieved.

```json
GET /movement

{ 
  "enabled": true,
  "secondsInterval": 5,
  "secondsDelay": 300
}
```

In the example, the mouse is moved for 5 seconds. After that, the program waits 300 seconds before it moves the mouse 
again for 5 seconds. The API can be used with any client inside the local network using the DHCP assigned address of 
the RaspberryPi.

## Hardware

The following components were used to build this project:
 * USB Mouse
 * RaspberryPi 3
 * Lego PowerFunctions XL Motor
 * MotoDriver Board L298N
 * Lego bricks
 * Jumper Wires

![Schematic overview of components](/assets/blog/mouse-mover-mec/sketch.webp)

The MotoDriver board is powered by an external 12V power supply. According to the signals received from the RaspberryPI, 
it powers the XL Motor. The board allows to control two motors, however, only one is connected in this setup. To connect 
the Lego motor, I have stripped the wires and connected them directly to the MotoDriver board.

The construction of the Lego frame will depend primarily on what bricks you are lucky to find in your basement - at least 
it was in my case. Of course, there are multiple designs that will do the job. What was crucial, however, was to have a 
mechnical transmission that slowed down the rotation of the motor. I achieved this by using a small gear wheel directly 
on the motor and a bigger one next to it.

## Software
The combination of the RaspberryPi and the MotoDriver board allows for a simple software control of the motor. 

### Motor control 
By setting one pin to *high (GPIO24)* we can set the motor into rotation. Setting it to low will stop it. Using a dedicated PWM pin (GPIO12), we can configure the motor speed.

:::tip
Some initial *calibration* is required to have the motor run smoothly. Setting the speed too low gives the motor a hard time 
to start moving when it stood still before. Setting it too high will make the sled, which holds the mouse, fly off. 
:::

This brings the core motor functions down to the following snippet:

```java
@Component
@Slf4j
public class PiMotorService implements MotorService {

    private GpioPinDigitalOutput PIN_TWO;
    private GpioPinPwmOutput PIN_PWM;

    private final GpioController gpio = GpioFactory.getInstance();

    public PiMotorService() {
        PIN_TWO = gpio.provisionDigitalOutputPin(RaspiPin.GPIO_05, PinState.LOW);
        PIN_PWM = gpio.provisionPwmOutputPin(RaspiPin.GPIO_26, 250);
        PIN_PWM.setPwmRange(1024);
    }

    @Override
    public void changeSpeed(int runSpeed) {
        log.info("Changing speed to {}", runSpeed);
        PIN_PWM.setPwm(runSpeed);
    }

    @Override
    public void start() {
        log.info("Starting motor by setting pin two to high");
        PIN_TWO.high();
    }

    @Override
    public void stop() {
        log.info("Stopping motor by setting pin two to low");
        PIN_TWO.low();
    }
}
```

:::note
The pin numbers in the Java GPIO library used are different from the numbers typically used. For example, the PWM pin
GPIO12 is refered to as GPIO_26 in the code example.
:::

### Start at boot

To keep the application running and automatically start it after boot, we can register it as a systemd service. First, 
we create a service script `mousemover.service` as follows:

```bash
[Unit]
Description=Manage mousemover application

[Service]
WorkingDirectory=/opt/mousemover
ExecStart=/usr/bin/java -Xms128m -Xmx256m -jar mousemover.jar
Type=simple
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

:::note
Java has to be installed on the RaspberryPI and the application jar has to present at `/opt/mousemover` for this service script to work.
:::

We move this script to `/etc/systemd/system` and activate it using the following commands:

```bash
systemctl enable mousemover
systemctl start mousemover
```

## Usage

When the RaspberryPI is booted and the external 12V power supply connected, the device can be activated using an API call. 
I would typically do this before lunch break:

```bash
curl -X PUT http://192.168.0.128:8080/movement
```

:::tip
Of course, you could also configure the default behavior to be to start moving right after the application startup. In this
case, you would only need to power the system and avoid this call.
:::

When you no longer need the automatic movement as you are back working actively, you may deactive it using

```bash
curl -X DELETE http://192.168.0.128:8080/movement
```

## References

Source code for the Java application can be found on [Github](https://github.com/nsieg/mousemover)

Cover image by [Joshua J. Cotten](https://unsplash.com/@jcotten) on [Unsplash](https://unsplash.com/photos/QNaBO0oHeyo)