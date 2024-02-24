import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appProductShadow]',
  standalone: true,
})
export class ProductShadowDirective {
  @Input() appProductShadow = {};
  @Input() defaultShadowBorder = {};
  constructor(private domEle: ElementRef) {}
  @HostListener('mouseout') onHover() {
    this.changeShadow(this.defaultShadowBorder);
  }
  @HostListener('mouseover') onMouseOut() {
    this.changeShadow(this.appProductShadow);
  }
  private changeShadow(shadowObj: any) {
    this.domEle.nativeElement.style.boxShadow = shadowObj.borderShadow;
    this.domEle.nativeElement.style.border = shadowObj.border;
    this.domEle.nativeElement.style.borderRadius = shadowObj.borderRadius;
  }
}
