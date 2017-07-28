abstract class Menu implements IComponentManager {

    protected menu: Phaser.Group;
    protected open: boolean = false;

    isOpen(): boolean {
      return this.open;
    }

    constructor(){
      ContextManager.getMenus().addMenu(this);
    }

    preload(){}

    openMenu(context: any, pointer: Phaser.Pointer, element: any, options: Object){

        let menuManager: MenuManager = ContextManager.getMenus();

        if(ContextManager.getMenus().atLeastOneOpen())
          menuManager.closeAll();

        let game: Phaser.Game = ContextManager.getContext();
        let layer: Phaser.TilemapLayer = ContextManager.getCurrentMap().getCurrentLayer();

        let x = game.input.activePointer.x + game.camera.x;
        let y = game.input.activePointer.y + game.camera.y;

        let coord: Phaser.Point = layer.getTileXY(x, y, new Phaser.Point());

        if(this.create(coord, element))
          this.open = true;

    }

    create(point: Phaser.Point, ...opts: Object[]): boolean {

        if (this.menu)
            return false;

        return true;
    }

    protected abstract select(event: Phaser.Sprite, ...options: any[]): void;

    close(){
        this.open = false;
        this.menu.destroy();
        this.menu = null;
    }

}
