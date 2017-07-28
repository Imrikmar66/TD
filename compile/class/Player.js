var Player = (function () {
    function Player() {
        this.gold = 50;
    }
    Player.prototype.canPay = function (sum) {
        if (this.gold - sum >= 0)
            return true;
        else
            return false;
    };
    Player.prototype.gainGold = function (gold) {
        this.gold += gold;
        ContextManager.getContext().debug.text("mONEY : " + this.gold, 20, 20);
    };
    Player.prototype.pay = function (gold) {
        this.gold -= gold;
        ContextManager.getContext().debug.text("mONEY : " + this.gold, 20, 20);
    };
    return Player;
}());
