# FEATURES Research

## Purpose

Define what a credible standalone fermentation / fresh-yeast calculator should include in v1 for this project.

The brief already fixes the product posture:

- focused standalone tool, not a dough suite
- premium UI, mobile-first
- empirical base model only
- no fake precision
- explicit honesty about what the model does and does not cover

This document translates that posture into scoped product requirements.

## Research Readout

Market signal from established dough calculators is consistent:

- Users expect quick ingredient math driven by time and temperature.
- Popular tools quickly expand into hydration, salt, cold fermentation, recipe storage, style presets, and yeast-type conversions.
- Baking references also make clear that hydration, salt, sugar, fat, flour strength, and actual dough temperature materially affect fermentation behavior.

That creates the main product tension for this project:

- A calculator that ignores all secondary variables without saying so will feel naive.
- A calculator that pretends to model all secondary variables without calibration will feel dishonest.

For this project, credible v1 means:

1. Solve the primary job fast: estimate fresh yeast from time, temperature, and flour quantity.
2. Make the estimate legible and usable in real kitchen conditions.
3. State model boundaries clearly.
4. Show future modifier categories without claiming certainty the model does not have.

## Product Principle

The v1 should behave like a serious estimator, not a recipe generator.

That means the tool should optimize for:

- trust over breadth
- clarity over configurability
- resilient UX over feature count
- practical rounding over pseudo-scientific decimals

## Table Stakes

These are the minimum features needed for the product to feel credible as a standalone calculator rather than a demo.

| Feature | Why it belongs in v1 | Complexity | Dependencies / Notes |
|---|---|---:|---|
| Core inputs: ambient temperature, fermentation time, flour quantity, flour unit | These are the core variables of the model and the main user job-to-be-done. Omitting any of them makes the tool incomplete. | Low | Pure client-side form state and unit conversion. |
| Live calculation with immediate result updates | Comparable calculators are interactive and fast. A manual "calculate" step would feel dated and weaken usability. | Low | Pure calculation functions, debounced or direct reactive UI. |
| Result card with both `grams for recipe` and `grams per 1 kg flour` | Users need the actionable number for the current dough and the normalized number to sanity-check recipes. | Low | Formatting and rounding rules must be explicit and consistent. |
| Clear validation for empty, zero, negative, and invalid inputs | A serious tool must fail cleanly. Silent NaN states or broken outputs destroy trust immediately. | Low | Validation copy, field error states, and guarded result rendering. |
| Out-of-range warning for empirical limits without blocking the calculation | This is essential to model honesty. The user still gets an estimate, but the app makes reliability boundaries visible. | Low | Requires domain copy and agreed reference range. |
| Visible formula and plain-language explanation of what the model uses | Credible tools show their logic or at least their basis. This brief explicitly requires transparency. | Low | Static copy plus formula rendering. |
| Reset and quick presets | Presets reduce friction for common scenarios; reset is expected when users are exploring scenarios. | Low | Static preset definitions. |
| Mobile-first, premium, stable interaction model | Standalone calculators compete heavily on perceived quality and speed. This is part of the project's differentiation, but also a baseline expectation for credibility. | Medium | Strong design execution, accessibility, responsive layout, motion restraint. |
| Explicit disclaimer that the output is a practical estimate, not an exact dosage | Fermentation is affected by more variables than the active model includes. The app must say that up front. | Low | Copy only, but it is product-critical. |
| Separate UI area for experimental modifiers, clearly not applied to the active v1 math | Users familiar with dough tools will expect factors like hydration or salt to matter. Showing them as future-facing but inactive preserves honesty without pretending coverage. | Medium | Data model for modifiers, disabled or non-applied controls, explanatory copy. |

## Differentiators

These are not "extra features" in the usual sense. They are the product choices that can make this tool feel better than a generic calculator while staying within a focused v1.

| Differentiator | Why it matters | Complexity | Dependencies / Notes |
|---|---|---:|---|
| Trust-first result framing | Instead of presenting a naked number, present the estimate with reliability language, current assumptions, and warnings in one place. This aligns with the brief's "honesty of model" requirement and is stronger than most hobby calculators. | Medium | Requires careful UX writing and layout hierarchy. |
| Premium editorial UI rather than "utility app" styling | A polished, calm interface supports perceived seriousness and product quality. For this project, visual quality is part of the product value, not decoration. | Medium | Design system choices, spacing, typography, motion, responsive QA. |
| Strong distinction between `active model` and `future factors` | Many calculators hide assumptions. Making this separation explicit is a differentiator because it teaches users what is modeled and what is not. | Medium | Domain copy, component structure, future-proof state model. |
| Scenario shortcuts that stay narrow and explain themselves | The prescribed presets are useful because they accelerate common cases without turning the product into a recipe builder. | Low | Static data and thoughtful microcopy. |
| Practical rounding policy | Showing 2 decimals for normal values and 3 for sub-gram values feels kitchen-usable without implying lab precision. | Low | Pure formatting utility; important for trust. |
| Architecture prepared for modifiers without activating them prematurely | This is a product differentiator as much as a code one. It allows future growth without contaminating v1 with unvalidated heuristics. | Medium | Domain types, non-coupled calc pipeline, feature flags or explicit no-op modifier layer. |

## Anti-Features

These features are common in broader dough apps, but they should be excluded from this v1 because they either dilute focus, imply fake precision, or create research debt the current model cannot justify.

