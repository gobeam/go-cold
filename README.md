# Go Cold Website Blocker
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/huchenme/hacker-tab-extension/blob/master/LICENSE)

**Go Cold** is Chrome & Mozilla Browser Extension with which you can block website with options to block it on timer or block it always.
_If you like this extension please give a star_

* [Why?](#why)
* [Installation](#installation)
* [FireFox Installation](#firefox-installation)
* [Features](#features)
* [Build With](#build-with)
* [Acknowledgement](#acknowledgement)
* [Contributing](#contributing)
* [License](#license)

<kbd>![](images/demo.gif)</kbd>

## Why
Addiction to social media and video viewing & sharing platforms is common problem nowdays.
Sometime involuntarily we tend to click or try to access those sites and go into deep loop and waste our time. It doesn't matter when you are free but it will definitely waste your precious time when you are trying to concentrate in your studies while doing online research or incase of programmer during their work. In order to minimize this issue this Chrome Extension will block all the url you have listed on it on basis of timer or always.

## Installation
1. Normal Installation:
* Download zip file from [here](https://github.com/gobeam/go-cold/releases/download/v1.0.0/build.zip).
* Download the zip file and unzip it you will find js and html files inside that folder.
* Open Chrome browser and enter following url in search bar: chrome://extensions

<kbd>![](images/step1.png)</kbd>

* After that you will  see this page as show in image below which will list all extension available in you chrome browser and make sure Developer Mode is turned on as shown in image with Red arrow.

<kbd>![](images/step2.png)</kbd>

* Now after that Click on **Load Unpacked** button which is n top left corner and it will give option to choose file now choose folder you unzipped after downloading zipped file. Voila your extension has been loaded now you can use it easily.

<kbd>![](images/step3.png)</kbd>

1. Advanced Installation:
* Clone the repository.
* Run following command to build source code:
```bash
npm run build
```
* From Chrome extension manager page click on **Load Unpacked** and select build folder to load extension.

## Firefox Installation
1. Open Firefox browser and visit [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox) now click on **Load Temporary Add-on** and select manifest.json from build folder. That's all now the extension will be loaded.

## Features
1) Add domain to block list automatically.
* If you have already opened web page then if you click on extension you will get popup as shown in image below and domain will be automatically provided to block and you can click on + button to add it to block list. You will have option to Block it always which you can toggle with switch or change timer upto 60 minute (you can choose only one option).

<kbd>![](images/step4.png)</kbd>

2) Add domain manually
* Click on **ADD MANUALLY** button on below left corner to add manually

<kbd>![](images/step5.png)</kbd>

* After clicking it a form like below will show up where you can add domain name as you want and the domain name must be valid and can be added twice. Add it on timer or block always option will also available but you can only choose one.

<kbd>![](images/step6png)</kbd>

* Now After clicking add if your blocked page is opened in your tab it will redirect to blocked page.

<kbd>![](images/step7.png)</kbd>

* Congratulation you have blocked domain successfully. Now if you try to open that url in any other tab it will load blocked page. 

3) View List
* To view list of blocked sites click on **VIEW BLOCKED LIST** button on below right corner.

<kbd>![](images/step8.png)</kbd>

* After clicking button you can view blocked page list. Where you can see how much time is remaining if time is set and if it is blocked always or not. You can go back to dashboard by clicking on **DASHBOARD** button.

<kbd>![](images/step9.png)</kbd>

4) Delete Page From Block List
* To delete pages from block list just click delete button corresponding to that page info.

5)Turn on Dark Mode
* To turn Dark Mode toggle dark mode switch on top left corner.

<kbd>![](images/step10.png)</kbd>

## Build With
1) React.js (Redux Saga)
2) React Material UI

## Acknowledgement
Blocked page html we inspired from this link [https://codepen.io/leenalavanya/pen/OogLRd](https://codepen.io/leenalavanya/pen/OogLRd) . If you know Html & CSS you make change in blocked.html file inside build folder and make your custom blocked page.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
Released under the MIT License - see `LICENSE.txt` for details.

