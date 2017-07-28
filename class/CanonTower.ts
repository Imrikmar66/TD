class CanonTower extends Tower {

    private radius: number;
    constructor(position: Phaser.Point, model: string, name?: string){
        super(position, model, name);
        this.fireRate = 120;
        this.damage = 50;
        this.radius = 64;
    }

    upgrade(){
        super.upgrade();
        this.radius += 64;
        this.damage += this.step*25;
    }

    display(layer: Phaser.Group){
        super.display(layer);
    }

    renderFire(point: Phaser.Point){
        let game: Phaser.Game = ContextManager.getContext();
        let bullet: Phaser.Sprite = game.add.sprite(this.sprite.x, this.sprite.y, "bullet");
        let tween: Phaser.Tween = game.add.tween(bullet);
        tween.to({ x: point.x + 32, y: point.y + 32}, 500, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(function(bullet){
            let canon: CanonTower = this;
            bullet.destroy();
            canon.renderExplode(bullet.position);
        }, this);
    }

    renderExplode(point: Phaser.Point){
        let explosion: Phaser.Sprite = ContextManager.getContext().add.sprite(point.x, point.y, 'explosion');
        let scale: Phaser.Point = new Phaser.Point(explosion.scale.x * ( 1 + 0.5*this.step), explosion.scale.y * ( 1 + 0.5*this.step));
        let position: Phaser.Point = new Phaser.Point(point.x - explosion.width/2 * ( 1 + 0.5*this.step), point.y - explosion.height/2 * ( 1 + 0.5*this.step));
        explosion.scale = scale;
        explosion.position = position;
        let explode: Phaser.Animation = explosion.animations.add('explode');
        explode.onComplete.add(function(){
            explosion.destroy();
        }, this);
        explosion.play('explode', 20);
        for (let enemi of EnemiManager.getInstance().getEnemiRangedAt(point, this.radius)){
            super.fireOn(enemi);
        }
    }

    fireOn(enemi: Enemi){
        this.renderFire(enemi.getSpritePosition());
    }

}
