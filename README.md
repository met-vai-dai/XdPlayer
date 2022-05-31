# XdPlayer - Javascript Video Player Library

XdPlayer is Javascript Video Player Library For HTML Video Player.

### Player UI 🥇
![Player ScreenShot](https://user-images.githubusercontent.com/72292920/126433708-1c719e50-4aa5-44f0-9a9b-b1d3fec1030d.png)


https://user-images.githubusercontent.com/72292920/171181560-5f2222c8-d5f5-4671-9ee3-acaa0a8f4c43.mp4


## Video Player Functions
1. Play/Pause.
2. Lock Controls.
3. Playback Speed.
4. Forword And Backword.
5. Fullscreen.
6. Volume Control.
7. KeyBoard Controls.
  * p : Play or pause the video
  * s : Speed the video
  * f : Toggle fullscreen

## Quick Start 📖

* Link CSS & JS Files.

* Add Video Element within th div named xdContainer Like This.
```
<div class="xdContainer">

        <video class="xdPlayer" 
        width="100%" 
        height="100%"
        preload="auto"
        poster="" > 
        <source src="test.mp4"  type="video/mp4" />
            <!-- You Can Also Add Other Video Formet Source -->
          </video>
  <!-- Video Player Container End -->
 </div>
 ```

* To Controls height & width of Video Player Use ``` .xdContainer ``` Class In Css For Change height & width Like This.
```
.playerContainer {
    position: relative;
    width: 100%;
    height: 400px;
    background-color: #000;
  }
```

* Add Video Source And Poster For Your Video & Use Class ``` .xdPlayer ``` In Video Tag.
```
<video class="xdPlayer" 
        width="100%" 
        height="100%"
        preload="auto"
        poster="" > 

            <source src="test.mp4"  type="video/mp4" />
            <!-- You Can Also Add Other Video Formet Source -->
          </video>

```

****To Understand More You Can See The Index.html, Css  & JS Files. 📂****

## Contributing 🖋️
XdPlayer is a free and open source library, and we appreciate any help you're willing to give - whether it's fixing bugs, improving documentation, or suggesting new features. Feel Free To Contributing. 💙

## License 📌
XdPlayer is licensed under the Apache License, Version 2.0.
