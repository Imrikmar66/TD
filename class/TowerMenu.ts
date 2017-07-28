class TowerMenu extends Menu {

    private itemUpgrade: MenuItem;

    preload(){
        ContextManager.getContext().load.image('item-upgrade', 'assets/img/upgrade.png');
    }

    create(point: Phaser.Point, tower: Tower): boolean {
        if(!super.create(point) || !tower.canUpgrade())
            return false;

        let game: Phaser.Game = ContextManager.getContext();
        let map: GameMap = ContextManager.getCurrentMap();

        let w: number = map.getTileWidth();
        let h: number = map.getTileHeight();

        let thePoint: Phaser.Point = new Phaser.Point(point.x, point.y);
        thePoint.x *= w;
        thePoint.y *= h;

        this.menu = game.add.group();

        /*this.itemUpgrade = this.menu.create(thePoint.x, thePoint.y, 'item-upgrade');
        this.itemUpgrade.anchor.set(0, 0);
        this.itemUpgrade.inputEnabled = true;
        this.itemUpgrade.alpha = 0;

        let tween_item: Phaser.Tween = game.add.tween(this.itemUpgrade);
        tween_item.to({ y: thePoint.y - h, alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true);

        this.menu.onChildInputDown.add(this.select, this, 0, tower);*/
        this.itemUpgrade = new MenuItem(thePoint, 'item-upgrade', tower.upgradeCost() + "c", { font: "15px Arial", fontWeight: "bold", fill: "#000" });
        this.itemUpgrade.getGroup().onChildInputDown.add(this.select, this, 0, tower);
        this.itemUpgrade.animateFadeOut();

        this.menu.add(this.itemUpgrade.getGroup());

        return true;
    }

    select(event: Phaser.Sprite, pointer: Phaser.Pointer, tower: Tower){
        tower.upgrade();
        this.close();
    }

}
