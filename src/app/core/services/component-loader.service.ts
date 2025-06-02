import { 
  Injectable, 
  ViewContainerRef, 
  ComponentRef, 
  createComponent, 
  Type,
  EnvironmentInjector,
  ApplicationRef
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentLoaderService {
  
  constructor(
    private injector: EnvironmentInjector,
    private appRef: ApplicationRef
  ) {}
  
  /**
   * Dynamically load a component into a ViewContainerRef
   */
  loadComponent<T>(
    viewContainerRef: ViewContainerRef, 
    componentType: Type<T>,
    inputs?: Record<string, any>
  ): ComponentRef<T> {
    // Clear the container first
    viewContainerRef.clear();
    
    // Create the component
    const componentRef = viewContainerRef.createComponent(componentType);
    
    // Set inputs if provided
    if (inputs) {
      Object.entries(inputs).forEach(([key, value]) => {
        (componentRef.instance as any)[key] = value;
      });
    }
    
    // Trigger change detection
    componentRef.changeDetectorRef.detectChanges();
    
    return componentRef;
  }
  
  /**
   * Load multiple components in sequence
   */
  loadComponents<T>(
    viewContainerRef: ViewContainerRef,
    componentTypes: Type<T>[],
    inputsArray?: Record<string, any>[]
  ): ComponentRef<T>[] {
    // Clear the container first
    viewContainerRef.clear();
    
    // Create components
    return componentTypes.map((componentType, index) => {
      const componentRef = viewContainerRef.createComponent(componentType);
      
      // Set inputs if available for this component
      if (inputsArray && inputsArray[index]) {
        Object.entries(inputsArray[index]).forEach(([key, value]) => {
          (componentRef.instance as any)[key] = value;
        });
      }
      
      // Trigger change detection
      componentRef.changeDetectorRef.detectChanges();
      
      return componentRef;
    });
  }
  
  /**
   * Create component without a ViewContainerRef (for more advanced scenarios)
   */
  createComponentDynamically<T>(
    componentType: Type<T>,
    hostElement: Element,
    inputs?: Record<string, any>
  ): ComponentRef<T> {
    // Create the component
    const componentRef = createComponent(componentType, {
      environmentInjector: this.injector,
      hostElement
    });
    
    // Set inputs if provided
    if (inputs) {
      Object.entries(inputs).forEach(([key, value]) => {
        (componentRef.instance as any)[key] = value;
      });
    }
    
    // Attach to the application change detection
    this.appRef.attachView(componentRef.hostView);
    
    // Trigger change detection
    componentRef.changeDetectorRef.detectChanges();
    
    return componentRef;
  }
  
  /**
   * Destroy component reference
   */
  destroyComponent<T>(componentRef: ComponentRef<T>): void {
    if (componentRef) {
      componentRef.destroy();
    }
  }
}