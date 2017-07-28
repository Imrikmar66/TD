class MenuManager {

  private all_menus: Array<Menu> = [];

  addMenu(menu: Menu){
    this.all_menus.push(menu);
  }

  getOpens(): Array<Menu> {
      let open_menus: Array<Menu> = [];
      for(let menu of this.all_menus){
          if(menu.isOpen())
            open_menus.push(menu);
      }

      return open_menus;
  }

  getClose(): Array<Menu> {
    let closed_menus: Array<Menu> = [];
    for(let menu of this.all_menus){
        if(!menu.isOpen())
          closed_menus.push(menu);
    }

    return closed_menus;
  }

  atLeastOneOpen(): boolean {
    return this.getOpens().length > 0;
  }

  closeAll(){
      for(let menu of this.getOpens()){
          menu.close();
      }
  }

}
