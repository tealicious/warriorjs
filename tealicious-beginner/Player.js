class Player {
  constructor(backWallReached) {
    this.backWallReached = false;
  }
  playTurn(warrior) {
    if (!backWallReached) {
      if (warrior.feel("backward").isEmpty()) {
        warrior.walk("backward");
      } else if (!warrior.feel("backward").isEmpty()) {
        if (warrior.feel().isCaptive()) {
          warrior.rescue();
        } else if (warrior.feel().isWall()) {
          this.backWallReached = true;
        } else {
          warrior.attack("backward");
        }
      }
    } else if (warrior.feel().isEmpty()) {
      if (warrior.health() <= 13) {
        if (this.health > warrior.health()) {
          warrior.walk("backward");
        } else {
          warrior.rest();
        }
      } else {
        warrior.walk();
      }
    } else {
      if (warrior.feel().isCaptive()) {
        warrior.rescue();
      } else {
        warrior.attack();
      }
    }
    this.health = warrior.health();
  }
}
