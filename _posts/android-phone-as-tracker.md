---
title: 'Turn an Android phone into a 24/7 IoT tracker'
coverImage: '/assets/blog/android-tracker/oldphones.webp'
date: '2022-01-08T10:30:00.000Z'
author:
  name: Nils Siegfried
ogImage:
  url: '/assets/blog/android-tracker/oldphones.webp'
tags: android
---

Android devices are full of sensors that may be handy to track or measure your surroundings. Especially, when a phone becomes dated with poor battery life and a stale Android version, reusing it as a 24/7 IoT sensor device sounds like a great afterlife. 

## Always boot on power on

The first challenge to do so is that, by default, most Android devices go into charge mode when they were turned off and a charger is plugged in. Consequently, when the external power source fails and the phone runs out of battery it will never turn on again on its own - not the best conditions for 24/7 operations. Fortunately, this behavior can be changed, however, root access is required. The following steps have been performed on a Huawei P9 Lite and may differ for other phones.

### Get bootloader unlock code

To root the P9 Lite, we first have to unlock the bootloader. Some years ago, this would have been rather easy: Fill a form on Huawei's website, receive an unlock code and get to it. Unfortunately, this is no longer possible. However, there still is a way to get it done using [PotatoNV](https://github.com/mashed-potatoes/PotatoNV). Follow the instructions in the video to shortcut the testpoint in your phone and upload the USB bootloader. After the procedure is finished, you receive an unlock code that can be used in subsequent steps.

:::warning
The test point for a P9 Lite is different than for the model shown in the video. 
:::

Follow this [guide](https://vrm24.com/instructions/how-to-disassemble-huawei-p9-lite/) until step 3 to uncover it. In the picture below, the red point indicates the testpoint.
![Testpoint on P9 Lite](/assets/blog/android-tracker/testpoint.webp)

### Unlock bootloader and install Magisk

After we have a working unlock code, we can follow this [guide](https://www.androidweblog.com/huawei-p9-lite-mini-root-install-twrp-recovery/) to perform the OEM unlock using fastboot, flash TWRP to the recovery partition and install Magisk.

:::tip
The tutorial describes Magisk and SuperSU as alternatives, however, SuperSU is no longer actively maintained and Magisk should be the preferred option.
:::

Eventually, the phone will show a warning screen about its unlocked state at every boot and you will find the Magisk application installed after reboot.

### Set the phone to boot on charger

Now we are ready to configure the phone to boot when a charger is plugged in. We have to be cautious, however, to not do this instantaneously as the battery may have too little power. In this case, the phone would immediately try to boot after the charger is plugged in and die during the boot. 

:::warning
Depending on the power of the carger this might lead the phone to hang in a crash-loop when the battery was empty.
:::

To avoid this, we will configure an initial delay. The phone will go into charge mode for a minute and then automatically boot into full operation. 

For the following commands, you have to have your phone connected in USB debugging mode to a PC and ADB installed:

```bash
// Start shell
./adb shell

// Become root user
su

// Get write access to /system
mount -o rw,remount /system

// Write init script
cat > /etc/init/custom.rc
on charger
    wait /data/foo/never 60
    setprop sys.powerctl reboot,leaving-off-mode-charging
// Press Ctrl + D to end input

// Set permissions
chown 0.0 /etc/init/custom.rc
chmod 0644 /etc/init/custom.rc
chcon u:object_r:system_file:s0 /etc/init/custom.rc
```
:::note
When the `su` command is performed, a notification will appear on the phone. Magisk asks whether to grant root access to ADB, which you have to confirm.
:::

:::note
The file `/data/foo/never` purposely does not exist. The script will wait for it to become existent before it timeouts after 60 seconds.
:::

To test the changes, shutdown your phone and plug in the charger. You should see 60s of charging mode before the phone restarts and boots into normal operation.







