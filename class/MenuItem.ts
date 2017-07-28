class MenuItem {

    private group: Phaser.Group;
    private sprite: Phaser.Sprite;
    private text: Phaser.Text;

    getGroup(): Phaser.Group {
        return this.group;
    }

    constructor(point: Phaser.Point, sprite: string, text: string|number, textstyles?: Object){
        let game: Phaser.Game = ContextManager.getContext();

        this.group = game.add.group();
        this.group.x = point.x;
        this.group.y = point.y;

        this.sprite = this.group.create(0, 0, sprite);
        this.sprite.anchor.set(0, 0);
        this.sprite.inputEnabled = true;

        this.text = new Phaser.Text(game, 0, 0, text.toString(), textstyles);

        this.group.add(this.text);
    }

    animateTop(){
        let game: Phaser.Game = ContextManager.getContext();
        let tween_item1: Phaser.Tween = game.add.tween(this.group);
        let map: GameMap = ContextManager.getCurrentMap();
        let h: number = map.getTileHeight();

        tween_item1.to({ y: this.group.y - h }, 500, Phaser.Easing.Elastic.Out, true);
    }

    animateBottom(){
        let game: Phaser.Game = ContextManager.getContext();
        let tween_item1: Phaser.Tween = game.add.tween(this.group);
        let map: GameMap = ContextManager.getCurrentMap();
        let h: number = map.getTileHeight();

        tween_item1.to({ y: this.group.y + h }, 500, Phaser.Easing.Elastic.Out, true);
    }

    animateLeft(){
        let game: Phaser.Game = ContextManager.getContext();
        let tween_item1: Phaser.Tween = game.add.tween(this.group);
        let map: GameMap = ContextManager.getCurrentMap();
        let w: number = map.getTileWidth();

        tween_item1.to({ x: this.group.x - w }, 500, Phaser.Easing.Elastic.Out, true);
    }

    animateRight(){
        let game: Phaser.Game = ContextManager.getContext();
        let tween_item1: Phaser.Tween = game.add.tween(this.group);
        let map: GameMap = ContextManager.getCurrentMap();
        let w: number = map.getTileWidth();

        tween_item1.to({ x: this.group.x + w }, 500, Phaser.Easing.Elastic.Out, true);
    }

    animateFadeOut(){
      let game: Phaser.Game = ContextManager.getContext();
      let map: GameMap = ContextManager.getCurrentMap();
      let h: number = map.getTileHeight();
      this.group.alpha = 0;

      let tween_item: Phaser.Tween = game.add.tween(this.group);
      tween_item.to({ y: this.group.y - h, alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true);
    }

}
