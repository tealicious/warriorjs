
let wallHit = false;
let sendIt = false;
let healThresh = 13;
class Player {
  playTurn(warrior) {
    if(warrior.look()){
       warrior.shoot();
     }
    else if (warrior.feel().isWall()) {
      warrior.pivot();
      wallHit = true;
    } 
    else if (!wallHit) {
      if (warrior.feel("backward").isEmpty()) {
        warrior.walk("backward");
      } else if (!warrior.feel("backward").isEmpty()) {
        if (warrior.feel('backward').isCaptive()) {
          warrior.rescue('backward');
        } else if (warrior.feel('backward').isWall()) {
          wallHit = true;
        } else {
          warrior.attack("backward");
        }
      }
    } 
    else if (warrior.feel().isEmpty()) {
      if (warrior.health() <= healThresh && !sendIt) {
        if (this.health > warrior.health()) {
          warrior.walk("backward");
        } else {
            warrior.rest();
            if (warrior.health() == healThresh) {
              sendIt = true;
            }
        }
      } else {
           warrior.walk();
      }
    } 
    else {
      if (warrior.feel().isCaptive()) {
        warrior.rescue();
      } else {
        warrior.attack();
      }
    }
    this.health = warrior.health();
  }
}
