---
title: 'Measure home power consumption with a RaspberryPi & TCRT5000 infrared sensor'
coverImage: '/assets/blog/power-meter/meter.webp'
date: '2021-12-08T12:30:00.000Z'
author:
  name: Nils Siegfried
ogImage:
  url: '/assets/blog/power-meter/meter.webp'
tags: raspberrypi,python
zaehlmarkeId: '5b966f5ba3f34ab38abf417a9ecdd49a'
---

## Challenge

Measuring power consumption in a private German household is typically rather coarse. The power grid providers equip you with a power meter that tracks your overall consumption in kWh.
By default, these meters display the overall consumption since installation. If you want to know more details, for example your average daily consumption during summer months your best guess 
would be to note the value every day at the same time - which is not exactly convenient.

:::note
Currently, older meters are changed to newer, digital models. While these allow to change the display to last week or last month, the control interface to do so is using light impulses. 
Hence, you have to blink your commands into the meter using a flash light - which is still not convenient.
:::

## Options

To get a better insight into power consumption, there are two general options:

1. Invasive: Wire a dedicated power meter into your control box
1. Non-invasive: Use an implicit measurement that allows to infer the consumption
    1. Use current transfomers (like YHDC SCT-013)
    1. Read the infrared interface of your power meter

The first option requires a professional electrician as high-voltage is involved. I did not further look into this option as I wanted a cheap, DIY solution. Again, there is more than one way to implement
a non-invasive measurement. There are many tutorials on the internet (e.g., openenergymeter.org) that use the first method. It is based around the principle that a clamp-formed current transformer is positioned around the main cable. Based on the reading of this sensor, one can infer the current going through the wire. 

:::tip
If you have multiple different main wires (e.g., one for your house, one for your garden), this option may give you more flexibility.
:::

In this post, I focus on the second option: reading the infrared interface of the power meter. In addition to the accumulated consumption shown in the display, the power meter also sends an infrared impulse when 1/10,000 kWh is consumed. In other words: If you count the impulses, at every 10,000th impulse 1 kWh has been consumed.

## Solution Preview

The image shows the infrared sensor hold in place by some Lego just in front of the infrared interface. The three cables are connected to the RaspberryPi.

![TCRT5000 in Lego Frame on power meter](/assets/blog/power-meter/newmeter.webp)

## Hardware

* RaspberryPi 3B
* TCRT5000 infrared sensor
* Jumper wires
* Lego

The infrared sensor is available for about 2€ and has a digital output - so no additional signal conversion is required. This makes this project very cost-effective. The Lego could easily be replaced by 
simple constructions from cardboard and duct tape - or if you would like to have it very polished, you may 3D-print a case to hold the sensor.

The sensor is connected with three wires to the RaspberryPi as shown in the sketch.

![Sketch showing sensor and raspberryPi connection](/assets/blog/power-meter/sketch.webp)

## Software

Reading the input of the sensor becomes easy using the `gpiozero` library, which has many sensor types built-in. For this use case, the `LineSensor` works fine. I have adjusted the `queue_len` to 1 as 
10,000 impulses per kWh can lead to a very short signal in times of high consumption. 

```python
from gpiozero import LineSensor
from signal import pause

def line_detected():
  print("Impulse detected!")

sensor = LineSensor(18, sample_rate=1000, queue_len=1)
sensor.when_line = self.line_detected
pause()
```

:::important
In this code, 18 refers to the GPIO. If you haved used a different wiring setup, you may have to adjust this number accordingly.
:::

:::tip
If you are not getting any signals, you may need to fine tune the sensor. Typicaly, there is a potentiometer on the board that you may control using a screwdriver. Just turn it slightly and watch for 
changes in your program output.

### Monitoring / Visualization

At this point, there are plenty of options to save and analyze the data gathered from the sensor. I am currently sending each impulse as a measurement to an InfluxDB time series database. The InfluxDB runs smoothly on a RaspberryPi 3B (there are native binaries for arm64) and brings a WebUI similar to Graphana to inspect your data in custom queries.

## References

Cover image by [Thomas Kelley](https://unsplash.com/@thkelley) on [Unsplash](https://unsplash.com/photos/xVptEZzgVfo)