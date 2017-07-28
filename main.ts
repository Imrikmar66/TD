class ContextManager {
  private static context: Phaser.Game;
  private static currentMap: GameMap;
  private static player: Player;
  private static menus: MenuManager;

  static getContext(): Phaser.Game{
    return ContextManager.context;
  }
  static setContext(context: Phaser.Game): void {
    ContextManager.context = context;
  }

  static getCurrentMap(): GameMap{
    return ContextManager.currentMap;
  }
  static setCurrentMap(map: GameMap): void {
    ContextManager.currentMap = map;
  }

  static getPlayer(): Player{
    return ContextManager.player;
  }
  static setPlayer(player: Player): void {
    ContextManager.player = player;
  }

  static getMenus(): MenuManager{
    return ContextManager.menus;
  }
  static setMenus(menus: MenuManager): void {
    ContextManager.menus = menus;
  }

}

class UpdateManager {

    private updates: number;

    constructor(){
        this.updates = 0;
    }

    addCount(){
        this.updates ++;
        if (this.updates >= Number.MAX_SAFE_INTEGER)
            this.updates = 0;
    }

    getCount(){
        return this.updates;
    }

}

class Game {

  buildMenu: BuildMenu;
  game: Phaser.Game;
  updateManager: UpdateManager;
  map: GameMap;
  player: Player;
  ground: Phaser.Tileset;
  towers: TowerManager;
  enemis: EnemiManager;
  tileMapLayer: Phaser.TilemapLayer;
  towerLayer: Phaser.Group;
  enemiLayer: Phaser.Group;
  cursors: Phaser.CursorKeys;
  waves: number;

  level1: Object;

  constructor() {

    this.waves = 1;
    ContextManager.setMenus(new MenuManager());
    this.buildMenu = new BuildMenu();
    this.map = new GameMap(64, 64);
    this.player = new Player();
    this.towers = TowerManager.getInstance();
    this.enemis = EnemiManager.getInstance();
    this.game = new Phaser.Game(1200, 704, Phaser.AUTO, 'gameDiv');
    this.updateManager = new UpdateManager();
    ContextManager.setContext(this.game);

    this.level1 = {
        preload: this.preload,
        create: this.create,
        update: this.update,
        spawnEvent: this.spawnEvent,
        spawn : this.spawn,
        defend: this.defend,
        waves: this.waves,
        buildMenu : this.buildMenu,
        map : this.map,
        player : this.player,
        towers : this.towers,
        enemis : this.enemis,
        updateManager : this.updateManager,
        tileMapLayer: Phaser.TilemapLayer
    };

  }

  addState(stateName: string, state: Object){
    this.game.state.add(stateName, state);
  }

  start(stateName: string){
      this.game.state.start(stateName);
  }

  preload() {

    this.game.stage.backgroundColor = '#2d2d2d';

    this.buildMenu.preload();
    this.map.preload();
    this.towers.preload();
    this.enemis.preload();

  }

  create() {

    this.map.create();
    ContextManager.setCurrentMap(this.map);
    ContextManager.setPlayer(this.player);

    this.map.generateLevel('level1');

    /* on click create tower */

    this.map.getCurrentLayer().events.onInputDown.add(
      this.buildMenu.openMenu,
      this.buildMenu,
      0,
      this.towers
    );

    this.map.generate('level1');

    //Generate sublayers for Tower
    this.towerLayer = this.game.add.group();
    this.towers.setLayer(this.towerLayer);

    //Generate sublayers for enemis
    this.enemiLayer = this.game.add.group();
    this.enemis.setLayer(this.enemiLayer);

    //camera move
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.spawnEvent();

  }

   // This function is called 60 times per second
  update() {
    if (this.cursors.left.isDown)
    {
        this.game.camera.x -= 4;
    }
    else if (this.cursors.right.isDown)
    {
        this.game.camera.x += 4;
    }

    this.towers.updates();
    this.defend();

  }

  spawnEvent(){

    this.game.time.events.repeat(
        Phaser.Timer.SECOND,
        this.waves,
        this.spawn,
        this
    );

    this.game.time.events.add(
        Phaser.Timer.SECOND * (this.waves*2 + 5),
        this.spawnEvent,
        this
    );

    this.waves++;

  }

  spawn(){
    let spawn: Phaser.Point = new Phaser.Point(0, this.map.getCurrentLayer().getTileY(Math.floor(this.map.getCurrentLayer().height / 2)));
    let enemi: Enemi = this.enemis.create(spawn, this.waves);
    enemi.playAnimation(AnimationEnemi.WALK_RIGHT);
    enemi.walk();
  }

  defend(){
      for (let model_tower of this.towers.getElements()){
        let atLeastOneOnRange: boolean = false;

        let tower: Tower = <Tower> model_tower;

        for (let model_enemi of this.enemis.getElements()){

            let enemi: Enemi = <Enemi> model_enemi;

            if (!enemi.isAlive())
                continue;

            if(tower.getClassName() == "SlowTower" && enemi.isSlow())
                continue;

            if (tower.isRanged(enemi) && tower.canFire()){
                atLeastOneOnRange = true;
                tower.fireOn(enemi);
                break;
            }

        }
        if(!atLeastOneOnRange){
            tower.notFiring();
        }
    }
  }

}

window.onload = () => {

    let game: Game = new Game();
    game.addState('level1', game.level1);
    game.start('level1');

};
