import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatCard } from "@/components/ui/StatCard";
import { COLOR_A, COLOR_B } from "@/lib/palette";
import { darkCanvas } from "./decorators";

const meta = {
  title: "UI/StatCard",
  component: StatCard,
  parameters: { layout: "fullscreen" },
  decorators: [(Story) => darkCanvas(Story, { maxWidth: 420 })],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Stat: Story = {
  args: {
    variant: "stat",
    label: "Radiated energy Es",
    value: "7.94×10¹⁴ J",
  },
};

export const HeroAmplitude: Story = {
  args: {
    variant: "hero",
    label: "Amplitude B/A",
    value: "100×",
    hint: "10^ΔM · wiggle height",
    color: COLOR_A,
  },
};

export const HeroEnergy: Story = {
  args: {
    variant: "hero",
    label: "Energy B/A",
    value: "1,000×",
    hint: "10^(1.5 ΔM) · radiated Es",
    color: COLOR_B,
  },
};

export const Math: Story = {
  args: {
    variant: "math",
    label: "Amplitude",
    value: "A ∝ 10^M",
    hint: "Richter local magnitude ML, same station and instrument. Ratio B/A = 10^(ΔM). Each +1 is 10×.",
  },
};

export const HeroPair: Story = {
  args: {
    variant: "hero",
    label: "Amplitude B/A",
    value: "100×",
    hint: "10^ΔM · wiggle height",
    color: COLOR_A,
  },
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <StatCard
        variant="hero"
        label="Amplitude B/A"
        value="100×"
        hint="10^ΔM · wiggle height"
        color={COLOR_A}
      />
      <StatCard
        variant="hero"
        label="Energy B/A"
        value="1,000×"
        hint="10^(1.5 ΔM) · radiated Es"
        color={COLOR_B}
      />
    </div>
  ),
};
