abstract class Tower extends Model {

  public name: string;
  protected range: number;
  protected damage: number;
  protected maxStep: number;
  protected step: number;
  protected fireRate: number;
  protected firingCounter: number;

  constructor(position: Phaser.Point, model: string, name?: string){
    super(position, model);

    this.name = name;
    this.range= 100;
    this.damage = 1;
    this.step = 0;
    this.fireRate = 60;
    this._frame = "base";
    this.maxStep = 2;
    this.firingCounter = 0;
    
  }

  upgradeCost(): number {
    let price: number = 0;
    switch(this.step){
      case 0:
        price = 10;
        break;
      case 1:
        price = 20;
        break;
      default: 10;
    }

    return price;
  }

    display(layer: Phaser.Group) {

        this.sprite = layer.create(
            0,
            0,
            this.model,
            this._frame
        );
        
        this.refreshPosition();
        this.sprite.inputEnabled = true;
        this.sprite.anchor.set(0, 0);
    }
    
    refreshPosition(){
        let map = ContextManager.getCurrentMap();
        this.sprite.position.set(
            this.position.x * map.getTileWidth() + map.getTileWidth() / 2 - this.sprite.width / 2,
            this.position.y * map.getTileHeight() + (map.getTileHeight() - this.sprite.height)
        );
    }

    upgrade(){
      if(!ContextManager.getPlayer().canPay(this.upgradeCost())){
        ContextManager.getContext().debug.text("Not enought money", 20, 40);
        return;
      }

      if(!this.canUpgrade())
        return;

      ContextManager.getPlayer().pay(this.upgradeCost());

        var newFrame: string;
        switch (this.sprite.frameName){
            case "base" :
                newFrame = "medium";
                break;
            case "medium" :
                newFrame = "hight"
                break;
            case "hight" :
                return;
            default :
                throw new Error("Unknow frameName: " + this.sprite.frameName);
        }
        this.frame = newFrame;
        this.step++;
        this.refreshPosition();
    }

    canUpgrade(){
      return this.step < this.maxStep;
    }

    isRanged(enemi: Enemi): boolean{
        let towerPos: Phaser.Point = this.getSpritePosition();
        let enemiPos: Phaser.Point = enemi.getSpritePosition();
        let range = Math.sqrt(Math.pow((towerPos.x - enemiPos.x), 2) + Math.pow((towerPos.y - enemiPos.y), 2));

        return range <= this.range;
    }

    canFire(): boolean {
        if(this.firingCounter == 0){
            this.firingCounter = this.fireRate;
            return true;
        }
        return false;
    }

    fireOn(enemi: Enemi){
        enemi.isHit(this.damage);
    }
    
    update(){
        this.firingCounter = (this.firingCounter <= 0) ? 0 : this.firingCounter - 1;
    }

    notFiring(){}

}
