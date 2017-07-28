abstract class ComponentManager implements IComponentManager {

  protected layer: Phaser.Group;
  protected managed_elements: Array<Model> = [];

  setLayer(layer: Phaser.Group){
    this.layer = layer;
  }

  getElements(): Array<Model>{
      return this.managed_elements;
  }

  abstract preload(): any;
  abstract create(point: Phaser.Point, ...options:Array<any>): Model;

  protected register(element: Model){
       this.managed_elements.push(element);
  }

  protected getElementByPoint(point: Phaser.Point): Model {
      for(let model of this.managed_elements){
          if(model.getPosition().x == point.x && model.getPosition().y == point.y)
              return model;
      }
      return null;
  }

    protected removeElement(target: Model){
      for(let skey in this.managed_elements){
          let key: number = parseInt(skey);
          let element = this.managed_elements[key];
          if (element.getId() == target.getId()){
              this.managed_elements.splice(key, 1);
              return;
          }
      }
    }

}

interface IComponentManager {
  preload(): void;
  create(point: Phaser.Point, options?:Object): void;
}
