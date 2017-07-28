class Lifebar {

    private maxW: number;
    private maxH: number;
    private w: number;
    private h: number;
    private x: number;
    private y: number;
    private percent: number;
    private graphics: Phaser.Graphics;

    setPercent(value: number){
        let x: number = this.x;
        let y: number = this.y;
        this.percent = value;
        this.graphics.clear();
        this.w = Math.floor((value * this.maxW ) / 100);
        this.display();

    }

    getGraphics(): Phaser.Graphics {
        return this.graphics;
    }

    constructor(x: number, y: number){
        this.percent = 100;
        this.graphics = new Phaser.Graphics(ContextManager.getContext());
        this.maxW = 32;
        this.maxH = 2;
        this.w = this.maxW;
        this.h = this.maxH;
        this.x = x;
        this.y = y;
        this.display();
    }

    display(){

        this.graphics.lineStyle(2, 0x42f45f, 1);
        this.graphics.beginFill(0x42f45f);
        this.graphics.drawRect(this.x, this.y, this.w, this.h);
        this.graphics.endFill();
    }



}
