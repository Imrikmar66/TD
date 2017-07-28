var ContextManager = (function () {
    function ContextManager() {
    }
    ContextManager.getContext = function () {
        return ContextManager.context;
    };
    ContextManager.setContext = function (context) {
        ContextManager.context = context;
    };
    ContextManager.getCurrentMap = function () {
        return ContextManager.currentMap;
    };
    ContextManager.setCurrentMap = function (map) {
        ContextManager.currentMap = map;
    };
    ContextManager.getPlayer = function () {
        return ContextManager.player;
    };
    ContextManager.setPlayer = function (player) {
        ContextManager.player = player;
    };
    ContextManager.getMenus = function () {
        return ContextManager.menus;
    };
    ContextManager.setMenus = function (menus) {
        ContextManager.menus = menus;
    };
    return ContextManager;
}());
var UpdateManager = (function () {
    function UpdateManager() {
        this.updates = 0;
    }
    UpdateManager.prototype.addCount = function () {
        this.updates++;
        if (this.updates >= Number.MAX_SAFE_INTEGER)
            this.updates = 0;
    };
    UpdateManager.prototype.getCount = function () {
        return this.updates;
    };
    return UpdateManager;
}());
var Game = (function () {
    function Game() {
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
            spawn: this.spawn,
            defend: this.defend,
            waves: this.waves,
            buildMenu: this.buildMenu,
            map: this.map,
            player: this.player,
            towers: this.towers,
            enemis: this.enemis,
            updateManager: this.updateManager,
            tileMapLayer: Phaser.TilemapLayer
        };
    }
    Game.prototype.addState = function (stateName, state) {
        this.game.state.add(stateName, state);
    };
    Game.prototype.start = function (stateName) {
        this.game.state.start(stateName);
    };
    Game.prototype.preload = function () {
        this.game.stage.backgroundColor = '#2d2d2d';
        this.buildMenu.preload();
        this.map.preload();
        this.towers.preload();
        this.enemis.preload();
    };
    Game.prototype.create = function () {
        this.map.create();
        ContextManager.setCurrentMap(this.map);
        ContextManager.setPlayer(this.player);
        this.map.generateLevel('level1');
        this.map.getCurrentLayer().events.onInputDown.add(this.buildMenu.openMenu, this.buildMenu, 0, this.towers);
        this.map.generate('level1');
        this.towerLayer = this.game.add.group();
        this.towers.setLayer(this.towerLayer);
        this.enemiLayer = this.game.add.group();
        this.enemis.setLayer(this.enemiLayer);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.spawnEvent();
    };
    Game.prototype.update = function () {
        if (this.cursors.left.isDown) {
            this.game.camera.x -= 4;
        }
        else if (this.cursors.right.isDown) {
            this.game.camera.x += 4;
        }
        this.towers.updates();
        this.defend();
    };
    Game.prototype.spawnEvent = function () {
        this.game.time.events.repeat(Phaser.Timer.SECOND, this.waves, this.spawn, this);
        this.game.time.events.add(Phaser.Timer.SECOND * (this.waves * 2 + 5), this.spawnEvent, this);
        this.waves++;
    };
    Game.prototype.spawn = function () {
        var spawn = new Phaser.Point(0, this.map.getCurrentLayer().getTileY(Math.floor(this.map.getCurrentLayer().height / 2)));
        var enemi = this.enemis.create(spawn, this.waves);
        enemi.playAnimation(AnimationEnemi.WALK_RIGHT);
        enemi.walk();
    };
    Game.prototype.defend = function () {
        for (var _i = 0, _a = this.towers.getElements(); _i < _a.length; _i++) {
            var model_tower = _a[_i];
            var atLeastOneOnRange = false;
            var tower = model_tower;
            for (var _b = 0, _c = this.enemis.getElements(); _b < _c.length; _b++) {
                var model_enemi = _c[_b];
                var enemi = model_enemi;
                if (!enemi.isAlive())
                    continue;
                if (tower.getClassName() == "SlowTower" && enemi.isSlow())
                    continue;
                if (tower.isRanged(enemi) && tower.canFire()) {
                    atLeastOneOnRange = true;
                    tower.fireOn(enemi);
                    break;
                }
            }
            if (!atLeastOneOnRange) {
                tower.notFiring();
            }
        }
    };
    return Game;
}());
window.onload = function () {
    var game = new Game();
    game.addState('level1', game.level1);
    game.start('level1');
};
