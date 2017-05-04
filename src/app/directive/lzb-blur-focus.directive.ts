import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[lzbBlurFocus]'
})

export class LzbBlurFocusDirective {

  constructor(private el: ElementRef) {
    //el.nativeElement.style.backgroundColor = "yellow";
  }
  @HostListener('focus') onMouseEnter(){
	this.blurFocus('yellow');
  }
  @HostListener('blur') onMouseLeave(){
  	this.blurFocus(null);
  }
  private blurFocus(color: string){
  	this.el.nativeElement.style.backgroundColor = color;
  }

}
