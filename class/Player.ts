class Player {

  private gold: number = 50;
  private energy: number;

  canPay(sum: number){
    if(this.gold - sum >= 0)
      return true;
    else
      return false;
  }

  gainGold(gold: number){
    this.gold += gold;
    ContextManager.getContext().debug.text("mONEY : "+ this.gold, 20, 20);
  }

  pay(gold: number){
    this.gold -= gold;
    ContextManager.getContext().debug.text("mONEY : "+ this.gold, 20, 20);
  }

}
