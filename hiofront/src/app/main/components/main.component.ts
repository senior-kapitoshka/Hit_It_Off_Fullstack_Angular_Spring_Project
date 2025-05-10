import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone:false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  showAbout:boolean=false;
  isMoved = false;

  text:string=`Long ago, in the age of swords and sorcery, heroes roamed untamed lands in search of answers.\n
   Brave knights journeyed through shadowed forests and uncharted realms,\n
    hoping to stumble upon a sage with a quest.\n
     Lonely maidens awaited champions who could lift ancient curses.\n
      Helpless villagers gazed toward the heavens,\n
      praying for someone—anyone—to rid them of a dragon’s wrath.\n
\n
  Back then, finding the right person was a quest in itself.\n
  
  But times have changed.\n
   The web is the new wilderness, and the quest board has gone digital.\n
  \n
  
  Introducing ⚜ HitItOff ⚜\n
   — the app that brings kindred spirits together faster than you can roll for initiative.\n
    Whether you’re searching for a creative partner,\n
     a fellow gamer,\n
      a philosophical sparring partner, or someone who simply gets you,\n
       ⚜ HitItOff ⚜ helps you find the one with whom you’ll...\n
        well\n
       ... hit it off.\n
     \n
  
  Built on the idea that meaningful connections shouldn’t require
   epic trials,\n our app makes it easy to discover people you naturally
    click with\n—those who speak your language, share your values,\n
     and might just be the missing party member on your journey.\n
\n
  
  So leave the endless wandering to the NPCs.\n
   The era of chance meetings is over.\n
    With ⚜ HitItOff ⚜, the right person is never more than a few clicks away.\n
    \n
    \n
    \n`

  about:string[]=[];

  private index: number = 0;
  private typingInterval: any;

  toggleTyping(): void {
    this.isMoved = !this.isMoved;
    if (this.showAbout) {
      this.clearText();
    } else {
      this.startTyping();
    }
  }

  private startTyping(): void {
    this.about = [];
    this.index = 0;
    this.showAbout = true;

    this.typingInterval = setInterval(() => {
      if (this.index < this.text.length) {
        this.about.push(this.text[this.index]);
        this.index++;
      } else {
        clearInterval(this.typingInterval);
      }
    }, 100); 
  }

  private clearText(): void {
    clearInterval(this.typingInterval);
    this.about = [];
    this.showAbout = false;
  }

}
