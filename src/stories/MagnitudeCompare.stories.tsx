import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MagnitudeCompare } from "@/components/magnitude/MagnitudeCompare";
import { darkCanvas } from "./decorators";

const meta = {
  title: "Magnitude/Compare",
  component: MagnitudeCompare,
  parameters: { layout: "fullscreen" },
  args: { magA: 5, magB: 7 },
  argTypes: {
    magA: { control: { type: "range", min: 0, max: 10, step: 0.1 } },
    magB: { control: { type: "range", min: 0, max: 10, step: 0.1 } },
  },
  decorators: [(Story) => darkCanvas(Story, { maxWidth: 960 })],
} satisfies Meta<typeof MagnitudeCompare>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FiveVsSeven: Story = {};

export const OneUnit: Story = {
  args: { magA: 5, magB: 6 },
};

export const NorthridgeVsLomaPrieta: Story = {
  args: { magA: 6.7, magB: 6.9 },
};

export const GreatVsLarge: Story = {
  args: { magA: 7, magB: 9 },
};
