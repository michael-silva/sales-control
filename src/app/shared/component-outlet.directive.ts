//our root app component
import {NgModule, Component, Compiler, ViewContainerRef, ViewChild, Input, ComponentRef, ComponentFactory, ComponentFactoryResolver} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

// Helper component to add dynamic components
@Component({
  selector: 'dcl-wrapper',
  template: `<div #target></div>`
})
export class DclWrapper {
  @ViewChild('target', {read: ViewContainerRef}) target: any;
  @Input() type: any;
  cmpRef:ComponentRef<any>;
  private isViewInitialized:boolean = false;
  
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private compiler: Compiler) {}

  updateComponent() {
    if(!this.isViewInitialized) {
      return;
    }
    if(this.cmpRef) {
      this.cmpRef.destroy();
    }

    let factory = this.componentFactoryResolver.resolveComponentFactory(this.type);

    //this.resolver.resolveComponent(this.type).then((factory:ComponentFactory<any>) => {
    this.cmpRef = this.target.createComponent(factory)
  }
  
  ngOnChanges() {
    this.updateComponent();
  }
  
  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.updateComponent();  
  }
  
  ngOnDestroy() {
    if(this.cmpRef) {
      this.cmpRef.destroy();
    }    
  }
}