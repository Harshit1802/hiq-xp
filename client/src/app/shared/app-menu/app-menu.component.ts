import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { RendererService } from 'src/app/services/renderer.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.less']
})
export class AppMenuComponent implements OnInit {
  menus: Menu[] = [];
  constructor(
    // private route: ActivatedRoute,
    private router: Router,
    private rendererService: RendererService,
  ) { }
  ngOnInit(): void {
    this.getMenu();

  }

  getMenu() {
    this.rendererService.getMenus().subscribe((json) => {
      this.menus = json;
      let level = 1;
      this.menus.forEach(a => {
        a.level = 1
        a.children.forEach(b => {
          b.level = 2;
          b.children.forEach(c => {
            c.level = 3;
          });
        });
      });
      console.log(this.menus);
    });
  }
  menuClick(menu: Menu) {
    menu.selected = true;
    this.router.navigateByUrl(menu.href);
  }
}
