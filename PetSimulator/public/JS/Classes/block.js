var Block = function(x,y,width,height,color,row,column,health,canBeAttacked) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.row = row;
    this.column = column;
    this.health = health;
    this.maxHealth = this.health;
    this.color = color;
    this.canBeAttacked = canBeAttacked;
}