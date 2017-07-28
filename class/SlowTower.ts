class SlowTower extends Tower {

    private slowPower: number;
    private slowTime: number;

    constructor(position: Phaser.Point, model: string, name?: string){
      super(position, model, name);
      this.fireRate = 30;
      this.slowPower = 1000;
      this.slowTime = 1000;
    }

    upgrade(){
        super.upgrade();
        this.range += 100;
        this.slowTime += 1000;
    }

    renderFire(point: Phaser.Point){
        let game: Phaser.Game = ContextManager.getContext();
        var graphics: Phaser.Graphics = game.add.graphics(0, 0);
        graphics.beginFill();
        graphics.moveTo(this.sprite.position.x + 18, this.sprite.position.y);
        graphics.lineStyle(1, 0x4dc7df, 1);
        graphics.lineTo(point.x + 16, point.y);
        graphics.endFill();

        let emitter = game.add.emitter(point.x + 16, point.y + 16);
        emitter.makeParticles('snowflakes', 10);
        emitter.gravity = 10;
        emitter.maxParticleSpeed.setTo(10, 10);
        emitter.start(true, 500, null, 10);

        emitter.forEachAlive(function(p: Phaser.Particle){
            let tween = game.add.tween(p);
            tween.to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
        }, emitter);

        game.time.events.add(50, function(){
            graphics.clear();
        });
    }

    fireOn(enemi: Enemi) {

        this.renderFire(enemi.getSpritePosition());
        enemi.slow(this.slowPower, this.slowTime);
    }

}
