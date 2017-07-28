class MachinegunTower extends Tower {

    private fireSprite: Phaser.Sprite;
    private fireSprite2: Phaser.Sprite;

    constructor(position: Phaser.Point, model: string, name?: string){
        super(position, model);
        this.fireRate = 2;
    }

    display(layer: Phaser.Group){

        let map: GameMap = ContextManager.getCurrentMap();
        super.display(layer);

        this.fireSprite = layer.create(
            this.position.x * map.getTileWidth() + 5,
            this.position.y * map.getTileHeight() + 26,
            'fire',
            0
        );
        this.fireSprite.anchor.set(0, 0);
        this.fireSprite.alpha = 0;

        this.fireSprite2 = layer.create(
            this.position.x * map.getTileWidth() + 5,
            this.position.y * map.getTileHeight() + 26,
            'fire',
            0
        );
        this.fireSprite2.anchor.set(0, 0);
        this.fireSprite2.alpha = 0;
    }

    upgrade(){
        super.upgrade();
        this.damage += this.step;
    }

    setFireByTopLeft(){
        switch(this.step){
            case 0:
            case 1:
            default:
                this.setFireRender(8, 12, 135);
                break;
            case 2:
                this.setDoubleFireRender(8, 12, 15, 6, 135);
                break;
        }

    }

    setFireByTopRight(){
        switch(this.step){
            case 0:
            case 1:
            default:
                this.setFireRender(24, 17, -135);
                break;
            case 2:
                this.setDoubleFireRender(33, 12, 22, 8, -135);
                break;
        }
    }

    setFireByBottomLeft(){
        switch(this.step){
            case 0:
            case 1:
            default:
                this.setFireRender(5, 26, 45);
                break;
            case 2:
                this.setDoubleFireRender(5, 22, 10, 25, 45);
                break;
        }
    }

    setFireByBottomRight(){
        switch(this.step){
            case 0:
            case 1:
            default:
                this.setFireRender(22, 32, -45);
                break;
            case 2:
                this.setDoubleFireRender(22, 32, 28, 28, -45);
                break;
        }
    }

    setFireRender(x: number, y: number, angle: number){
        this.fireSprite.x = this.sprite.x + x;
        this.fireSprite.y = this.sprite.y + y;
        this.fireSprite.angle = angle;
        this.fireSprite.alpha = 1;
    }

    setDoubleFireRender(x1: number, y1: number, x2: number, y2: number, angle: number){
        this.setFireRender(x1, y1, angle);
        this.fireSprite2.x = this.sprite.x + x2;
        this.fireSprite2.y = this.sprite.y + y2;
        this.fireSprite2.angle = angle;
        this.fireSprite2.alpha = 1;
    }

    fireOn(enemi: Enemi){
        if (enemi.getSpritePosition().y > this.sprite.y){
            if (enemi.getSpritePosition().x < this.sprite.x)
                this.setFireByBottomLeft();
            else
                this.setFireByBottomRight();
        }
        else{
            if (enemi.getSpritePosition().x < this.sprite.x)
                this.setFireByTopLeft();
            else
                this.setFireByTopRight();
        }

        super.fireOn(enemi);

    }

    notFiring(){
        this.fireSprite.alpha = 0;
        this.fireSprite2.alpha = 0;
    }

}
