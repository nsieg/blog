---
title: 'Simulate mouse movement with a DigiSpark microcontroller'
coverImage: '/assets/blog/mouse-mover-digi/circuit.webp'
date: '2021-05-14T12:30:00.000Z'
author:
  name: Nils Siegfried
ogImage:
  url: '/assets/blog/mouse-mover-digi/circuit.webp'
tags: digispark,microcontroller
zaehlmarkeId: '20986904c74744c3b9b22c92cde907fd'
---

I wrote about the problem of using an enterprise laptop at home in a previous post. After being idle for some time, you get logged out and have to log back in using multiple factors. Initially, I solved this challenge by building a mechanical mouse mover. While the solution works, it has multiple disadvantages:

* it is not portable
* it is quite noisy when it operates
* it has to be plugged in/out
* it has to be activated via the API

In this post, I present a solution that comes without these down sides.

## Solution Preview

We build a mouse movement simulator by programming a DigiSpark microcontroller. Connected via USB, it will mimic a standard HID-compatible mouse on the enterprise notebook and make a minimal movement every 3 minutes. The movement is barely notable to the user and will keep the laptop from locking as long as the board is plugged in.

## Why this works
In this solution, as well as in the mechanical mouse mover, we are exploiting that standard HID-compatible USB input devices are typically excluded from corporate USB port blocking policies. If this is not the case for you, the solution presented will not work.

:::tip
To check, just plug in an old USB mouse and see if you are able to move the cursor. If yes, you are good to go.
:::

:::tip
If your are only using MacOS, you may look into **Caffeine** as a software alternative to keep your system from going into sleep modes.
:::

## Hardware

![DigiSpark connected to USB](/assets/blog/mouse-mover-digi/digi.webp)

I am using the DigiSpark Rev. 3 (ATTiny 85) board. As I use more than one corporate laptop, I have bought a 5x pack.

:::tip
The finished solution makes a great little present to others working from home, also affected by enterprise laptop lock-out.
:::

:::warning
If you have followed all the steps and the board works on your private laptop but not on your corporate machine, try using a simple USB extension cable to connect the board. This works for me on a Win10 HP EliteBook.
:::

## Software

### Setup
To program the DigiSpark board, you need to install the Arduino IDE, load the custom board files for DigiSpark and upload a minimal sketch to the board that triggers the mouse movement. Installation instructions for Arduino IDE can be found easily on the web and are not presented here.

In the Arduino IDE go to `File` `Preferences` and paste the following URL into the field for `Additional Boards Manager URLs` and confirm with `OK`:
```
http://digistump.com/package_digistump_index.json,https://raw.githubusercontent.com/digistump/arduino-boards-index/master/package_digistump_index.json
```


After the board manager is installed, go to `Tools` and select the board `Digispark (Default - 16.5mhz)`. Set the programmer to `Arduino as ISP`.

### Upload sketch

Create a new sketch with the following lines:

```c
#include <DigiMouse.h>
void setup(){
  DigiMouse.begin();
  pinMode(1, OUTPUT);
}
 
void loop() {
  while(true) {
    // Move cursor 3px to the right and back  
    digitalWrite(1, HIGH);    
    DigiMouse.move(3,0,0);
    DigiMouse.delay(50);
    DigiMouse.move(-3,0,0);
    digitalWrite(1, LOW);
    // Wait for 3 minutes (180000 ms)
    DigiMouse.delay(180000);
  }
}
```

Now click on Upload and follow the instructions in the console.

:::warning
Do not plug in the DigiSpark before being told so in the console. Due to how the included Micronucleus boot loader works by default, the device is only programmable in the first few seconds before it switches its operating mode. Hence, it is important to be plugged in at the right moment
:::

After the upload is completed, you can plug in the device again and see it working. Please note that it will always take a little delay after being plugged in before it starts operating due to the mentioned boot loader configuration.

## Usage

I have connected the device to my laptop using a USB extension cable. It is permanently plugged in and keeps the system awake during the work day. By now, I have not noticed any problems using it with both Windows and MacOS. 

## References

Cover image by [Manuel](https://unsplash.com/@manueljota) on [Unsplash](https://unsplash.com/photos/CANL3bzp6wU)