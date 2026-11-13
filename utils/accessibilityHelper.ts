import AxeBuilder from '@axe-core/playwright';
import { Page, expect } from '@playwright/test';

export interface AccessibilityViolation {
  id: string;
  impact: string;
  description: string;
  nodes: number;
}

export async function runAccessibilityScan(
  page: Page,
  options?: { includedImpacts?: string[] }
): Promise<AccessibilityViolation[]> {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const violations = accessibilityScanResults.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact || 'unknown',
    description: violation.description,
    nodes: violation.nodes.length,
  }));

  if (options?.includedImpacts) {
    return violations.filter((v) =>
      options.includedImpacts!.includes(v.impact)
    );
  }

  return violations;
}

export async function expectNoAccessibilityViolations(
  page: Page,
  options?: { excludeRules?: string[] }
): Promise<void> {
  let builder = new AxeBuilder({ page }).withTags([
    'wcag2a',
    'wcag2aa',
    'wcag21a',
    'wcag21aa',
  ]);

  if (options?.excludeRules) {
    builder = builder.disableRules(options.excludeRules);
  }

  const results = await builder.analyze();
  const criticalViolations = results.violations.filter(
    (v) => v.impact === 'critical' || v.impact === 'serious'
  );

  expect(
    criticalViolations,
    `Found ${criticalViolations.length} critical accessibility violations`
  ).toHaveLength(0);
}
