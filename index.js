const VIEW = `
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
                                 
`;
const LEFT = `
 \\                               
  \\                              
   +                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   +                             
  /                              
 /                               
`;
const RIGHT = `
                                /
                               / 
                              +  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              +  
                               \\ 
                                \\
`;
const FORWARD = `
                                 
                                 
   +--------------------------+  
   |                          |  
   |                          |  
   |                          |  
   |                          |  
   |                          |  
   |                          |  
   |                          |  
   |                          |  
   |                          |  
   |                          |  
   |                          |  
   |                          |  
   |                          |  
   +--------------------------+  
                                 
                                 
`;
const LEFT_FORWARD_RIGHT = `
                                 
                                 
 --+                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
   |                             
 --+                             
                                 
                                 
`;
const RIGHT_FORWARD_LEFT = `
                                 
                                 
                              +--
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              |  
                              +--
                                 
                                 
`;
const FORWARD_FORWARD = `
                                 
                                 
                                 
                                 
                                 
      +--------------------+     
      |                    |     
      |                    |     
      |                    |     
      |                    |     
      |                    |     
      |                    |     
      |                    |     
      +--------------------+     
                                 
                                 
                                 
                                 
                                 
`;
const FORWARD_LEFT = `
                                 
                                 
   +                             
   |\\                            
   | \\                           
   |  +                          
   |  |                          
   |  |                          
   |  |                          
   |  |                          
   |  |                          
   |  |                          
   |  |                          
   |  +                          
   | /                           
   |/                            
   +                             
                                 
                                 
`;
const FORWARD_RIGHT = `
                                 
                                 
                              +  
                             /|  
                            / |  
                           +  |  
                           |  |  
                           |  |  
                           |  |  
                           |  |  
                           |  |  
                           |  |  
                           |  |  
                           +  |  
                            \\ |  
                             \\|  
                              +  
                                 
                                 
`;
const FORWARD_LEFT_FORWARD_RIGHT = `
                                 
                                 
                                 
                                 
                                 
    --+                          
      |                          
      |                          
      |                          
      |                          
      |                          
      |                          
      |                          
    --+                          
                                 
                                 
                                 
                                 
                                 
`;
const FORWARD_RIGHT_FORWARD_LEFT = `
                                 
                                 
                                 
                                 
                                 
                           +--   
                           |     
                           |     
                           |     
                           |     
                           |     
                           |     
                           |     
                           +--   
                                 
                                 
                                 
                                 
                                 
`;

exports.TextMaze = class TextMaze {

  render(room, direction) {
    let t = [VIEW.split("")]
    let left_room = room.goLeft(direction)
    let forward_room = room.goForward(direction)
    let right_room = room.goRight(direction)
    if (typeof left_room === 'undefined') {
      t.push(LEFT.split(""))
    }
    else {
      if (typeof left_room.goForward(direction) === 'undefined') {
        t.push(LEFT_FORWARD_RIGHT.split(""))
      }
    }
    if (typeof forward_room === 'undefined') {
      t.push(FORWARD.split(""))
    }
    else {
      let forward_left_room = forward_room.goLeft(direction)
      if (typeof forward_left_room === 'undefined') {
        t.push(FORWARD_LEFT.split(""))
      }
      else {
        if (typeof forward_left_room.goForward(direction) === 'undefined') {
          t.push(FORWARD_LEFT_FORWARD_RIGHT.split(""))
        }
      }
      if (typeof forward_room.goForward(direction) === 'undefined') {
        t.push(FORWARD_FORWARD.split(""))
      }
      let forward_right_room = forward_room.goRight(direction)
      if (typeof forward_right_room === 'undefined') {
        t.push(FORWARD_RIGHT.split(""))
      }
      else {
        if (typeof forward_right_room.goForward(direction) === 'undefined') {
          t.push(FORWARD_RIGHT_FORWARD_LEFT.split(""))
        }
      }
    }
    if (typeof right_room === 'undefined') {
      t.push(RIGHT.split(""))
    }
    else {
      if (typeof right_room.goForward(direction) === 'undefined') {
        t.push(RIGHT_FORWARD_LEFT.split(""))
      }
    }
    let zip= rows=>rows[0].map((_,c)=>rows.map(row=>row[c]))
    let z = zip(t);
    let result = z.map(row => {return row.reduce((a,b) => {return a>b?a:b;})});
    return(result.join(""));
  }

  handleKeyDown(e) {
    switch (e.key) {
    case 'w':
      this.goForward();
      this.view = this.render();
      break;
    case 'a':
      this.goLeft();
      this.view = this.render();
      break;
    case 's':
      this.goBackward();
      this.view = this.render();
      break;
    case 'd':
      this.goRight();
      this.view = this.render();
      break;
    default:
      return;
    }
    return;
  }
}
