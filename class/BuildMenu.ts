class BuildMenu extends Menu {

    item1: MenuItem;
    item2: MenuItem;
    item3: MenuItem;

    preload(){
        ContextManager.getContext().load.image('item-1', 'assets/img/menu-item-1.png');
        ContextManager.getContext().load.image('item-2', 'assets/img/menu-item-2.png');
        ContextManager.getContext().load.image('item-3', 'assets/img/menu-item-3.png');
    }

    create(point: Phaser.Point, towerManager: TowerManager): boolean {
        if(!super.create(point))
          return false;

        let game: Phaser.Game = ContextManager.getContext();
        let map: GameMap = ContextManager.getCurrentMap();
        let groundTile: GroundTile = map.getGroundTileManager().getElementByPoint(point);

        if(!groundTile.isConstructible())
            return false;


        let w: number = map.getTileWidth();
        let h: number = map.getTileHeight();

        let thePoint: Phaser.Point = new Phaser.Point(point.x, point.y);
        thePoint.x *= w;
        thePoint.y *= h;

        this.menu = game.add.group();

        this.item1 = new MenuItem(thePoint, 'item-1', towerManager.getTowerPrice().MACHINEGUN + "c",  { font: "15px Arial", fontWeight: "bold", fill: "#000" });
        this.item1.getGroup().onChildInputDown.add(this.select, this, 0, towerManager, point);
        this.item1.animateTop();

        this.item2 = new MenuItem(thePoint, 'item-2', towerManager.getTowerPrice().SLOW + "c", { font: "15px Arial", fontWeight: "bold", fill: "#000" });
        this.item2.getGroup().onChildInputDown.add(this.select, this, 0, towerManager, point);
        this.item2.animateRight();
        
        this.item3 = new MenuItem(thePoint, 'item-3', towerManager.getTowerPrice().CANON + "c", { font: "15px Arial", fontWeight: "bold", fill: "#000" });
        this.item3.getGroup().onChildInputDown.add(this.select, this, 0, towerManager, point);
        this.item3.animateBottom();

        this.menu.add(this.item1.getGroup());
        this.menu.add(this.item2.getGroup());
        this.menu.add(this.item3.getGroup());

        return true;

    }

    select(event: Phaser.Sprite, pointer: Phaser.Pointer, element: TowerManager, position: Phaser.Point){

        let map: GameMap = ContextManager.getCurrentMap();

        let groundTile: GroundTile = map.getGroundTileManager().getElementByPoint(position);

        if(groundTile.isConstructible()){

            if(event.key == "item-1"){
              element.create(position, TOWERTYPE.MACHINEGUN);
            }
            else if(event.key == "item-2"){
              element.create(position, TOWERTYPE.SLOW);
            }
            else if(event.key == "item-3"){
              element.create(position, TOWERTYPE.CANON);
            }
        }

        this.close();
    }

}
