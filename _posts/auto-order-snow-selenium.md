---
title: 'Automate web UIs with Selenium'
coverImage: '/assets/blog/snow-order/order.webp'
date: '2022-01-08T10:30:00.000Z'
author:
  name: Nils Siegfried
ogImage:
  url: '/assets/blog/snow-order/order.webp'
tags: kotlin,selenium,automation
zaehlmarkeId: 'a02d8d1a9ac74a07a25e5dc8d5ebdc52'
---

Web UIs are designed for humans while APIs are for automation. Sometimes you encounter systems that do not offer an API or whose API is deactivated due to corporate regulations. If you are facing the task to use such a system in many interactions with repeating or only slightly different inputs, you may look for some kind of automation.

In this post I am going to give an example on how to use [Selenium](https://www.selenium.dev) to help with this challenge. We are going to order multiple users via [ServiceNow](https://www.servicenow.com) catalog tasks. ServiceNow is a SaaS tool for digital workflows, popularily used for IT Service Management.

## Challenge

The following order dialog lets us order technical users via the ServiceNow catalog. We have to specify a name and a description, add the item to the shopping cart and repeat this process if we require more than one user.

![ServiceNow order dialog](/assets/blog/snow-order/screen_order.webp)

## Setup

### Selenium WebDriver

Selenium is a browser remote control. To do so, it requires a WebDriver. Depending on your browser, you can download the correlating WebDriver and put in in your path. For example, when using Chrome 96 on Linux, you can do it like this:

```sh
wget https://chromedriver.storage.googleapis.com/96.0.4664.45/chromedriver_linux64.zip
unzip chromedriver_linux64.zip
mv chromedriver /usr/bin/chromedriver
```

:::tip
Check the Selenium homepage for links to WebDrivers for different OS and browsers.
:::

### Kotlin app

I am using Kotlin, however, Selenium libraries are available for many programming languages and you can easily adapt the code if you like. We have to include the library, I am using Maven to do so and add to my `pom.xml`:

```xml
<dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.1.1</version>
</dependency>
```

Now we can check if things work by opening an initial page using the WebDriver.

```java
fun main() {
    val driver: WebDriver = ChromeDriver()
    driver.get("https://<instance>.service-now.com")
}
```

You should see a browser window opening and navigating to the page.

## Automate ordering

Let's break down first what we are planning to do. After execution, we should have a shopping cart filled with items that we may finally check and proceed to checkout. 

```java
fun main() {
    // Setup our input data
    val users = listOf("user1", "user2", "user3")
    // Go to order page and wait for it to be loaded
    // Iterate over input data
        // Fill the input fields `Username` and `Description`
        // Click the Add to Cart button
}
```

We start by navigating to the order page by copying the URL and navigate there with the WebDriver. We use an explicit wait to check whether the page has been loaded before continuing. The ExplicitWait polls the DOM in regular intervalls and checks if the specified condition is true. 

```java
// Go to order page and wait for it to be loaded
val wait = WebDriverWait(driver, Duration.ofSeconds(10))
driver.get("https://<instance>.service-now.com/com.glideapp.servicecatalog_cat_item_view.do?<...>")
wait.until(ExpectedConditions.elementToBeClickable(By.id("nav-settings-button")))  
```
:::warning
It may seem tempting to use Thread.sleep() at some point to wait for a slow page. Try to avoid this at any point and use explicit waits - these are easier to debug, make it transparent what the application is waiting for and no time is lost if the page is behaving faster than expected.
:::

The WebDriverWait will timeout after 10 seconds, throwing an Exception. We are waiting until the settings button is clickable to indicate the page being ready.

```java
// Iterate over input data
for (user in users) {
  // Fill the input fields `Username` and `Description`
  val userField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("IO:123")))
  userField.clear()
  userField.sendKeys(user)

  val descriptionField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("IO:456")))
  descriptionField.clear()
  descriptionField.sendKeys("This is $user")

  // Click the Add to Cart button
  driver.findElement(By.id("oi_add_to_cart_button")).click()
}    
```

The `sendKeys()` function is used to fill the input fields. The id for the fields can be found using browser dev tools and inspecting the element. There a multiple different ways to select elements, for example using XPath or a CSS selector. If you are sure that elements are loaded and ready, you may directly use `driver.findElement()` instead of waiting for it to be visible in the first place.

So the complete code now looks like this:

```java
fun main() {  
    val users = listOf("user1", "user2", "user3")

    val driver: WebDriver = ChromeDriver()
    driver.get("https://<instance>.service-now.com/com.glideapp.servicecatalog_cat_item_view.do?<...>")
    val wait = WebDriverWait(driver, Duration.ofSeconds(10))
    wait.until(ExpectedConditions.elementToBeClickable(By.id("nav-settings-button")))
    
    for (user in users) {
        val userField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("IO:123")))
        userField.clear()
        userField.sendKeys(user)

        val descriptionField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("IO:456")))
        descriptionField.clear()
        descriptionField.sendKeys("This is $user")

        driver.findElement(By.id("oi_add_to_cart_button")).click()
    }
}
```

When running, you can watch the actions inside the browser window and should end up like this:

![ServiceNow cart with items](/assets/blog/snow-order/screen_end.webp)

:::warning
You may encounter a situation where you cannot find DOM elements in your code even if they do exist in the browser dev tools. This may be due to them being inside an `iframe`. In such a case, first switch to the frame and continue:
:::

```java
val frame = driver.findElement(By.id("iframe_id"))
driver.switchTo(frame)
driver.findElement(By.id("id_of_your_element_that_is_inside_the_iframe"))
```


