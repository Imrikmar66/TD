enum TOWERTYPE {
    SLOW,
    MACHINEGUN,
    CANON
}
class TowerManager extends ComponentManager {

    private menu: TowerMenu;
    private towersPrices: any = {
        MACHINEGUN : 5,
        SLOW : 5,
        CANON: 5
    };

    getTowerPrice(){
        return this.towersPrices;
    }

    private constructor(){
        super();
        this.menu = new TowerMenu();
    }

    preload(){
      let game: Phaser.Game = ContextManager.getContext();
      game.load.atlas('machine-tower', 'assets/img/towers.png', 'assets/atlas/tower.json');
      game.load.atlas('slow-tower', 'assets/img/towers-5.png', 'assets/atlas/tower-5.json');
      game.load.atlas('canon-tower', 'assets/img/towers-4.png', 'assets/atlas/tower-4.json');
      game.load.image('arrow', 'assets/img/arrow.png');
      game.load.image('fire', 'assets/img/fire.png');
      game.load.image('bullet', 'assets/img/bullet.png');
      game.load.spritesheet('snowflakes', 'assets/img/snowflakes.png', 17, 17);
      game.load.spritesheet('explosion', 'assets/img/explosion.png', 64, 64, 7);
      this.menu.preload();
    }

    create (point: Phaser.Point, towerType: TOWERTYPE): Tower
    {
        var tower: Tower;

        //If tower exist upgrade it
        if (tower = <Tower> this.getElementByPoint(point)){
          return tower;
        }

        switch(towerType){
                case TOWERTYPE.MACHINEGUN :
                default :
                    if(ContextManager.getPlayer().canPay(this.towersPrices.MACHINEGUN)){
                      ContextManager.getPlayer().pay(this.towersPrices.MACHINEGUN);
                      tower = new MachinegunTower(point, 'machine-tower');
                    }
                    else return null;
                    break;

                case TOWERTYPE.SLOW :
                    if(ContextManager.getPlayer().canPay(this.towersPrices.SLOW)){
                      ContextManager.getPlayer().pay(this.towersPrices.SLOW);
                      tower = new SlowTower(point, 'slow-tower');
                    }
                    else return null;
                    break;
                  
                case TOWERTYPE.CANON :
                    if(ContextManager.getPlayer().canPay(this.towersPrices.CANON)){
                      ContextManager.getPlayer().pay(this.towersPrices.CANON);
                      tower = new CanonTower(point, 'canon-tower');
                    }
                    else return null;
                    break;

        }

        tower.display(this.layer);
        tower.getSprite().events.onInputDown.add(this.menu.openMenu, this.menu, 0, tower);
        ContextManager.getCurrentMap().getGroundTileManager().getElementByPoint(point).setConstructible(false);

        this.register(tower);
        return tower;
    }
    
    updates(){
        for (let tower_model of this.managed_elements){
            let tower: Tower = <Tower> tower_model;
            tower.update();
        }
    }
    
     /* --- Manager getter --- */
    private static instance = null;
    static getInstance(): TowerManager{
        if (TowerManager.instance == null){
            TowerManager.instance = new TowerManager();
        }
        return TowerManager.instance;
    }

}
