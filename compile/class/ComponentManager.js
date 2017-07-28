var ComponentManager = (function () {
    function ComponentManager() {
        this.managed_elements = [];
    }
    ComponentManager.prototype.setLayer = function (layer) {
        this.layer = layer;
    };
    ComponentManager.prototype.getElements = function () {
        return this.managed_elements;
    };
    ComponentManager.prototype.register = function (element) {
        this.managed_elements.push(element);
    };
    ComponentManager.prototype.getElementByPoint = function (point) {
        for (var _i = 0, _a = this.managed_elements; _i < _a.length; _i++) {
            var model = _a[_i];
            if (model.getPosition().x == point.x && model.getPosition().y == point.y)
                return model;
        }
        return null;
    };
    ComponentManager.prototype.removeElement = function (target) {
        for (var skey in this.managed_elements) {
            var key = parseInt(skey);
            var element = this.managed_elements[key];
            if (element.getId() == target.getId()) {
                this.managed_elements.splice(key, 1);
                return;
            }
        }
    };
    return ComponentManager;
}());
