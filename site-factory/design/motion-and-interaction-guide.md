# Motion and Interaction Guide

Use animation to communicate a transition, not hide essential content. Default to no autoplay video, no parallax requirement, and no blocking intro. Favor transform and opacity; avoid layout-shifting effects. Provide a reduced-motion mode that removes movement and reveals content immediately.

| Component | Interaction | Reduced-motion fallback | Practical budget |
| --- | --- | --- | --- |
| Animated hero | Single entrance after content is available | Static headline | Keep text visible without JS; one short sequence |
| Product demo | User-controlled preview | Static screenshot plus description | Lazy-load offscreen media |
| Comparison slider | Keyboard-operable range | Same slider, no transition | Two appropriately sized images |
| Process timeline | Optional reveal of steps | Show all steps | No scroll listeners per item |
| Sticky CTA | Reappears after context | Static action in flow | Never cover content or keyboard focus |
| Pricing toggle | Updates real supplied prices | Instant state change | No unnecessary animation |
| Calculator | Validated inputs and result | Immediate update | Calculate locally where possible |
| Command palette | Keyboard open, focus trap and return | Instant open | Load on demand |
| Embedded widget | Explicit open and completion events | Static transition | Lazy-load iframe; cap loader size |

Use project-specific measurable budgets, check actual device performance, and remove any effect that harms readability, input latency or conversion clarity.
