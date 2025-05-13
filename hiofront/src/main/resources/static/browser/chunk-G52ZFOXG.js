import{Ab as C,Ja as r,Sa as b,Ta as s,Wa as d,_a as m,aa as a,ab as x,ac as _,bc as k,ec as I,fb as i,gb as l,la as w,lb as M,ma as y,nb as g,ob as u,vc as f,zb as h}from"./chunk-V72LI5IB.js";function P(e,n){if(e&1){let t=M();i(0,"div",3),g("click",function(){w(t);let v=u();return y(v.toggleTyping())}),h(1,"\u26E7\xB0 \u3002 \u22C6\u0F3A\u269C HitItOff \u269C\u0F3B\u22C6 \u3002\xB0\u26E7"),l()}if(e&2){let t=u();x("moved",t.isMoved)}}function z(e,n){if(e&1&&(i(0,"span"),h(1),l()),e&2){let t=n.$implicit;r(),C(t)}}var c=class e{constructor(){this.showAbout=!1;this.isMoved=!1;this.text=`Long ago, in the age of swords and sorcery, heroes roamed untamed lands in search of answers.

   Brave knights journeyed through shadowed forests and uncharted realms,

    hoping to stumble upon a sage with a quest.

     Lonely maidens awaited champions who could lift ancient curses.

      Helpless villagers gazed toward the heavens,

      praying for someone\u2014anyone\u2014to rid them of a dragon\u2019s wrath.



  Back then, finding the right person was a quest in itself.

  
  But times have changed.

   The web is the new wilderness, and the quest board has gone digital.

  

  
  Introducing \u269C HitItOff \u269C

   \u2014 the app that brings kindred spirits together faster than you can roll for initiative.

    Whether you\u2019re searching for a creative partner,

     a fellow gamer,

      a philosophical sparring partner, or someone who simply gets you,

       \u269C HitItOff \u269C helps you find the one with whom you\u2019ll...

        well

       ... hit it off.

     

  
  Built on the idea that meaningful connections shouldn\u2019t require
   epic trials,
 our app makes it easy to discover people you naturally
    click with
\u2014those who speak your language, share your values,

     and might just be the missing party member on your journey.



  
  So leave the endless wandering to the NPCs.

   The era of chance meetings is over.

    With \u269C HitItOff \u269C, the right person is never more than a few clicks away.

    

    

    
`;this.about=[];this.index=0}toggleTyping(){this.isMoved=!this.isMoved,this.showAbout?this.clearText():this.startTyping()}startTyping(){this.about=[],this.index=0,this.showAbout=!0,this.typingInterval=setInterval(()=>{this.index<this.text.length?(this.about.push(this.text[this.index]),this.index++):clearInterval(this.typingInterval)},100)}clearText(){clearInterval(this.typingInterval),this.about=[],this.showAbout=!1}static{this.\u0275fac=function(t){return new(t||e)}}static{this.\u0275cmp=b({type:e,selectors:[["app-main"]],standalone:!1,decls:4,vars:2,consts:[["class","toggle",3,"moved","click",4,"ngIf"],[1,"text-container",3,"click"],[4,"ngFor","ngForOf"],[1,"toggle",3,"click"]],template:function(t,o){t&1&&(i(0,"body"),d(1,P,2,2,"div",0),i(2,"div",1),g("click",function(){return o.toggleTyping()}),d(3,z,2,1,"span",2),l()()),t&2&&(r(),m("ngIf",!o.showAbout),r(2),m("ngForOf",o.about))},dependencies:[_,k],styles:['body[_ngcontent-%COMP%]{margin:.8rem;min-height:100vh;width:100%;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:cardinal;font-size:5vw;letter-spacing:normal;background-image:url(/assets/png/kitten-warrior.png);background-size:53vw 50vw;background-repeat:no-repeat;background-attachment:fixed;background-position:center 18%;background-blend-mode:overlay;text-align:center}body[_ngcontent-%COMP%]:before{content:"";position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:-1}@media (max-width: 1024px){body[_ngcontent-%COMP%]{background-size:64vw 60vw}}@media (max-width: 768px){body[_ngcontent-%COMP%]{background-size:75vw 70vw;background-position:center 45%}.toggle.moved[_ngcontent-%COMP%]{transform:translateY(-17vw)}}@media (max-width: 480px){body[_ngcontent-%COMP%]{background-size:100vw auto;background-position:center 90%}}.toggle[_ngcontent-%COMP%]{font-size:5vw;cursor:pointer;transition:transform .5s ease;transform:translateY(0)}.toggle.moved[_ngcontent-%COMP%]{transform:translateY(-17vw)}.text-container[_ngcontent-%COMP%]{font-family:cardinal;font-size:2.5vw;letter-spacing:normal;white-space:pre;margin-top:3vw;opacity:1;transition:margin-top .5s ease}']})}};var F=[{path:"",component:c}],p=class e{static{this.\u0275fac=function(t){return new(t||e)}}static{this.\u0275mod=s({type:e})}static{this.\u0275inj=a({imports:[f.forChild(F),f]})}};var T=class e{static{this.\u0275fac=function(t){return new(t||e)}}static{this.\u0275mod=s({type:e})}static{this.\u0275inj=a({imports:[I,p]})}};export{T as MainModule};