| Anti-feature | Why it should stay out of v1 | Complexity / Risk if added |
|---|---|---:|
| Full recipe builder with hydration, salt, oil, sugar, and dough weight as active calculation drivers | This turns the product into a dough formulation tool, not a focused yeast estimator. It also implies a fuller fermentation model than the brief supports. | High |
| Active correction coefficients for hydration, salt, sugar, fat, flour strength, bulk vs final proof, or cold retard without validated calibration | These variables matter in reality, but unvalidated coefficients would produce fake precision and undermine the product's honesty. | High |
| Multi-stage fermentation scheduler with room-temp plus fridge timelines | Valuable in advanced tools, but it materially changes the model and UI complexity. It belongs only after real calibration work. | High |
| Multiple yeast-type modes and automatic fresh/dry/instant/sourdough conversions | Useful later, but it broadens the domain, copy, validation, and dosing logic. The brief is explicitly about fresh yeast first. | Medium |
| Recipe saving, sharing, history, user accounts, cloud sync | Popular in mature tools, but completely orthogonal to the core v1 value. Adds product surface without improving estimate quality. | High |
| AI suggestions or "smart recommendations" layered on top of the formula | This would make the product feel less trustworthy unless backed by clear data and auditability. | High |
| Over-precise outputs such as hundredths or thousandths of a gram presented as exact truth | Users may need sub-gram guidance, but the app should never imply that the model itself is accurate to laboratory precision. | Low to implement, high trust risk |
| Style-specific modes like Neapolitan, Roman, pan pizza, brioche, sourdough conversion | These are separate product branches with distinct assumptions and copy. They would push the tool toward a suite too early. | Medium to High |
| Water-temperature / desired dough temperature solver in v1 | This is a credible future module, but it solves a different problem from "how much fresh yeast should I use?" | Medium |
| Inventory, costing, batch production, or bakery planning tools | These belong to a pro workflow product, not a focused consumer-facing fermentation calculator. | High |

## Recommended v1 Shape

If scope discipline is enforced, v1 should include only this product surface:

### Included

- input panel for temperature, time, flour quantity, and flour unit
- live estimate output
- grams for recipe
- grams per kilogram
- formula visibility
- warnings and validation states
- quick presets
- reset
- model-limit disclosure
- experimental modifiers panel shown but not applied
- premium mobile-first presentation

### Deferred

- active advanced modifiers
- alternate yeast types
- cold-fermentation scheduling
- recipe management
- social or sharing features
- multi-tool fermentation suite behavior

## Complexity Notes

### Low-complexity items

- base inputs and conversion
- live calculation
- result formatting
- warnings and reset
- formula display

These should all be considered safe v1 scope.

### Medium-complexity items

- premium interaction design
- trustworthy copy hierarchy
- experimental modifier scaffolding
- robust state management around validation and empty states

These are worth doing in v1 because they strongly affect trust and perceived quality.

### High-complexity items

- calibrated modifier engine
- multi-stage fermentation logic
- multi-yeast support
- persistence / saved recipes
- sharing / accounts / collaboration

These should remain explicitly out of scope until the base estimator has been validated with real usage.

## Dependency Notes

### Product dependencies

- agreed empirical validity range for warnings
- approved copy for result framing and disclaimers
- final decision on whether experimental modifiers are disabled controls or explicit placeholders

### Domain dependencies

- stable implementation of the base empirical formula
- stable rounding policy
- clear distinction between measured input precision and model confidence

### UX dependencies

- strong mobile layout
- accessible input states
- visual separation between input, result, and model detail
- restrained motion that signals quality without feeling playful

## Recommended Requirement Language

Use this standard when later converting features into implementation requirements:

- The app must compute a fresh-yeast estimate from temperature, time, and flour quantity with live updates.
- The app must show both recipe-scaled output and normalized grams-per-kilogram output.
- The app must warn when the user is outside the empirical reference range without suppressing the estimate.
- The app must present the formula, assumptions, and limitation disclaimers in plain language.
- The app must visibly separate the active empirical model from experimental future modifiers.
- The app must avoid presenting unvalidated modifier math as part of the active result.
- The app must round for practical kitchen use and avoid false precision.
- The app must feel like a premium product on mobile and desktop, not a bare calculator form.

## Bottom Line

A credible v1 for this project is not the broadest fermentation tool. It is the narrowest tool that a serious home baker can trust enough to actually use:

- one reliable estimator
- one excellent interface
- one honest model story

Anything that expands breadth at the cost of trust should be treated as a deliberate non-goal for v1.

## Research References

- [PizzApp+ App Store description](https://apps.apple.com/tr/app/pizzapp/id1228158792)
- [PizzApp+ feature summary](https://spark.mwm.ai/en/apps/pizzapp/1228158792)
- [BreadCalc calculator scope](https://breadcalc.com/)
- [King Arthur Baking: Yeast reference](https://www.kingarthurbaking.com/pro/reference/yeast)
- [King Arthur Baking: Water reference](https://www.kingarthurbaking.com/pro/reference/water)
- [King Arthur Baking: Salt and yeast behavior](https://www.kingarthurbaking.com/blog/2023/07/05/does-salt-kill-yeast)
- [Baking Business: time and temperature in fermentation](https://www.bakingbusiness.com/articles/60446-pro-tip-understanding-time-and-temperature-to-create-quality-baked-goods)
- [Baking Business: fermentation depends on many factors](https://www.bakingbusiness.com/articles/65023-perfecting-fermentation-depends-on-many-factors)