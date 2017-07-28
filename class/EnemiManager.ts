class EnemiManager extends ComponentManager {

    private constructor(){
        super();
    }
    
    preload(){
      ContextManager.getContext().load.atlas('enemi', 'assets/img/enemi.png', 'assets/atlas/character.json');
    }

    create(point: Phaser.Point, wave?: number): Enemi {
      let enemi: Enemi = new Enemi(point, 'enemi');

      if(wave)
        enemi.renforce(wave);

      enemi.display();
      this.register(enemi);
      return enemi;
    }

    clear(){
        for (let model_enemi of this.managed_elements){
            let enemi: Enemi = <Enemi> model_enemi;
            if (!enemi.isAlive()){
                this.removeElement(model_enemi);
            }
        }
    }
    
    getEnemiRangedAt(point: Phaser.Point, range: number): Array<Enemi>{
        
        let enemiList: Array<Enemi> = [];
        
        for (let model_enemi of this.managed_elements){
            let enemi: Enemi = <Enemi> model_enemi;
            let spritePos: Phaser.Point = model_enemi.getSpritePosition();
            let currentRange: number = Math.sqrt(Math.pow((spritePos.x - point.x),2) + Math.pow((spritePos.y - point.y), 2));
            if(currentRange <= range)
                enemiList.push(enemi);
        }
        
        return enemiList;
        
    }
    
    /* --- Manager getter --- */
    private static instance = null;
    static getInstance(): EnemiManager{
        if (EnemiManager.instance == null){
            EnemiManager.instance = new EnemiManager();
        }
        return EnemiManager.instance;
    }

}
