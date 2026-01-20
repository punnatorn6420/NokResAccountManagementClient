import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import {
  GUIDED_TOUR_DEFINITIONS,
  SupportedLanguage,
  TourContent,
  TourKey,
  TourLabels,
  TourPlacement,
  TourStep,
} from '../constants/guided-tour.definitions';

@Injectable({
  providedIn: 'root',
})
export class GuidedTourService {
  private renderer: Renderer2;
  private overlayEl?: HTMLElement;
  private tooltipEl?: HTMLElement;
  private steps: TourStep[] = [];
  private currentIndex = -1;
  private activeTarget?: HTMLElement | null;
  private highlightBoxEl?: HTMLElement;
  private onReposition?: () => void;
  private activeLabels: TourLabels;
  private defaultLabels: TourLabels = {
    next: 'Next',
    back: 'Back',
    exit: 'Exit',
    done: 'Done',
  };

  private tourDefinitions = GUIDED_TOUR_DEFINITIONS;

  constructor(
    rendererFactory: RendererFactory2,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.activeLabels = this.defaultLabels;
  }

  startDashboardTour(): void {
    this.startTour('dashboard', this.getActiveLanguage());
  }

  startPasswordRotationLogsTour(): void {
    this.startTour('passwordRotationLogs', this.getActiveLanguage());
  }

  startAgentsManagementTour(): void {
    this.startTour('agentsManagement', this.getActiveLanguage());
  }

  startAgentDetailTour(): void {
    this.startTour('agentDetail', this.getActiveLanguage());
  }

  // startOperationApprovedTour(): void {
  //   this.startTour('operationApproved');
  // }

  // startOperationFormTour(): void {
  //   this.startTour('operationForm');
  // }

  startTour(page: TourKey, lang?: SupportedLanguage): void {
    if (!this.canUseDom()) return;

    const tourContent = this.getTourContent(page, lang ?? 'en');
    if (!tourContent) return;

    this.steps = tourContent.steps;
    this.activeLabels = {
      ...this.defaultLabels,
      ...(tourContent.labels ?? {}),
    };

    if (!this.steps.length) return;

    this.ensureOverlay();
    this.nextStep();
  }

  private getTourContent(
    page: TourKey,
    lang: SupportedLanguage,
  ): TourContent | undefined {
    const tourByLang = this.tourDefinitions[page];
    if (!tourByLang) return undefined;

    return tourByLang[lang] ?? tourByLang['th'] ?? Object.values(tourByLang)[0];
  }

  cancelTour(): void {
    this.finishTour();
  }

  private getActiveLanguage(): SupportedLanguage {
    if (!this.canUseDom()) return 'en';
    const docLang = document.documentElement.lang?.toLowerCase() ?? '';
    if (docLang.startsWith('th')) return 'th';
    if (docLang.startsWith('en')) return 'en';

    const browserLang = navigator.language?.toLowerCase() ?? '';
    return browserLang.startsWith('en') ? 'en' : 'th';
  }

  private nextStep(): void {
    this.showStep(this.currentIndex + 1);
  }

  private previousStep(): void {
    this.showStep(this.currentIndex - 1);
  }

  private showStep(index: number): void {
    if (!this.canUseDom()) return;

    const step = this.steps[index];
    if (!step) {
      this.finishTour();
      return;
    }

    this.currentIndex = index;
    const target = document.querySelector(
      step.targetSelector,
    ) as HTMLElement | null;
    if (!target) {
      this.showStep(index + 1);
      return;
    }

    this.highlightTarget(target, step.placement);
    this.renderTooltip(step, target);
    this.scrollTargetIntoView(target, step.placement);
    // this.updateTooltipPosition(target, step.placement ?? 'bottom');
  }

  private finishTour(): void {
    if (!this.canUseDom()) return;

    this.detachRepositionListeners();
    this.removeHighlight();

    if (this.overlayEl?.parentElement) {
      this.overlayEl.parentElement.removeChild(this.overlayEl);
    }
    this.overlayEl = undefined;
    this.tooltipEl = undefined;
    this.highlightBoxEl = undefined;
    this.currentIndex = -1;
    this.activeLabels = this.defaultLabels;
  }

  private ensureOverlay(): void {
    if (this.overlayEl || !this.canUseDom()) return;
    const overlay = this.renderer.createElement('div');
    this.renderer.addClass(overlay, 'app-tour-overlay');

    const backdrop = this.renderer.createElement('div');
    this.renderer.addClass(backdrop, 'app-tour-backdrop');
    this.renderer.appendChild(overlay, backdrop);

    const highlightBox = this.renderer.createElement('div');
    this.renderer.addClass(highlightBox, 'app-tour-highlight-box');
    this.renderer.appendChild(overlay, highlightBox);
    this.highlightBoxEl = highlightBox;

    const tooltip = this.renderer.createElement('div');
    this.renderer.addClass(tooltip, 'app-tour-tooltip');
    this.renderer.appendChild(overlay, tooltip);

    document.body.appendChild(overlay);
    this.overlayEl = overlay;
    this.tooltipEl = tooltip;
  }

  private highlightTarget(
    target: HTMLElement,
    placement?: TourPlacement,
  ): void {
    this.activeTarget = target;
    this.updateHighlightBox(target);
    this.detachRepositionListeners();
    this.attachRepositionListeners(target, placement ?? 'bottom');
  }

  private attachRepositionListeners(
    target: HTMLElement,
    placement: TourPlacement,
  ): void {
    const handler = () => {
      this.updateHighlightBox(target);
      this.positionTooltip(target, placement);
    };

    const onScroll = () => handler();
    const onResize = () => handler();

    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);

