import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GrowthCurves } from "@/components/magnitude/GrowthCurves";
import { darkCanvas } from "./decorators";

const meta = {
  title: "Magnitude/GrowthCurves",
  component: GrowthCurves,
  parameters: { layout: "fullscreen" },
  args: { delta: 2 },
  argTypes: {
    delta: {
      control: { type: "range", min: -5, max: 5, step: 0.1 },
      description: "ΔM = B − A. Negative means A is larger than B.",
    },
  },
  decorators: [(Story) => darkCanvas(Story, { maxWidth: 520 })],
} satisfies Meta<typeof GrowthCurves>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoUnits: Story = {};

export const OneUnit: Story = {
  args: { delta: 1 },
};

export const Equal: Story = {
  args: { delta: 0 },
};

/** A larger than B — marker on the left, ratios below 1×. */
export const NegativeDelta: Story = {
  args: { delta: -2 },
};

export const WideGap: Story = {
  args: { delta: 4 },
};
