(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{qNYQ:function(l,n,u){"use strict";u.r(n);var t=u("CcnG"),e=function(){return function(){}}(),a=u("ES0t"),o=u("z5nN"),i=u("pMnS"),r=u("ZYCi"),c=u("Ip0R"),s=function(){function l(){}return l.prototype.transform=function(l,n){return l.filter(function(l){var u=0;return null!=l.idFatherMenu&&(u=l.idFatherMenu),0!==n&&0!==l.idFatherMenu&&l.idFatherMenu===n&&(u=l.idFatherMenu),u===n})},l}(),p=function(){function l(){}return l.prototype.transform=function(l,n){return l?(l.sort(function(l,u){return parseInt(l[n])<parseInt(u[n])?-1:parseInt(l[n])>parseInt(u[n])?1:0}),l):[]},l}(),b=u("OZfm"),d=u("lqqz"),m=u("NJnL"),g=u("gIcY"),f=u("DQlY"),v=(u("K93o"),u("5/JN")),h=u("BI4m"),k=u("t/Na"),P=function(){function l(l){this.http=l,this.loginResponse=JSON.parse(localStorage.getItem(h.a.localStorage))}return l.prototype.RefreshApplicationData=function(n){return this.http.get(l.ENDPOINT_REFRESH_DATA_AND_MENUS,{params:n}).pipe()},l.ENDPOINT_REFRESH_DATA_AND_MENUS=h.a.SERVER+"Refresh/DataAndMenus/",l.ngInjectableDef=t.Vb({factory:function(){return new l(t.Wb(k.c))},token:l,providedIn:"root"}),l}(),M=u("AkfZ"),C=function(){function l(l,n,u,t,e,a){this.location=l,this.router=n,this.loc=u,this.homeService=t,this.notify=e,this.loginService=a,this.applicationconfig={applicationVersion:"0.0.0.0",masterPageVersion:h.a.masterPageVersion,application:h.a.application,applicationName:h.a.applicationName,logo:h.a.logo,ico:h.a.ico,localStorage:h.a.localStorage},this.subscriptions=[],this.params={application:h.a.application}}return l.prototype.ngOnInit=function(){var l=this;if(null==this.applicationData){var n=localStorage.getItem("message"),u=new Date;this.applicationData=JSON.parse(localStorage.getItem(h.a.localStorage)),this.user=this.applicationData.userInfo,this.plants=this.applicationData.sites,this.applicationData.applicationVersion&&(this.applicationconfig.applicationVersion=this.applicationData.applicationVersion),localStorage.getItem(h.a.plantLS)?this.currentPlant=localStorage.getItem(h.a.plantLS):(this.currentPlant=this.plants[0].name,localStorage.setItem(h.a.plantLS,this.currentPlant));var t=this.homeService.RefreshApplicationData({application:this.applicationconfig.application,plant:this.currentPlant}).subscribe(function(n){l.applicationDataRefreshed=n.data},function(l){console.log(l)},function(){l.applicationData.sites=l.applicationDataRefreshed.sites,l.applicationData.menus=l.applicationDataRefreshed.menus,l.applicationData.profiles=l.applicationDataRefreshed.profiles,l.applicationData.applicationVersion=l.applicationDataRefreshed.applicationVersion,localStorage.setItem(h.a.localStorage,JSON.stringify(l.applicationData)),l.user=l.applicationData.userInfo,l.plants=l.applicationData.sites,l.applicationconfig.applicationVersion=l.applicationData.applicationVersion,l.charging.hide(),l.notify.setNotification("Login Success",n,"success")});switch(this.subscriptions.push(t),this.router.url){case"/":this.currentRoute="home";break;case"/config/tooling":this.currentRoute="tooling";break;case"/config/countermask":this.currentRoute="countermask";break;case"/checklist/questions":this.currentRoute="questions";break;case"/checklist/questionnaire":this.currentRoute="questionnaire";break;case"/requimtto":this.currentRoute="requimtto";break;case"/history":this.currentRoute="history";break;case"/fill-mtto":this.currentRoute="fill mtto";break;case"/contact-us":this.currentRoute="contact us";break;case"/pallet-validator/scan-pallet":this.currentRoute="scan pallet";break;case"/pallet-validator/liberate-pallet":this.currentRoute="liberate pallet";break;case"/maintenance-requests":this.currentRoute="MAINTENANCE REQUESTS"}this.currentYear=u.getFullYear(),$(".dropdown-menu a.dropdown-toggle").on("click",function(l){return $(this).next().hasClass("show")||$(this).parents(".dropdown-menu").first().find(".show").removeClass("show"),$(this).next(".dropdown-menu").toggleClass("show"),$(this).parents("li.nav-item.dropdown.show").on("hidden.bs.dropdown",function(l){$(".dropdown-submenu .show").removeClass("show")}),!1})}else this.applicationData=null},l.prototype.changeCurrentPlant=function(l){this.currentPlant=l,localStorage.setItem(h.a.plantLS,this.currentPlant),location.href=h.a.SERVER},l.prototype.logout=function(){confirm("If you logout, you will logout from all google services of your browser. Are you sure?")&&(localStorage.removeItem(h.a.localStorage),location.href="https://accounts.google.com/Logout")},l.prototype.changeRoute=function(l){switch(l){case"":this.currentRoute="home";break;case"/config/tooling":this.currentRoute="tooling";break;case"/config/countermask":this.currentRoute="countermask";break;case"/checklist/questions":this.currentRoute="questions";break;case"/checklist/questionnaire":this.currentRoute="questionnaire";break;case"/requimtto":this.currentRoute="requimtto";break;case"/history":this.currentRoute="history";break;case"/fill-mtto":this.currentRoute="fill mtto";break;case"/contact-us":this.currentRoute="contact us";break;case"/pallet-validator/scan-pallet":this.currentRoute="scan pallet";break;case"/pallet-validator/liberate-pallet":this.currentRoute="liberate pallet";break;case"/maintenance-requests":this.currentRoute="MAINTENANCE REQUESTS"}},l.prototype.back=function(){var l=this;this.loc.back(),setTimeout(function(){switch(l.router.url){case"/":l.currentRoute="home";break;case"/config/tooling":l.currentRoute="tooling";break;case"/config/countermask":l.currentRoute="countermask";break;case"/checklist/questions":l.currentRoute="questions";break;case"/checklist/questionnaire":l.currentRoute="questionnaire";break;case"/requimtto":l.currentRoute="requimtto";break;case"/history":l.currentRoute="history";break;case"/fill-mtto":l.currentRoute="fill mtto";break;case"/contact-us":l.currentRoute="contact us";break;case"/pallet-validator/scan-pallet":l.currentRoute="scan pallet";break;case"/pallet-validator/liberate-pallet":l.currentRoute="liberate pallet";break;case"/maintenance-requests":l.currentRoute="MAINTENANCE REQUESTS"}},100)},l.prototype.ngOnDestroy=function(){this.subscriptions.forEach(function(l){l.unsubscribe()})},l}(),x=t.tb({encapsulation:0,styles:[[".dropdown-submenu[_ngcontent-%COMP%]{position:relative}.dropdown-submenu[_ngcontent-%COMP%] > .dropdown-menu[_ngcontent-%COMP%]{top:0;left:100%;margin-top:-6px;margin-left:-1px;border-radius:0 6px 6px}.dropdown-submenu[_ngcontent-%COMP%]:hover > .dropdown-menu[_ngcontent-%COMP%]{display:block}.dropdown-submenu.pull-left[_ngcontent-%COMP%]{float:none}.dropdown-submenu.pull-left[_ngcontent-%COMP%] > .dropdown-menu[_ngcontent-%COMP%]{left:-100%;margin-left:10px;border-radius:6px 0 6px 6px}.main-content[_ngcontent-%COMP%]{margin-top:110px}.white[_ngcontent-%COMP%]{color:#fff!important}white[_ngcontent-%COMP%]:focus, white[_ngcontent-%COMP%]:hover{color:#818a95!important}.row[_ngcontent-%COMP%]{margin:0}.img-header[_ngcontent-%COMP%]{height:40px;width:40px}.img-logo[_ngcontent-%COMP%]{height:40px;width:100px}.img-home[_ngcontent-%COMP%]{height:150px;width:150px}.icon-30[_ngcontent-%COMP%]{font-size:30px}.icon-20[_ngcontent-%COMP%]{font-size:20px}.red-color[_ngcontent-%COMP%]{color:#d32f2f}.emulator-container[_ngcontent-%COMP%]{background-color:#e0e0e0;height:400px;max-height:400px;overflow:auto;font-size:2.8em;color:#fff}.font-sizeTable[_ngcontent-%COMP%]{font-size:smaller}.nopadding[_ngcontent-%COMP%]{padding:0!important}.nomargin[_ngcontent-%COMP%]{margin:0!important}.imgIcon[_ngcontent-%COMP%]{width:100px;height:50px}#primaryNavbar[_ngcontent-%COMP%]{border-bottom:3px solid red}#secondaryNavbar[_ngcontent-%COMP%]{box-shadow:1px 5px 12px grey}#arrowBack[_ngcontent-%COMP%]{position:absolute;margin-left:-26px}.firstPanel[_ngcontent-%COMP%]{position:absolute;margin-top:117px}.iconToright[_ngcontent-%COMP%]{margin-right:-14px}.plant[_ngcontent-%COMP%]{color:#fff;text-align:right;margin-top:8px}.ActMenu[_ngcontent-%COMP%]{color:#fff;margin-left:-42px;margin-bottom:10px;margin-top:-10px}.ActMenu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{height:42px}.ActMenu[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{top:0;margin:0;line-height:0!important}.pMenu[_ngcontent-%COMP%]{color:#fff;margin-right:90%;margin-top:21px}#footer[_ngcontent-%COMP%]{border-style:solid;border-top-color:#000;border-width:1px;background-color:#fff;position:fixed;bottom:0;width:100%}#NamePopover[_ngcontent-%COMP%]{color:red;width:200px}.logBy[_ngcontent-%COMP%]{width:200px}.shadow[_ngcontent-%COMP%]{box-shadow:5px 15px 40px 5px rgba(0,0,0,.2)}.loadingmodal[_ngcontent-%COMP%]   .modal[_ngcontent-%COMP%]   .modal-dialog[_ngcontent-%COMP%]:after, .loadingmodal[_ngcontent-%COMP%]   .panel.panel-danger[_ngcontent-%COMP%]   .panel-footer[_ngcontent-%COMP%]:after, .loadingmodal[_ngcontent-%COMP%]   .panel.panel-gray[_ngcontent-%COMP%]   .panel-footer[_ngcontent-%COMP%]:after, .loadingmodal[_ngcontent-%COMP%]   .panel.panel-gray-dark[_ngcontent-%COMP%]   .panel-footer[_ngcontent-%COMP%]:after, .loadingmodal[_ngcontent-%COMP%]   .panel.panel-gray-darker[_ngcontent-%COMP%]   .panel-footer[_ngcontent-%COMP%]:after, .loadingmodal[_ngcontent-%COMP%]   .panel.panel-gray-light[_ngcontent-%COMP%]   .panel-footer[_ngcontent-%COMP%]:after, .loadingmodal[_ngcontent-%COMP%]   .panel.panel-info[_ngcontent-%COMP%]   .panel-footer[_ngcontent-%COMP%]:after, .loadingmodal[_ngcontent-%COMP%]   .panel.panel-success[_ngcontent-%COMP%]   .panel-footer[_ngcontent-%COMP%]:after, .loadingmodal[_ngcontent-%COMP%]   .panel.panel-warning[_ngcontent-%COMP%]   .panel-footer[_ngcontent-%COMP%]:after{position:unset}.navbar-light[_ngcontent-%COMP%]   .navbar-nav[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]{color:rgba(51,51,51,.9);font-size:12px}.nav-item[_ngcontent-%COMP%]{font-size:12px;color:rgba(51,51,51,.9)!important}.navbarM[_ngcontent-%COMP%]{background-color:#505760!important}.logOut[_ngcontent-%COMP%]:hover{background:#d0e5ee}"]],data:{}});function O(l){return t.Rb(0,[(l()(),t.vb(0,0,null,null,0,"i",[["class","fas fa-home"]],null,null,null,null,null))],null,null)}function w(l){return t.Rb(0,[(l()(),t.vb(0,0,null,null,1,"span",[["class","text-uppercase"]],null,null,null,null,null)),(l()(),t.Pb(1,null,["",""]))],null,function(l,n){l(n,1,0,n.parent.parent.context.$implicit.name)})}function y(l){return t.Rb(0,[(l()(),t.vb(0,0,null,null,5,"a",[["class","nav-link"],["href","#"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var e=!0,a=l.component;return"click"===n&&(e=!1!==t.Hb(l,1).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&e),"click"===n&&(e=!1!==a.changeRoute(l.parent.context.$implicit.link)&&e),e},null,null)),t.ub(1,671744,null,0,r.l,[r.k,r.a,c.h],{routerLink:[0,"routerLink"]},null),(l()(),t.kb(16777216,null,null,1,null,O)),t.ub(3,16384,null,0,c.k,[t.Q,t.N],{ngIf:[0,"ngIf"]},null),(l()(),t.kb(16777216,null,null,1,null,w)),t.ub(5,16384,null,0,c.k,[t.Q,t.N],{ngIf:[0,"ngIf"]},null)],function(l,n){l(n,1,0,t.zb(1,"",n.parent.context.$implicit.link,"")),l(n,3,0,"Home"==n.parent.context.$implicit.name),l(n,5,0,"Home"!=n.parent.context.$implicit.name)},function(l,n){l(n,0,0,t.Hb(n,1).target,t.Hb(n,1).href)})}function R(l){return t.Rb(0,[(l()(),t.vb(0,0,null,null,2,"a",[["aria-expanded","false"],["aria-haspopup","true"],["class","nav-link text-uppercase"],["data-toggle","dropdown"],["href","#"],["id","dropdownMenu1"],["role","button"]],null,null,null,null,null)),(l()(),t.Pb(1,null,[""," "])),(l()(),t.vb(2,0,null,null,0,"i",[["class","fas fa-angle-down fa-xs m-1"]],null,null,null,null,null))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.name)})}function _(l){return t.Rb(0,[(l()(),t.vb(0,0,null,null,2,"a",[["class","dropdown-item"],["href","#"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==t.Hb(l,1).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&e),e},null,null)),t.ub(1,671744,null,0,r.l,[r.k,r.a,c.h],{routerLink:[0,"routerLink"]},null),(l()(),t.Pb(2,null,["",""]))],function(l,n){l(n,1,0,t.zb(1,"",n.parent.context.$implicit.link,""))},function(l,n){l(n,0,0,t.Hb(n,1).target,t.Hb(n,1).href),l(n,2,0,n.parent.context.$implicit.name)})}function N(l){return t.Rb(0,[(l()(),t.vb(0,0,null,null,3,"li",[],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,2,null,_)),t.ub(2,16384,null,0,c.k,[t.Q,t.N],{ngIf:[0,"ngIf"]},null),t.Jb(0,s,[])],function(l,n){var u=n.component;l(n,2,0,0==t.Qb(n,2,0,t.Hb(n,3).transform(u.applicationData.menus,n.context.$implicit.idMenu)).length)},null)}function I(l){return t.Rb(0,[(l()(),t.vb(0,0,null,null,2,"a",[["aria-expanded","false"],["aria-haspopup","true"],["class","dropdown-item"],["data-toggle","dropdown"],["href","#"],["id","dropdownMenu2"],["role","button"]],null,null,null,null,null)),(l()(),t.Pb(1,null,[""," "])),(l()(),t.vb(2,0,null,null,0,"i",[["class","fas fa-angle-right fa-xs m-1"]],null,null,null,null,null))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.name)})}function S(l){return t.Rb(0,[(l()(),t.vb(0,0,null,null,3,"li",[],null,null,null,null,null)),(l()(),t.vb(1,0,null,null,2,"a",[["class","dropdown-item"],["href","#"],["tabindex","-1"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==t.Hb(l,2).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&e),e},null,null)),t.ub(2,671744,null,0,r.l,[r.k,r.a,c.h],{routerLink:[0,"routerLink"]},null),(l()(),t.Pb(3,null,["",""]))],function(l,n){l(n,2,0,t.zb(1,"",n.context.$implicit.link,""))},function(l,n){l(n,1,0,t.Hb(n,2).target,t.Hb(n,2).href),l(n,3,0,n.context.$implicit.name)})}function A(l){return t.Rb(0,[(l()(),t.vb(0,0,null,null,8,"li",[["class","dropdown-submenu"]],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,2,null,I)),t.ub(2,16384,null,0,c.k,[t.Q,t.N],{ngIf:[0,"ngIf"]},null),t.Jb(0,s,[]),(l()(),t.vb(4,0,null,null,4,"ul",[["aria-labelledby","dropdownMenu2"],["class","dropdown-menu border-0 shadow"]],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,3,null,S)),t.ub(6,278528,null,0,c.j,[t.Q,t.N,t.t],{ngForOf:[0,"ngForOf"]},null),t.Jb(0,p,[]),t.Jb(0,s,[])],function(l,n){var u=n.component;l(n,2,0,t.Qb(n,2,0,t.Hb(n,3).transform(u.applicationData.menus,n.context.$implicit.idMenu)).length>0),l(n,6,0,t.Qb(n,6,0,t.Hb(n,8).transform(t.Qb(n,6,0,t.Hb(n,7).transform(u.applicationData.menus,"orden")),n.context.$implicit.idMenu)))},null)}function D(l){return t.Rb(0,[(l()(),t.vb(0,0,null,null,15,"li",[["class","nav-item dropdown"]],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,2,null,y)),t.ub(2,16384,null,0,c.k,[t.Q,t.N],{ngIf:[0,"ngIf"]},null),t.Jb(0,s,[]),(l()(),t.kb(16777216,null,null,2,null,R)),t.ub(5,16384,null,0,c.k,[t.Q,t.N],{ngIf:[0,"ngIf"]},null),t.Jb(0,s,[]),(l()(),t.vb(7,0,null,null,8,"ul",[["aria-labelledby","dropdownMenu1"],["class","dropdown-menu border-0 shadow"]],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,3,null,N)),t.ub(9,278528,null,0,c.j,[t.Q,t.N,t.t],{ngForOf:[0,"ngForOf"]},null),t.Jb(0,p,[]),t.Jb(0,s,[]),(l()(),t.kb(16777216,null,null,3,null,A)),t.ub(13,278528,null,0,c.j,[t.Q,t.N,t.t],{ngForOf:[0,"ngForOf"]},null),t.Jb(0,p,[]),t.Jb(0,s,[])],function(l,n){var u=n.component;l(n,2,0,0==t.Qb(n,2,0,t.Hb(n,3).transform(u.applicationData.menus,n.context.$implicit.idMenu)).length),l(n,5,0,t.Qb(n,5,0,t.Hb(n,6).transform(u.applicationData.menus,n.context.$implicit.idMenu)).length>0),l(n,9,0,t.Qb(n,9,0,t.Hb(n,11).transform(t.Qb(n,9,0,t.Hb(n,10).transform(u.applicationData.menus,"orden")),n.context.$implicit.idMenu))),l(n,13,0,t.Qb(n,13,0,t.Hb(n,15).transform(t.Qb(n,13,0,t.Hb(n,14).transform(u.applicationData.menus,"orden")),n.context.$implicit.idMenu)))},null)}function F(l){return t.Rb(0,[(l()(),t.vb(0,0,null,null,4,"ul",[["class","navbar-nav mr-3"]],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,3,null,D)),t.ub(2,278528,null,0,c.j,[t.Q,t.N,t.t],{ngForOf:[0,"ngForOf"]},null),t.Jb(0,p,[]),t.Jb(0,s,[])],function(l,n){var u=n.component;l(n,2,0,t.Qb(n,2,0,t.Hb(n,4).transform(t.Qb(n,2,0,t.Hb(n,3).transform(u.applicationData.menus,"orden")),0)))},null)}function H(l){return t.Rb(0,[(l()(),t.vb(0,0,null,null,11,null,null,null,null,null,null,null)),(l()(),t.vb(1,0,null,null,6,"div",[["class","justify-content-start mr-3"]],null,null,null,null,null)),(l()(),t.vb(2,0,null,null,5,"div",[["id","profilePopOver"]],null,null,null,null,null)),(l()(),t.vb(3,16777216,null,null,1,"img",[["alt","User profile picture"],["class","rounded-circle mr-2 pointer"],["height","40"],["placement","bottom"],["popoverTitle","User information"],["triggers","mouseenter:mouseleave"],["width","40"]],[[8,"src",4]],null,null,null,null)),t.ub(4,212992,null,0,b.c,[b.a,t.k,t.F,t.Q,d.a,m.a],{popover:[0,"popover"],popoverTitle:[1,"popoverTitle"],placement:[2,"placement"],triggers:[3,"triggers"]},null),(l()(),t.vb(5,0,null,null,2,"a",[["class","nav-item uppercase"]],null,null,null,null,null)),(l()(),t.Pb(6,null,[" ",""])),t.Lb(7,1),(l()(),t.vb(8,0,null,null,3,"div",[["class","float-right mr-3"]],null,null,null,null,null)),(l()(),t.vb(9,0,null,null,2,"a",[["class","btn btn-white rounded-circle border pointer logOut"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.logout()&&t),t},null,null)),(l()(),t.vb(10,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),t.vb(11,0,null,null,0,"i",[["class","fas fa-power-off"]],null,null,null,null,null))],function(l,n){l(n,4,0,t.Hb(n.parent,102),"User information","bottom","mouseenter:mouseleave")},function(l,n){var u=n.component;l(n,3,0,"http://plant8.sanmina.com:8080/SanmAPI/getImageUser/?employee="+u.user.userName);var e=t.Qb(n,6,0,l(n,7,0,t.Hb(n.parent,0),u.user.userName));l(n,6,0,e)})}function Q(l){return t.Rb(0,[(l()(),t.vb(0,0,null,null,5,"div",[],null,null,null,null,null)),(l()(),t.vb(1,0,null,null,4,"div",[["class","justify-content-start mr-3"]],null,null,null,null,null)),(l()(),t.vb(2,0,null,null,3,"div",[["id","profilePopOver"]],null,null,null,null,null)),(l()(),t.vb(3,0,null,null,0,"img",[["alt","User profile picture"],["class","rounded-circle mr-2 pointer"],["height","40"],["src","assets/sanmina/application/user.jpg"],["width","40"]],null,null,null,null,null)),(l()(),t.vb(4,0,null,null,1,"a",[["class","nav-item uppercase"]],null,null,null,null,null)),(l()(),t.Pb(-1,null,[" GENERAL_USER"]))],null,null)}function q(l){return t.Rb(0,[(l()(),t.vb(0,0,null,null,7,"div",[["class","col-md-2 float-left"]],null,null,null,null,null)),(l()(),t.vb(1,0,null,null,3,"a",[["class","navbar-brand float-left"],["style","margin-top: -23px; margin-left: -30px;"]],null,null,null,null,null)),(l()(),t.vb(2,0,null,null,2,"button",[["class","btn btn-secondary btn-sm"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.back()&&t),t},null,null)),(l()(),t.vb(3,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),t.vb(4,0,null,null,0,"i",[["class","fas fa-arrow-left text-bigger"]],null,null,null,null,null)),(l()(),t.vb(5,0,null,null,2,"p",[["class","float-left"],["style","margin-top: -13px"]],null,null,null,null,null)),(l()(),t.vb(6,0,null,null,1,"small",[["class","text-uppercase font-weight-bold text-white"]],null,null,null,null,null)),(l()(),t.Pb(7,null,[" "," "]))],null,function(l,n){l(n,7,0,n.component.currentRoute)})}function E(l){return t.Rb(0,[(l()(),t.vb(0,0,null,null,2,"li",[["class","nav-item dropdown"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.changeCurrentPlant(l.context.$implicit.name)&&t),t},null,null)),(l()(),t.vb(1,0,null,null,1,"p",[["class","dropdown-item"]],null,null,null,null,null)),(l()(),t.Pb(2,null,[" "," "]))],null,function(l,n){l(n,2,0,n.context.$implicit.name)})}function T(l){return t.Rb(0,[(l()(),t.vb(0,0,null,null,7,"div",[["class","col-md-2 float-right"]],null,null,null,null,null)),(l()(),t.vb(1,0,null,null,3,"p",[["aria-expanded","false"],["aria-haspopup","true"],["class","nav-link float-right text-white pointer"],["data-toggle","dropdown"],["id","navbarDropdown"],["role","button"],["style","margin-top: -18px"]],null,null,null,null,null)),(l()(),t.vb(2,0,null,null,1,"small",[["class","text-uppercase font-weight-bold text-white"]],null,null,null,null,null)),(l()(),t.Pb(3,null,[" "," "])),(l()(),t.vb(4,0,null,null,0,"i",[["class","fas fa-angle-down fa-xs m-1"]],null,null,null,null,null)),(l()(),t.vb(5,0,null,null,2,"ul",[["aria-labelledby","navbarDropdown"],["class","dropdown-menu border-0 shadow"]],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,1,null,E)),t.ub(7,278528,null,0,c.j,[t.Q,t.N,t.t],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,7,0,n.component.plants)},function(l,n){l(n,3,0,n.component.currentPlant)})}function L(l){return t.Rb(0,[(l()(),t.vb(0,0,null,null,9,"div",[],null,null,null,null,null)),(l()(),t.vb(1,0,null,null,1,"div",[["class","col-md-4"]],null,null,null,null,null)),(l()(),t.vb(2,0,null,null,0,"img",[["class","rounded-circle shadow"],["height","80"],["width","80"]],[[8,"src",4]],null,null,null,null)),(l()(),t.vb(3,0,null,null,6,"div",[["class","col-md-6"]],null,null,null,null,null)),(l()(),t.vb(4,0,null,null,1,"div",[["id","NamePopover"]],null,null,null,null,null)),(l()(),t.Pb(5,null,["",""])),(l()(),t.vb(6,0,null,null,1,"div",[["id","employeNumber"]],null,null,null,null,null)),(l()(),t.Pb(7,null,["",""])),(l()(),t.vb(8,0,null,null,1,"div",[["class","text-secondary logBy"]],null,null,null,null,null)),(l()(),t.Pb(9,null,["Login By: ",""]))],null,function(l,n){var u=n.component;l(n,2,0,"http://plant8.sanmina.com:8080/SanmAPI/getImageUser/?employee="+u.user.userName),l(n,5,0,u.user.name+" "+u.user.lastName),l(n,7,0,u.user.employeeNumber),l(n,9,0,u.applicationData.loginType)})}function J(l){return t.Rb(0,[(l()(),t.vb(0,0,null,null,8,"div",[["class","col-md-12"]],null,null,null,null,null)),(l()(),t.vb(1,0,null,null,1,"div",[["id","NamePopover"]],null,null,null,null,null)),(l()(),t.Pb(2,null,["",""])),(l()(),t.vb(3,0,null,null,1,"div",[["id","employeNumber"]],null,null,null,null,null)),(l()(),t.Pb(4,null,["v: ",""])),(l()(),t.vb(5,0,null,null,1,"div",[["id","NamePopover"]],null,null,null,null,null)),(l()(),t.Pb(-1,null,["Master Page"])),(l()(),t.vb(7,0,null,null,1,"div",[["id","employeNumber"]],null,null,null,null,null)),(l()(),t.Pb(8,null,["v: ",""]))],null,function(l,n){var u=n.component;l(n,2,0,u.applicationconfig.application),l(n,4,0,u.applicationconfig.applicationVersion),l(n,8,0,u.applicationconfig.masterPageVersion)})}function V(l){return t.Rb(0,[t.Jb(0,c.s,[]),t.Nb(402653184,1,{charging:0}),(l()(),t.vb(2,0,null,null,1,"title",[],null,null,null,null,null)),(l()(),t.Pb(3,null,["",""])),(l()(),t.vb(4,0,null,null,18,"nav",[["class","navbar sticky-top navbar-expand-lg navbar-light bg-light pr-0 pt-0 pb-0 pl-0"],["id","primaryNavbar"],["role","navigation"]],null,null,null,null,null)),(l()(),t.vb(5,0,null,null,2,"a",[["class","navbar-brand justify-content-center"],["href","#"]],null,null,null,null,null)),(l()(),t.vb(6,16777216,null,null,1,"img",[["alt",""],["class","d-flex justify-content-end mt-1 ml-2 imgIcon"],["placement","right bottom"],["popoverTitle","Application information"],["triggers","mouseenter:mouseleave"]],[[8,"src",4]],null,null,null,null)),t.ub(7,212992,null,0,b.c,[b.a,t.k,t.F,t.Q,d.a,m.a],{popover:[0,"popover"],popoverTitle:[1,"popoverTitle"],placement:[2,"placement"],triggers:[3,"triggers"]},null),(l()(),t.vb(8,0,null,null,1,"button",[["aria-controls","navbarSupportedContent"],["aria-expanded","false"],["aria-label","Toggle navigation"],["class","navbar-toggler"],["data-target","#navbarSupportedContent"],["data-toggle","collapse"],["type","button"]],null,null,null,null,null)),(l()(),t.vb(9,0,null,null,0,"span",[["class","navbar-toggler-icon"]],null,null,null,null,null)),(l()(),t.vb(10,0,null,null,12,"div",[["class","collapse navbar-collapse"],["id","navbarSupportedContent"]],null,null,null,null,null)),(l()(),t.vb(11,0,null,null,0,"div",[["class","mr-auto"]],null,null,null,null,null)),(l()(),t.vb(12,0,null,null,10,"form",[["class","form-inline my-2 my-lg-0"],["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],function(l,n,u){var e=!0;return"submit"===n&&(e=!1!==t.Hb(l,14).onSubmit(u)&&e),"reset"===n&&(e=!1!==t.Hb(l,14).onReset()&&e),e},null,null)),t.ub(13,16384,null,0,g.x,[],null,null),t.ub(14,4210688,null,0,g.n,[[8,null],[8,null]],null,null),t.Mb(2048,null,g.c,null,[g.n]),t.ub(16,16384,null,0,g.m,[[4,g.c]],null,null),(l()(),t.kb(16777216,null,null,1,null,F)),t.ub(18,16384,null,0,c.k,[t.Q,t.N],{ngIf:[0,"ngIf"]},null),(l()(),t.kb(16777216,null,null,1,null,H)),t.ub(20,16384,null,0,c.k,[t.Q,t.N],{ngIf:[0,"ngIf"]},null),(l()(),t.kb(16777216,null,null,1,null,Q)),t.ub(22,16384,null,0,c.k,[t.Q,t.N],{ngIf:[0,"ngIf"]},null),(l()(),t.vb(23,0,null,null,4,"nav",[["class","navbarM w-100 p-3"],["style","box-shadow: 1px 5px 12px grey; height: 33px;"]],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,1,null,q)),t.ub(25,16384,null,0,c.k,[t.Q,t.N],{ngIf:[0,"ngIf"]},null),(l()(),t.kb(16777216,null,null,1,null,T)),t.ub(27,16384,null,0,c.k,[t.Q,t.N],{ngIf:[0,"ngIf"]},null),(l()(),t.vb(28,16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),t.ub(29,212992,null,0,r.n,[r.b,t.Q,t.j,[8,null],t.h],null,null),(l()(),t.vb(30,0,null,null,10,"div",[["aria-hidden","true"],["aria-labelledby","LoadingModal"],["class","modal uppercase"],["id","loadingModal"],["role","dialog"],["tabindex","-1"]],null,null,null,null,null)),(l()(),t.vb(31,0,null,null,9,"div",[["class","modal-dialog modal-md"]],null,null,null,null,null)),(l()(),t.vb(32,0,null,null,8,"div",[["class","modal-content"]],null,null,null,null,null)),(l()(),t.vb(33,0,null,null,5,"div",[["class","modal-header"]],null,null,null,null,null)),(l()(),t.vb(34,0,null,null,1,"button",[["aria-hidden","true"],["class","close"],["data-dismiss","modal"],["type","button"]],null,null,null,null,null)),(l()(),t.vb(35,0,null,null,0,"span",[["class","ion-close-round"]],null,null,null,null,null)),(l()(),t.vb(36,0,null,null,2,"h4",[["class","modal-title"],["id","mySmallModalLabel"]],null,null,null,null,null)),(l()(),t.Pb(-1,null,["Please Wait... "])),(l()(),t.vb(38,0,null,null,0,"i",[["class","ion-loading"]],null,null,null,null,null)),(l()(),t.vb(39,0,null,null,1,"div",[["class","modal-body"]],null,null,null,null,null)),(l()(),t.Pb(-1,null,[" loadingMessage "])),(l()(),t.vb(41,0,null,null,16,"div",[["aria-hidden","true"],["aria-labelledby","SelectModal"],["class","modal fade uppercase"],["id","selectPlant"],["role","dialog"],["tabindex","-1"]],null,null,null,null,null)),(l()(),t.vb(42,0,null,null,15,"div",[["class","modal-dialog modal-lg"]],null,null,null,null,null)),(l()(),t.vb(43,0,null,null,14,"div",[["class","modal-content"]],null,null,null,null,null)),(l()(),t.vb(44,0,null,null,2,"div",[["class","modal-header"]],null,null,null,null,null)),(l()(),t.vb(45,0,null,null,1,"h4",[["class","modal-title"]],null,null,null,null,null)),(l()(),t.Pb(-1,null,["Select a Plant"])),(l()(),t.vb(47,0,null,null,10,"div",[["class","modal-body"]],null,null,null,null,null)),(l()(),t.vb(48,0,null,null,9,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.vb(49,0,null,null,2,"div",[["class","col-md-4 text-center"]],null,null,null,null,null)),(l()(),t.vb(50,0,null,null,1,"button",[["class","btn btn-lg btn-primary btn-block mtop-30 text-center"],["style","height: 150px;"]],null,null,null,null,null)),(l()(),t.Pb(-1,null,["plant.plant"])),(l()(),t.vb(52,0,null,null,2,"div",[["class","col-md-12 text-center"]],null,null,null,null,null)),(l()(),t.vb(53,0,null,null,1,"h4",[["class","modal-title"]],null,null,null,null,null)),(l()(),t.Pb(-1,null,["Setting plant and getting menus plese wait..."])),(l()(),t.vb(55,0,null,null,2,"div",[["class","col-md-12 text-center"]],null,null,null,null,null)),(l()(),t.vb(56,0,null,null,1,"h4",[["class","modal-title"]],null,null,null,null,null)),(l()(),t.Pb(-1,null,["You don't have assigned plant, please contact IT"])),(l()(),t.vb(58,0,null,null,30,"div",[],null,null,null,null,null)),(l()(),t.vb(59,0,null,null,13,"div",[["aria-hidden","true"],["aria-labelledby","ConfirmModal"],["class","modal fade uppercase"],["id","confirmModal"],["role","dialog"],["tabindex","-1"]],null,null,null,null,null)),(l()(),t.vb(60,0,null,null,12,"div",[["class","modal-dialog modal-lg"]],null,null,null,null,null)),(l()(),t.vb(61,0,null,null,11,"div",[["class","modal-content"]],null,null,null,null,null)),(l()(),t.vb(62,0,null,null,3,"div",[["class","modal-header"]],null,null,null,null,null)),(l()(),t.vb(63,0,null,null,1,"button",[["aria-hidden","true"],["class","close"],["data-dismiss","modal"],["type","button"]],null,null,null,null,null)),(l()(),t.vb(64,0,null,null,0,"span",[["class","ion-close-round"]],null,null,null,null,null)),(l()(),t.vb(65,0,null,null,0,"h4",[["class","modal-title"],["id","titleAction"]],null,null,null,null,null)),(l()(),t.vb(66,0,null,null,0,"div",[["class","modal-body"],["id","messageAction"]],null,null,null,null,null)),(l()(),t.vb(67,0,null,null,5,"div",[["class","modal-footer"]],null,null,null,null,null)),(l()(),t.vb(68,0,null,null,1,"button",[["class","btn btn-default"],["data-dismiss","modal"],["type","button"]],null,null,null,null,null)),(l()(),t.Pb(-1,null,["Close"])),(l()(),t.vb(70,0,null,null,2,"button",[["class","btn btn-success"],["id","saveConfirmButton"],["type","button"]],null,null,null,null,null)),(l()(),t.vb(71,0,null,null,0,"i",[["class","ion-checkmark-round"]],null,null,null,null,null)),(l()(),t.Pb(-1,null,[" Save"])),(l()(),t.vb(73,0,null,null,15,"footer",[["class","col-md-12"],["id","footer"]],null,null,null,null,null)),(l()(),t.vb(74,0,null,null,14,"div",[["class","text-center"]],null,null,null,null,null)),(l()(),t.vb(75,0,null,null,13,"strong",[["class","uppercase"]],null,null,null,null,null)),(l()(),t.vb(76,0,null,null,4,"a",[["href","http://www.sanmina.com/company-profile/legal-information/"],["target","_blank"]],null,null,null,null,null)),(l()(),t.vb(77,0,null,null,3,"small",[],null,null,null,null,null)),(l()(),t.vb(78,0,null,null,2,"font",[],null,null,null,null,null)),(l()(),t.vb(79,0,null,null,1,"u",[],null,null,null,null,null)),(l()(),t.Pb(-1,null,["LEGAL INFORMATION "])),(l()(),t.vb(81,0,null,null,3,"small",[],null,null,null,null,null)),(l()(),t.vb(82,0,null,null,1,"font",[["color","red"]],null,null,null,null,null)),(l()(),t.Pb(-1,null,["POWERED BY:"])),(l()(),t.Pb(84,null,[" MEXICO RAPID INNOVATION LAB - "," "])),(l()(),t.vb(85,0,null,null,3,"a",[["href","http://www.sanmina.com/company-profile/safe-harbor-statement/"],["target","_blank"]],null,null,null,null,null)),(l()(),t.vb(86,0,null,null,2,"small",[],null,null,null,null,null)),(l()(),t.vb(87,0,null,null,1,"u",[],null,null,null,null,null)),(l()(),t.Pb(-1,null,["SAFE HARBOR STATEMENT"])),(l()(),t.vb(89,0,null,null,12,"div",[["class","loadingmodal"]],null,null,null,null,null)),(l()(),t.vb(90,16777216,null,null,11,"div",[["aria-hidden","true"],["aria-labelledby","LoadingModal"],["bsModal",""],["class","modal uppercase"],["role","dialog"],["tabindex","-1"]],null,[[null,"click"],[null,"keydown.esc"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==t.Hb(l,91).onClick(u)&&e),"keydown.esc"===n&&(e=!1!==t.Hb(l,91).onEsc(u)&&e),e},null,null)),t.ub(91,212992,[[1,4],["modalCharg",4]],0,f.d,[t.k,t.Q,t.F,d.a],null,null),(l()(),t.vb(92,0,null,null,9,"div",[["class","modal-dialog modal-md"]],null,null,null,null,null)),(l()(),t.vb(93,0,null,null,8,"div",[["class","modal-content"]],null,null,null,null,null)),(l()(),t.vb(94,0,null,null,5,"div",[["class","modal-header"]],null,null,null,null,null)),(l()(),t.vb(95,0,null,null,1,"button",[["aria-hidden","true"],["class","close"],["data-dismiss","modal"],["type","button"]],null,null,null,null,null)),(l()(),t.vb(96,0,null,null,0,"span",[["class","ion-close-round"]],null,null,null,null,null)),(l()(),t.vb(97,0,null,null,2,"h4",[["class","modal-title"],["id","mySmallModalLabel"]],null,null,null,null,null)),(l()(),t.Pb(-1,null,["Please Wait... "])),(l()(),t.vb(99,0,null,null,0,"i",[["class","ion-loading"]],null,null,null,null,null)),(l()(),t.vb(100,0,null,null,1,"div",[["class","modal-body"]],null,null,null,null,null)),(l()(),t.Pb(-1,null,[" Getting user information... "])),(l()(),t.kb(0,[["popUser",2]],null,0,null,L)),(l()(),t.kb(0,[["popAplication",2]],null,0,null,J))],function(l,n){var u=n.component;l(n,7,0,t.Hb(n,103),"Application information","right bottom","mouseenter:mouseleave"),l(n,18,0,null!=u.applicationData),l(n,20,0,null!=u.applicationData),l(n,22,0,null==u.applicationData),l(n,25,0,null!=u.applicationData),l(n,27,0,null!=u.applicationData),l(n,29,0),l(n,91,0)},function(l,n){var u=n.component;l(n,3,0,u.applicationconfig.applicationName),l(n,6,0,t.zb(1,"",u.applicationconfig.logo,"")),l(n,12,0,t.Hb(n,16).ngClassUntouched,t.Hb(n,16).ngClassTouched,t.Hb(n,16).ngClassPristine,t.Hb(n,16).ngClassDirty,t.Hb(n,16).ngClassValid,t.Hb(n,16).ngClassInvalid,t.Hb(n,16).ngClassPending),l(n,84,0,u.currentYear)})}function j(l){return t.Rb(0,[(l()(),t.vb(0,0,null,null,1,"app-home",[],null,null,null,V,x)),t.ub(1,245760,null,0,C,[c.r,r.k,c.g,P,v.a,M.a],null,null)],function(l,n){l(n,1,0)},null)}var U=t.rb("app-home",C,j,{},{},[]),z=u("tk/g"),K=function(){return function(){}}();u.d(n,"HomeModuleNgFactory",function(){return B});var B=t.sb(e,[],function(l){return t.Eb([t.Fb(512,t.j,t.db,[[8,[a.a,o.a,o.b,i.a,U]],[3,t.j],t.y]),t.Fb(4608,c.m,c.l,[t.v,[2,c.z]]),t.Fb(4608,g.v,g.v,[]),t.Fb(4608,b.a,b.a,[]),t.Fb(4608,m.a,m.a,[t.G,t.C]),t.Fb(4608,d.a,d.a,[t.j,t.A,t.r,m.a,t.g]),t.Fb(4608,f.a,f.a,[t.G,d.a]),t.Fb(4608,P,P,[k.c]),t.Fb(1073742336,c.c,c.c,[]),t.Fb(1073742336,b.d,b.d,[]),t.Fb(1073742336,f.e,f.e,[]),t.Fb(1073742336,r.m,r.m,[[2,r.r],[2,r.k]]),t.Fb(1073742336,K,K,[]),t.Fb(1073742336,g.u,g.u,[]),t.Fb(1073742336,g.g,g.g,[]),t.Fb(1073742336,e,e,[]),t.Fb(1024,r.i,function(){return[[{path:"",component:C,children:[{path:"",loadChildren:"src/app/modules/principal/principal.module#PrincipalModule",canActivate:[z.a]},{path:"config/tooling",loadChildren:"src/app/modules/tooling/tooling.module#ToolingModule",canActivate:[z.a]},{path:"config/countermask",loadChildren:"src/app/modules/countermask/countermask.module#CountermaskModule",canActivate:[z.a]},{path:"checklist/questions",loadChildren:"src/app/modules/questions/questions.module#QuestionsModule",canActivate:[z.a]},{path:"checklist/questionnaire",loadChildren:"src/app/modules/questionnaire/questionnaire.module#QuestionnaireModule",canActivate:[z.a]},{path:"requimtto",loadChildren:"src/app/modules/requimtto/requimtto.module#RequimttoModule",canActivate:[z.a]},{path:"history",loadChildren:"src/app/modules/history/history.module#HistoryModule",canActivate:[z.a]},{path:"fill-mtto",loadChildren:"src/app/modules/fill-mtto/fill-mtto.module#FillMttoModule",canActivate:[z.a]},{path:"contact-us",loadChildren:"src/app/modules/contact-us/contact-us.module#ContactUsModule",canActivate:[z.a]},{path:"pallet-validator/scan-pallet",loadChildren:"src/app/modules/pallet-validator/scan-pallet/scan-pallet.module#ScanPalletModule",canActivate:[z.a]},{path:"pallet-validator/liberate-pallet",loadChildren:"src/app/modules/pallet-validator/liberate-pallet/liberate-pallet.module#LiberatePalletModule",canActivate:[z.a]},{path:"pallet-validator/stations-config",loadChildren:"src/app/modules/pallet-validator/stations-config/stations-config.module#StationsConfigModule",canActivate:[z.a]},{path:"config/stations",loadChildren:"src/app/modules/stations/stations.module#StationsModule",canActivate:[z.a]},{path:"maintenance-requests",loadChildren:"src/app/modules/maintenance-requests/maintenance-requests.module#MaintenanceRequestsModule",canActivate:[z.a]},{path:"tutorials",loadChildren:"src/app/modules/tutorials/tutorials.module#TutorialsModule",canActivate:[z.a]}]}]]},[])])})}}]);