    this.onReposition = () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
    };
  }

  private detachRepositionListeners(): void {
    if (this.onReposition) {
      this.onReposition();
      this.onReposition = undefined;
    }
  }

  private updateHighlightBox(target: HTMLElement): void {
    if (!this.highlightBoxEl) return;

    const rect = target.getBoundingClientRect();
    const pad = 6;

    this.highlightBoxEl.style.top = `${rect.top - pad}px`;
    this.highlightBoxEl.style.left = `${rect.left - pad}px`;
    this.highlightBoxEl.style.width = `${rect.width + pad * 2}px`;
    this.highlightBoxEl.style.height = `${rect.height + pad * 2}px`;
  }

  private removeHighlight(): void {
    this.detachRepositionListeners();
    this.activeTarget = null;

    if (this.highlightBoxEl) {
      this.highlightBoxEl.style.width = '0px';
      this.highlightBoxEl.style.height = '0px';
      this.highlightBoxEl.style.top = '-9999px';
      this.highlightBoxEl.style.left = '-9999px';
    }
  }

  private renderTooltip(step: TourStep, target: HTMLElement): void {
    if (!this.tooltipEl) return;
    this.tooltipEl.innerHTML = '';

    const header = this.renderer.createElement('div');
    this.renderer.addClass(header, 'app-tour-title');
    header.textContent = step.title;
    this.tooltipEl.appendChild(header);

    const body = this.renderer.createElement('div');
    this.renderer.addClass(body, 'app-tour-body');
    const paragraphs = Array.isArray(step.description)
      ? step.description
      : [step.description];
    paragraphs.forEach((paragraph) => {
      const p = this.renderer.createElement('p');
      p.textContent = paragraph;
      body.appendChild(p);
    });
    this.tooltipEl.appendChild(body);

    const actions = this.renderer.createElement('div');
    this.renderer.addClass(actions, 'app-tour-actions');
    const cancelBtn = this.createButton(
      this.activeLabels.exit,
      'secondary',
      () => this.finishTour(),
    );

    if (this.currentIndex > 0) {
      const backBtn = this.createButton(
        this.activeLabels.back,
        'secondary',
        () => this.previousStep(),
      );
      this.renderer.appendChild(actions, backBtn);
    }

    const nextLabel =
      this.currentIndex >= this.steps.length - 1
        ? this.activeLabels.done
        : this.activeLabels.next;
    const nextBtn = this.createButton(nextLabel, 'primary', () =>
      this.nextStep(),
    );

    this.renderer.appendChild(actions, cancelBtn);
    this.renderer.appendChild(actions, nextBtn);
    this.tooltipEl.appendChild(actions);

    this.positionTooltip(target, step.placement ?? 'bottom');
  }

  private createButton(
    label: string,
    style: 'primary' | 'secondary',
    onClick: () => void,
  ): HTMLButtonElement {
    const btn = this.renderer.createElement('button') as HTMLButtonElement;
    this.renderer.addClass(btn, 'app-tour-btn');
    this.renderer.addClass(btn, style === 'primary' ? 'primary' : 'secondary');
    btn.type = 'button';
    btn.textContent = label;
    this.renderer.listen(btn, 'click', (event: Event) => {
      event.preventDefault();
      onClick();
    });
    return btn;
  }

  private positionTooltip(target: HTMLElement, placement: TourPlacement): void {
    if (!this.tooltipEl) return;
    const rect = target.getBoundingClientRect();
    const tooltipRect = this.tooltipEl.getBoundingClientRect();
    const margin = 12;
    let top = rect.bottom + margin;
    let left = rect.left + rect.width / 2 - tooltipRect.width / 2;

    switch (placement) {
      case 'top':
        top = rect.top - tooltipRect.height - margin;
        break;
      case 'left':
        top = rect.top + rect.height / 2 - tooltipRect.height / 2;
        left = rect.left - tooltipRect.width - margin;
        break;
      case 'right':
        top = rect.top + rect.height / 2 - tooltipRect.height / 2;
        left = rect.right + margin;
        break;
      default:
        top = rect.bottom + margin;
        break;
    }

    const viewportWidth = window.innerWidth;
    const maxLeft = viewportWidth - tooltipRect.width - 12;
    left = Math.max(12, Math.min(left, maxLeft));
    top = Math.max(
      12,
      Math.min(top, window.innerHeight - tooltipRect.height - 12),
    );

    this.tooltipEl.style.top = `${top}px`;
    this.tooltipEl.style.left = `${left}px`;
  }

  private scrollTargetIntoView(
    target: HTMLElement,
    placement?: TourPlacement,
  ): void {
    if (!this.canUseDom()) return;

    const scrollOptions: ScrollIntoViewOptions = {
      behavior: 'smooth',
      block: 'center',
    };

    const margin = 16;
    const tooltipRect = this.tooltipEl?.getBoundingClientRect();

    if (placement === 'top' && tooltipRect) {
      const offset = tooltipRect.height + margin;
      this.renderer.setStyle(target, 'scroll-margin-top', `${offset}px`);
      scrollOptions.block = 'start';
      window.setTimeout(
        () => this.renderer.removeStyle(target, 'scroll-margin-top'),
        700,
      );
    } else if (placement === 'bottom' && tooltipRect) {
      const offset = tooltipRect.height + margin;
      this.renderer.setStyle(target, 'scroll-margin-bottom', `${offset}px`);
      scrollOptions.block = 'end';
      window.setTimeout(
        () => this.renderer.removeStyle(target, 'scroll-margin-bottom'),
        700,
      );
    }

    target.scrollIntoView(scrollOptions);
  }

  private canUseDom(): boolean {
    return typeof document !== 'undefined' && typeof window !== 'undefined';
  }
}
