[![NPM](https://nodei.co/npm/textmaze.png?downloads=true)](https://nodei.co/npm/textmaze/)


Installation
============

Install the package and save in your package.json

   ```
   npm install --save textmaze
   ```

User Guide
==========

```js
var textmaze = require('textmaze');

text = new textmaze.TextMaze()
view = text.render(room);
```

The room object needs to support the following methods that return a room
object:

```js
class Room {
     goForward(direction) {};
     goLeft(direction) {};
     goRight(direction) {};
}
```

The rendered maze will look something like:


                                   /
                                  / 
    --+                          +  
      |\                        /|  
      | \                      / |  
      |  +                    +  |  
      |  |                    |  |  
      |  |                    |  |  
      |  |                    |  |  
      |  |                    |  |  
      |  |                    |  |  
      |  |                    |  |  
      |  |                    |  |  
      |  +                    +  |  
      | /                      \ |  
      |/                        \|  
    --+                          +  
                                  \ 
                                   \

