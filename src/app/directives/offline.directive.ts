import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: "button[appOffline]",
})
export class OfflineDirective {
  private isOffline = false;

  @HostBinding("disabled")
  get isDisabled(): boolean {
    return this.isOffline;
  }

  @HostListener("window:offline")
  setNetworkOffline(): void {
    this.isOffline = true;
  }

  @HostListener("window:online")
  setNetworkOnline(): void {
    this.isOffline = false;
  }
}
